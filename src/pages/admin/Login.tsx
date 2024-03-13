import { Button, Flex, Form, Input } from 'antd'
import { useState } from 'react'
import { useLogin } from '../../features/auth/useLogin.ts'



export default function Login() {
    const [ phone, setPhone ] = useState('')
    const [ password, setPassword] = useState('')
    const { login, isPending, error } = useLogin()

    function handleSubmit() {
        if ( !phone || !password ) return

        login({ phone, password }, {
            onSettled: () => {
                setPhone('')
                setPassword('')
            },
        })
    }

    return (
        <Flex style={{ height:'100vh' }} align='center'>
            <Flex
                className='login-form'
                vertical={true}
                gap='1rem'
            >
                <h2 style={{color:'#229ED9', alignSelf: 'center'}}>Login</h2>
                <Form
                    onFinish={handleSubmit}
                    name='basic'
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    style={{ maxWidth: '25rem' }}
                >
                    <Form.Item
                        label='Phone'
                        name='phone'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone!',
                            }
                        ]}
                        validateStatus={ error?.message.startsWith('The') ? 'error' : isPending ? 'validating' : ''}
                        help={error?.message.startsWith('The') ? error?.message : ''}
                        hasFeedback
                    >
                        <Input
                            disabled={isPending}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label='Password'
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            }
                        ]}
                        validateStatus={error?.message.startsWith('phone') ? 'error' : isPending ? 'validating' : ''}
                        help={error?.message.startsWith('phone') ? error?.message : ''}
                        hasFeedback
                    >
                        <Input.Password
                            disabled={isPending}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Item>

                    <Flex justify='end'>
                        <Button
                            disabled={isPending}
                            htmlType='submit'
                            type='primary'
                            style={{  }}
                        >
                            Submit
                        </Button>
                    </Flex>
                </Form>
            </Flex>
        </Flex>
    )
}

