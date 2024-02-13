import { useState } from 'react'
import { Button, Card, Form, message, Modal, Upload } from 'antd'
import useCreateAudio from '../hooks/useCreateAudio.ts'
import useDeleteAudio from '../hooks/useDeleteAudio.ts'

export default function CardAudio({ selectedWord }) {
    const [ open, setOpen ] = useState(false)
    const [ confirmLoading, setConfirmLoading ] = useState(false)
    const [ form ] = Form.useForm()
    const [ messageApi, contextHolder ] = message.useMessage()

    const { createAudio, isPending } = useCreateAudio()
    const { deleteAudio } = useDeleteAudio()

    const showModal = () => {
        setOpen(true)
    }

    const handleOk = (values) => {

        if (!values.audio) return
        setConfirmLoading(true)

        const payload = new FormData()
        payload.append('file', values.audio[0].originFileObj)

        createAudio({
            idWord: selectedWord.id,
            audioFile: payload,
        }, {
            onSuccess: () => {
                form.resetFields()

                setOpen(false)
                setConfirmLoading(false)
                messageApi.open({
                    type: 'success',
                    content: 'Audio successfully added!',
                })
            },
            onError: (error) => {
                messageApi.open({
                    type: 'error',
                    content: 'Could not add audio!',
                })
            }
        })
    }
    const handleCancel = () => {
        setOpen(false)

        form.resetFields()
    }

    function handleDelete() {
        deleteAudio({
            idWord: selectedWord.id,
        }, {
            onSuccess: () => {
                form.resetFields()

                setOpen(false)
                setConfirmLoading(false)
                messageApi.open({
                    type: 'success',
                    content: 'Audio successfully deleted!',
                })
            },
            onError: (error) => {
                messageApi.open({
                    type: 'error',
                    content: 'Could not delete audio!',
                })
            }
        })
    }

    return (
        <>
            {contextHolder}
            <Card
                title="Audio"
                style={{ width: '25rem' }}
                extra={
                    selectedWord.audio
                        ?
                        <Button danger={true} onClick={handleDelete}>delete</Button>
                        :
                        <Button onClick={showModal} disabled={selectedWord.audio}>add</Button>
                }
            >
                <Modal
                    title="Add audio"
                    open={open}
                    onOk={form.submit}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    destroyOnClose={true}
                >
                    <Form
                        form={form}
                        onFinish={handleOk}
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: '25rem' }}
                    >
                        <Form.Item
                            valuePropName="fileList"
                            getValueFromEvent={event => event.fileList}
                            label="audio"
                            name="audio"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please choose audio!',
                                },
                                {
                                    validator: (_, fileList) => {
                                        if (fileList && fileList[0].size > 2097152) {
                                            return Promise.reject('audio file size needs to be below 2mb!')
                                        } else {
                                            return Promise.resolve()
                                        }
                                    },
                                }
                            ]}
                        >
                            <Upload maxCount={1} beforeUpload={() => false}>
                                <Button>select audio</Button>
                            </Upload>
                        </Form.Item>
                    </Form>
                </Modal>
                {selectedWord.audio && <Button>Play</Button>}
            </Card>
        </>
    )
}

