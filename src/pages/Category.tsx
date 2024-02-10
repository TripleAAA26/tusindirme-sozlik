import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCategoryApi } from '../service/categoryApi.ts'
import useCreateCategory from '../hooks/useCreateCategory.tsx'
import CategoryItem from '../components/CategoryItem.tsx'
import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, Flex, Form, Input, List, Modal } from 'antd'
import useAuth from '../hooks/useAuth.tsx'


export default function Category() {
    const [ open, setOpen ] = useState(false)
    const [ confirmLoading, setConfirmLoading ] = useState(false)
    const [ form ] = Form.useForm()

    const [ kiril, setKiril ] = useState('')
    const [ latin, setLatin ] = useState('')


    const { auth: accessToken } = useAuth()
    const { data: categories } = useQuery(categoryListQuery(accessToken))


    const { createCategory, isPending } = useCreateCategory()

    const showModal = () => {
        setOpen(true)
    }
    const handleOk = () => {
        if (!kiril || !latin) return
        setConfirmLoading(true)

        createCategory({
            newCategory: {
                title: { kiril, latin }
            }
        },{
            onSettled: () => {
                setKiril('')
                setLatin('')
                form.resetFields()

                setOpen(false)
                setConfirmLoading(false)
            }
        })
    }
    const handleCancel = () => {
        setOpen(false)

        setKiril('')
        setLatin('')
        form.resetFields()
    }


    return (
        <>
            <Flex justify='end'>
                <Button type="primary" onClick={showModal}>
                    <PlusCircleOutlined/> Create category
                </Button>
            </Flex>
            <Modal
                title="Create category"
                open={open}
                onOk={form.submit}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                destroyOnClose={true}
            >
                <Form
                    form={form}
                    onFinish={handleOk}
                    name='basic'
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    style={{ maxWidth: '25rem' }}
                >
                    <Form.Item
                        label='kiril'
                        name='kiril'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your kiril!',
                            }
                        ]}
                    >
                        <Input
                            disabled={isPending}
                            value={kiril}
                            onChange={(e) => setKiril(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label='latin'
                        name='latin'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your latin!',
                            }
                        ]}
                    >
                        <Input
                            disabled={isPending}
                            value={latin}
                            onChange={(e) => setLatin(e.target.value)}
                        />
                    </Form.Item>
                </Form>
            </Modal>

            <List
                itemLayout="horizontal"
                dataSource={categories?.data}
                renderItem={(item, index) => (
                    <CategoryItem item={item} key={index}/>
                )}
            />
        </>
    )
}


const categoryListQuery = (accessToken) => ({
    queryKey: [ 'categoryList' ],
    queryFn: async () => getCategoryApi({ accessToken })
})

export const loader = (queryClient, auth) =>
    async ({ params }) => {

        return (
            await queryClient.ensureQueryData(categoryListQuery(auth))
        )
    }
