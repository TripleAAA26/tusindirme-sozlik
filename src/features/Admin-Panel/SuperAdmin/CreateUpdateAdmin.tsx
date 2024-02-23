import { useState } from 'react'
import { Button, Flex, Form, Input, message, Modal, Select } from 'antd'
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import useUpdateAdmin from './useUpdateAdmin.tsx'
import useCreateAdmin from './useCreateAdmin.tsx'



export default function CreateUpdateAdmin({ item = {} }) {
    const [ open, setOpen ] = useState(false)
    const [ confirmLoading, setConfirmLoading ] = useState(false)
    const [ form ] = Form.useForm()
    const [ messageApi, contextHolder ] = message.useMessage()

    const isUpdateSession = Boolean(item.id)

    const { createAdmin, isPending: isCreating } = useCreateAdmin()
    const { updateAdmin, isPending: isUpdating } = useUpdateAdmin()


    const initialRole =
        (item.role === 'admin' && 1) ||
        (item.role === 'copywriter'  && 2) ||
        (item.role === 'tester' &&  3)


    const showModal = () => {
        setOpen(true)
        if (isUpdateSession) {
            form.setFieldsValue({
                'name': item.name,
                'phone': item.phone,
                'roleId': initialRole,
            })
        }
    }
    const handleOk = (values) => {
        setConfirmLoading(true)
        if (!values.name || !values.phone || !values.roleId) return

        if (isUpdateSession) {
            updateAdmin({
                updatedAdmin: {
                    user_id: item.id,
                    name: values.name,
                    phone: values.phone,
                    role_id: values.roleId,
                },

            }, {
                onSuccess: () => {
                    form.resetFields()

                    setOpen(false)
                    setConfirmLoading(false)
                    messageApi.open({
                        type: 'success',
                        content: 'Admin successfully updated!',
                    })
                },
                onError: (error) => {
                    messageApi.open({
                        type: 'error',
                        content: 'Could not update admin!',
                    })
                }
            })
        } else {
            createAdmin({
                newAdmin: {
                    name: values.name,
                    phone: values.phone,
                    role_id: values.roleId,
                    password: values.password,
                }
            }, {
                onSuccess: () => {
                    form.resetFields()

                    setOpen(false)
                    setConfirmLoading(false)
                    messageApi.open({
                        type: 'success',
                        content: 'Admin successfully created!',
                    })
                },
                onError: (error) => {
                    messageApi.open({
                        type: 'error',
                        content: 'Could not create admin!',
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
                    {isUpdateSession ? <span><EditOutlined /> edit</span> :  <span><PlusCircleOutlined/> Create Admin</span> }
                </Button>
            </Flex>
            <Modal
                title={isUpdateSession ? 'Edit Admin' : 'Create Admin'}
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
                            disabled={isUpdating || isCreating}
                        />
                    </Form.Item>

                    <Form.Item
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
                            disabled={isUpdating || isCreating}
                        />
                    </Form.Item>

                    <Form.Item
                        label='role'
                        name='roleId'
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
                            disabled={isUpdating || isCreating}
                        />
                    </Form.Item>

                    { !isUpdateSession &&
                        <Form.Item
                            label='password'
                            name='password'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                }
                            ]}
                        >
                            <Input.Password
                                disabled={isUpdating || isCreating}
                            />
                        </Form.Item>
                    }
                </Form>
            </Modal>
        </>
    )
}

