import { useState } from 'react'
import { Button, Flex, Form, Input, List, Modal, Select } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import useDeleteAdmin from '../hooks/useDeleteAdmin.tsx'
import useUpdateAdmin from '../hooks/useUpdateAdmin.tsx'


export default function AdminItem({ item }) {
    const [ open, setOpen ] = useState(false)
    const [ confirmLoading, setConfirmLoading ] = useState(false)

    const [ name, setName ] = useState('')
    const [ phone, setPhone ] = useState('')
    const [ roleId, setRoleId ] = useState(0)

    const { deleteAdmin, isPending: isDeleting } = useDeleteAdmin()
    const { updateAdmin, isPending: isUpdating } = useUpdateAdmin()


    const initialRole =
        (item.role === 'admin' && 1) ||
        (item.role === 'copywriter'  && 2) ||
        (item.role === 'tester' &&  3) || 0


    const showModal = () => {
        setOpen(true)

        setName(item.name)
        setPhone(item.phone)
        setRoleId(initialRole)
    }
    const handleOk = () => {
        setConfirmLoading(true)
        if (!name || !phone || !roleId) return

        updateAdmin({
            updatedAdmin: {
                user_id: item.id,
                name,
                phone,
                role_id: roleId
            },

        },{
            onSettled: () => {
                setName('')
                setPhone('')
                setRoleId(0)

                setOpen(false)
                setConfirmLoading(false)
            }
        })
    }
    const handleCancel = () => {
        setOpen(false)

        setName('')
        setPhone('')
        setRoleId(0)
    }

    function handleDelete() {
        deleteAdmin({ user_id: item.id })
    }

    return (
        <List.Item actions={[ <Button type='default' danger={true} loading={isDeleting} onClick={handleDelete}><DeleteOutlined />delete</Button>, ]}>
            <List.Item.Meta
                title={<p>{item.name}</p>}
                description={item.role}
            />

            <Flex justify='end'>
                <Button onClick={showModal}>
                    <EditOutlined />edit
                </Button>
            </Flex>
            <Modal
                title="Edit Admin"
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
                        initialValue={item.name}
                        label='name'
                        name='name'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            }
                        ]}
                    >
                        <Input
                            disabled={isUpdating}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        initialValue={item.phone}
                        label='phone'
                        name='phone'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone!',
                            }
                        ]}
                    >
                        <Input
                            disabled={isUpdating}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        initialValue={initialRole}
                        label='role id'
                        name='role id'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your role id!',
                            }
                        ]}
                    >
                        <Select
                            options={[
                                { value: 1 , label: 'admin' },
                                { value: 2 , label: 'copywriter' },
                                { value: 3 , label: 'tester' },
                            ]}
                            disabled={isUpdating}
                            value={roleId}
                            onChange={(value) => setRoleId(value)}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </List.Item>
    )


}

