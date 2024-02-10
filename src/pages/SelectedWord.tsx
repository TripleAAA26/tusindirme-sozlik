import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Button, Card, Col, Form, Input, List, Modal, Row } from 'antd'
import { getWordsApi } from '../service/wordApi.ts'
import useAuth from '../hooks/useAuth.tsx'
import { useState } from 'react'


export default function SelectedWord() {
    const [ open, setOpen ] = useState(false)
    const [ confirmLoading, setConfirmLoading ] = useState(false)
    const [ form ] = Form.useForm()

    const { idword } = useParams()
    const { auth: accessToken } = useAuth()



    const { data:words } = useQuery({
        queryKey: [ 'words' ],
        queryFn: async () => getWordsApi({ accessToken })
    })

    const selectedWord = words?.data.find( word => word.id === Number(idword) )

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
            <Row style={{ display: 'block' }}>
                <h1>{selectedWord.title.latin}</h1>
                <h2>{selectedWord.title.kiril}</h2>
            </Row>
            <Row style={{ justifyContent: 'space-between'}}>
                <Col>
                    <p>Description:</p>
                    <p>{selectedWord.description.latin}</p>
                    <p>{selectedWord.description.kiril}</p>
                    <p>Category:</p>
                    <p>{selectedWord.category.latin},</p>
                    <p>{selectedWord.category.kiril}</p>
                </Col>
                <Col>
                    <Card
                        title="Antonym:"
                        style={{ width: '25rem'}}
                        extra={<Button>edit</Button>}
                    >
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
                            dataSource={selectedWord.antonym}
                            renderItem={ (item) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={item.title.latin}
                                    description={item.title.kiril}
                                />
                                <Button danger={true} >delete</Button>
                            </List.Item>
                            ) }
                        />
                    </Card>
                </Col>
            </Row>
            <Row style={{ justifyContent: 'space-between'}}>
                <Col>
                    audio
                </Col>
                <Col>
                    synonym
                </Col>
            </Row>
        </>
    )
}
