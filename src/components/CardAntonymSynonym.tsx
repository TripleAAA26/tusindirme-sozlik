import { Button, Card, Form, List, message, Modal, Select, Space } from 'antd'
import { useState } from 'react'
import useCreateAntonym from '../hooks/useCreateAntonym.ts'
import useDeleteAntonym from '../hooks/useDeleteAntonym.ts'
import useCreateSynonym from '../hooks/useCreateSynonym.ts'
import useDeleteSynonym from '../hooks/useDeleteSynonym.ts'

export default function CardAntonymSynonym({ selectedWord, words, isAntonym }) {
    const [ open, setOpen ] = useState(false)
    const [ confirmLoading, setConfirmLoading ] = useState(false)
    const [ form ] = Form.useForm()
    const [ messageApi, contextHolder ] = message.useMessage()

    const { createAntonym, isPending: isCreatingAntonym } = useCreateAntonym()
    const { deleteAntonym } = useDeleteAntonym()
    const { createSynonym, isPending: isCreatingSynonym } = useCreateSynonym()
    const { deleteSynonym } = useDeleteSynonym()

    const initialAntonyms = selectedWord.antonym.map(item => item.id) || []
    const initialSynonyms = selectedWord.synonym.map(item => item.id) || []
    const initialValue = isAntonym ? initialAntonyms : initialSynonyms

    const OptionsForSelect = words?.data
        .filter(word => word.id !== selectedWord.id)
        .map(word => ({
            label: word.title.latin,
            value: word.id,
            desc: `${word.title.latin}(${word.title.kiril})`,
        }))

    const showModal = () => {
        setOpen(true)
        form.setFieldValue('antonyms', initialValue)
    }

    const handleOk = (value) => {
        if (!value.antonyms) return
        setConfirmLoading(true)

        if (isAntonym) {
            createAntonym({
                newAntonym: {
                    word_id: selectedWord.id,
                    antonym_id: value.antonyms,
                }
            }, {
                onSuccess: () => {
                    form.resetFields()

                    setOpen(false)
                    setConfirmLoading(false)
                    messageApi.open({
                        type: 'success',
                        content: 'Antonym successfully added!',
                    })
                },
                onError: (error) => {
                    messageApi.open({
                        type: 'error',
                        content: 'Could not add antonym!',
                    })
                }
            })
        } else {
            createSynonym({
                newSynonym: {
                    word_id: selectedWord.id,
                    synonym_id: value.antonyms,
                }
            }, {
                onSuccess: () => {
                    form.resetFields()

                    setOpen(false)
                    setConfirmLoading(false)
                    messageApi.open({
                        type: 'success',
                        content: 'Synonym successfully added!',
                    })
                },
                onError: (error) => {
                    messageApi.open({
                        type: 'error',
                        content: 'Could not add synonym!',
                    })
                }
            })
        }
    }
    const handleCancel = () => {
        setOpen(false)
        form.resetFields()
    }

    function handleDelete(id) {
        if (isAntonym) {
            deleteAntonym({
                idWord: selectedWord.id,
                idAntonym: id,
            }, {
                onSuccess: () => {
                    form.resetFields()

                    setOpen(false)
                    setConfirmLoading(false)
                    messageApi.open({
                        type: 'success',
                        content: 'Antonym successfully deleted!',
                    })
                },
                onError: (error) => {
                    messageApi.open({
                        type: 'error',
                        content: 'Could not delete antonym!',
                    })
                }
            })
        } else {
            deleteSynonym({
                idWord: selectedWord.id,
                idSynonym: id,
            }, {
                onSuccess: () => {
                    form.resetFields()

                    setOpen(false)
                    setConfirmLoading(false)
                    messageApi.open({
                        type: 'success',
                        content: 'Synonym successfully deleted!',
                    })
                },
                onError: (error) => {
                    messageApi.open({
                        type: 'error',
                        content: 'Could not delete synonym!',
                    })
                }
            })
        }
    }

    return (
        <>
            {contextHolder}
            <Card
                title={isAntonym ? 'Antonyms:' : 'Synonyms:'}
                style={{ width: '25rem' }}
                extra={<Button onClick={showModal}>edit</Button>}
            >
                <Modal
                    title={isAntonym ? 'Edit Antonym' : 'Edit Synonym'}
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
                            label={isAntonym ? 'antonyms' : 'synonyms'}
                            name="antonyms"
                            rules={[
                                {
                                    required: true,
                                    message: isAntonym ? 'Please choose antonym words!' : 'Please choose synonym words!',
                                }
                            ]}
                        >
                            <Select
                                mode="multiple"
                                disabled={isCreatingAntonym || isCreatingSynonym}
                                options={OptionsForSelect}
                                optionRender={(option) => (
                                    <Space>
                                        {option.data.desc}
                                    </Space>
                                )}
                            />
                        </Form.Item>
                    </Form>
                </Modal>

                <List
                    dataSource={isAntonym ? selectedWord.antonym : selectedWord.synonym}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                title={item.title.latin}
                                description={item.title.kiril}
                            />
                            <Button
                                danger={true}
                                onClick={() => handleDelete(item.id)}
                            >
                                delete
                            </Button>
                        </List.Item>
                    )}
                />
            </Card>
        </>
    )
}

