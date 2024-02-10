import { Button, Flex, Form, Input, List, Modal } from 'antd'
import useDeleteCategory from '../hooks/useDeleteCategory.tsx'
import { useState } from 'react'
import useUpdateCategory from '../hooks/useUpdateCategory.tsx'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

export default function CategoryItem({ item }) {
    const [ open, setOpen ] = useState(false)
    const [ confirmLoading, setConfirmLoading ] = useState(false)

    const [ kiril, setKiril ] = useState('')
    const [ latin, setLatin ] = useState('')

    const { deleteCategory, isPending: isDeleting } = useDeleteCategory()
    const { updateCategory, isPending: isUpdating } = useUpdateCategory()


    const showModal = () => {
        setOpen(true)
        setKiril(item.title.kiril)
        setLatin(item.title.latin)
    }
    const handleOk = () => {
        setConfirmLoading(true)
        if (!kiril || !latin) return

        updateCategory({
            newCategory: {
                title: { kiril, latin }
            },
            idCategory: item.id
        },{
            onSettled: () => {
                setKiril('')
                setLatin('')

                setOpen(false)
                setConfirmLoading(false)
            }
        })
    }
    const handleCancel = () => {
        setOpen(false)
        setKiril('')
        setLatin('')
    }

    function handleDelete() {
        deleteCategory({ idCategory: item.id })
    }

    return (
        <List.Item actions={[ <Button type='default' danger={true} loading={isDeleting} onClick={handleDelete}><DeleteOutlined />delete</Button>, ]}>
            <List.Item.Meta
                title={<p>{item.title.latin}</p>}
                description={item.title.kiril}
            />

            <Flex justify='end'>
                <Button onClick={showModal}>
                    <EditOutlined />edit
                </Button>
            </Flex>
            <Modal
                title="Edit category"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                destroyOnClose={true}
            >
                <Form
                    name='basic'
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    style={{ maxWidth: '25rem' }}
                >
                    <Form.Item
                        initialValue={item.title.kiril}
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
                            disabled={isUpdating}
                            value={kiril}
                            onChange={(e) => setKiril(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        initialValue={item.title.latin}
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
                            disabled={isUpdating}
                            value={latin}
                            onChange={(e) => setLatin(e.target.value)}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </List.Item>
    )
}

