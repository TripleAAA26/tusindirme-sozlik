import { useState } from 'react'
import { Button, Flex, Form, Input, message, Modal } from 'antd'
import useCreateCategory from './useCreateCategory.tsx'
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import useUpdateCategory from './useUpdateCategory.tsx'

export default function CreateUpdateCategory({ item = {}}) {
    const [ open, setOpen ] = useState(false)
    const [ confirmLoading, setConfirmLoading ] = useState(false)
    const [ form ] = Form.useForm()
    const [ messageApi, contextHolder ] = message.useMessage()

    const isUpdateSession = Boolean(item.id)

    const { createCategory, isPending: isCreating } = useCreateCategory()
    const { updateCategory, isPending: isUpdating } = useUpdateCategory()


    const showModal = () => {
        setOpen(true)

        if (isUpdateSession) {
            form.setFieldsValue({
                'kiril': item.title.kiril,
                'latin': item.title.latin,
            })
        }
    }
    const handleOk = (values) => {

        if (!values.kiril || !values.latin) return
        setConfirmLoading(true)

        if (isUpdateSession) {
            updateCategory({
                newCategory: {
                    title: { kiril: values.kiril, latin: values.latin }
                },
                idCategory: item.id
            }, {
                onSuccess: () => {
                    form.resetFields()

                    setOpen(false)
                    setConfirmLoading(false)
                    messageApi.open({
                        type: 'success',
                        content: 'Category successfully updated!',
                    })
                },
                onError: (error) => {
                    messageApi.open({
                        type: 'error',
                        content: 'Could not update category!',
                    })
                }
            })
        } else {
            createCategory({
                newCategory: {
                    title: { kiril: values.kiril, latin: values.latin }
                }
            }, {
                onSuccess: () => {
                    form.resetFields()

                    setOpen(false)
                    setConfirmLoading(false)
                    messageApi.open({
                        type: 'success',
                        content: 'Category successfully created!',
                    })
                },
                onError: (error) => {
                    messageApi.open({
                        type: 'error',
                        content: 'Could not create category!',
                    })
                }
            })
        }
    }
    const handleCancel = () => {
        setOpen(false)

        form.resetFields()
    }


    return (
        <>
            {contextHolder}
            <Flex justify='end'>
                <Button type={isUpdateSession ? 'default' : 'primary'} onClick={showModal}>
                    {isUpdateSession ? <span><EditOutlined /> edit</span> :  <span><PlusCircleOutlined/> Create category</span> }
                </Button>
            </Flex>
            <Modal
                title={isUpdateSession ? 'Update category' : 'Create category'}
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
                            disabled={isCreating || isUpdating}
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
                            disabled={isCreating || isUpdating}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )


}


