import { useState } from 'react'
import useAuth from '../hooks/useAuth.tsx'
import { useQuery } from '@tanstack/react-query'
import { Button, Flex, Form, Input, List, Modal, Select } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { getAdminApi } from '../service/adminApi.ts'
import useCreateAdmin from '../hooks/useCreateAdmin.tsx'
import AdminItem from '../components/AdminItem.tsx'


export default function SuperAdmin() {
    const [ open, setOpen ] = useState(false)
    const [ confirmLoading, setConfirmLoading ] = useState(false)
    const [ form ] = Form.useForm()

    const [ name, setName ] = useState('')
    const [ phone, setPhone ] = useState('')
    const [ roleId, setRoleId ] = useState(0)
    const [ password, setPassword ] = useState('')


    const { auth: accessToken } = useAuth()
    const { data: admins } = useQuery(adminListQuery(accessToken))


    const { createAdmin, isPending } = useCreateAdmin()

    const showModal = () => {
        setOpen(true)
    }
    const handleOk = () => {
        setConfirmLoading(true)
        if (!name || !phone || !password || !roleId) return

        createAdmin({
            newAdmin: {
                name,
                phone,
                role_id: roleId,
                password
            }
        },{
            onSettled: () => {
                setName('')
                setPhone('')
                setRoleId(0)
                setPassword('')
                form.resetFields()

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
        setPassword('')
        form.resetFields()
    }


    return (
        <>
            <Flex justify='end'>
                <Button type="primary" onClick={showModal}>
                    <PlusCircleOutlined/> Create Admin
                </Button>
            </Flex>
            <Modal
                title="Create admin"
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
                            disabled={isPending}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                            disabled={isPending}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label='role'
                        name='role'
                        rules={[
                            {
                                required: true,
                                message: 'Please choose your role!',
                            }
                        ]}
                    >
                        <Select
                            options={[
                                { value: 1 , label: 'admin' },
                                { value: 2 , label: 'copywriter' },
                                { value: 3 , label: 'tester' },
                            ]}
                            disabled={isPending}
                            value={roleId}
                            onChange={(value) => setRoleId(value)}
                        />
                    </Form.Item>

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
                            disabled={isPending}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Item>
                </Form>
            </Modal>

            <List
                itemLayout="horizontal"
                dataSource={admins.data}
                renderItem={(item, index) => (
                    <AdminItem item={item} key={index}/>
                )}
            />
        </>
    )
}



const adminListQuery = (accessToken) => ({
    queryKey: [ 'adminList' ],
    queryFn: async () => getAdminApi({ accessToken })
})

export const loader = (queryClient, auth) =>
    async ({ params }) => {

        return (
            await queryClient.ensureQueryData(adminListQuery(auth))
        )
    }
