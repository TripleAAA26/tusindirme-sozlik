import { useState } from 'react'
import useCreateWord from './useCreateWord.ts'
import { Button, Flex, Form, Input, message, Modal, Select } from 'antd'
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import useUpdateWord from './useUpdateWord.ts'
import { useQuery } from '@tanstack/react-query'
import { getCategoryApi } from '../../../service/categoryApi.ts'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../auth/authSlice.ts'
import { useMediaQuery } from 'react-responsive'


export default function CreateUpdateWord({ item = {} }) {
    const [ open, setOpen ] = useState(false)
    const [ confirmLoading, setConfirmLoading ] = useState(false)
    const [ form ] = Form.useForm()
    const [ messageApi, contextHolder ] = message.useMessage()

    const isUpdateSession = Boolean(item.id)

    const { createWord, isPending:isCreactingWord } = useCreateWord()
    const { updateWord, isPending:isUpdatingWord } = useUpdateWord()

    const isMobile = useMediaQuery({ query: '(max-width: 500px)' })

    const accessToken = useSelector(selectCurrentToken)
    const { data: categories } = useQuery({
        queryKey: [ 'categoryList' ],
        queryFn: async () => getCategoryApi({ accessToken })
    })

    const categoryOptions = categories?.data.map(category => ({ value: category.id, label: category.title.latin }))

    const showModal = () => {
        setOpen(true)

        if (isUpdateSession) {
            form.setFieldsValue({
                'categoryId': item.category_id,
                'titleKiril': item.title.kiril,
                'titleLatin': item.title.latin,
                'descriptionKiril': item.description.kiril,
                'descriptionLatin': item.description.latin,
            })
        }
    }
    const handleOk = (values) => {
        if (!values.categoryId || !values.titleKiril || !values.titleLatin ||
            !values.descriptionKiril || !values.descriptionLatin) return
        setConfirmLoading(true)

        if (isUpdateSession) {
            updateWord({
                idWord: item.id,
                updatedWord: {
                    category_id: values.categoryId,
                    title: {
                        kiril: values.titleKiril,
                        latin: values.titleLatin,
                    },
                    description: {
                        kiril: values.descriptionKiril,
                        latin: values.descriptionLatin
                    }
                }
            },{
                onSuccess: () => {
                    form.resetFields()

                    setOpen(false)
                    setConfirmLoading(false)
                    messageApi.open({
                        type: 'success',
                        content: 'Word successfully updated!',
                    })
                },
                onError: (error) => {
                    messageApi.open({
                        type: 'error',
                        content: 'Could not update word!',
                    })
                }
            })
        } else {
            createWord({
                newWord: {
                    category_id: 1,
                    title: {
                        kiril: values.titleKiril,
                        latin: values.titleLatin,
                    },
                    description: {
                        kiril: values.descriptionKiril,
                        latin: values.descriptionLatin
                    }
                }
            }, {
                onSuccess: () => {
                    form.resetFields()

                    setOpen(false)
                    setConfirmLoading(false)
                    messageApi.open({
                        type: 'success',
                        content: 'Word successfully created!',
                    })
                },
                onError: (error) => {
                    messageApi.open({
                        type: 'error',
                        content: 'Could not create word!',
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
                    {isUpdateSession ?
                        isMobile ? <EditOutlined /> : <span><EditOutlined /> edit</span>
                        :
                        isMobile ? <PlusCircleOutlined/> : <span><PlusCircleOutlined/> Create word</span>
                    }
                </Button>
            </Flex>
            <Modal
                title={isUpdateSession ? 'Edit word' : 'Create word'}
                open={open}
                onOk={form.submit}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                destroyOnClose={true}
            >
                <Form
                    form={form}
                    name='basic'
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    style={{ maxWidth: '25rem' }}
                    onFinish={handleOk}
                >
                    <Form.Item
                        label='category'
                        name='categoryId'
                        rules={[
                            {
                                required: true,
                                message: 'Please choose your category!',
                            }
                        ]}
                    >
                        <Select
                            options={categoryOptions}
                            disabled={isCreactingWord || isUpdatingWord}
                        />
                    </Form.Item>

                    <Form.Item
                        label='title kiril'
                        name='titleKiril'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your title kiril!',
                            }
                        ]}
                    >
                        <Input
                            disabled={isCreactingWord || isUpdatingWord}
                        />
                    </Form.Item>

                    <Form.Item
                        label='title latin'
                        name='titleLatin'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your title latin!',
                            }
                        ]}
                    >
                        <Input
                            disabled={isCreactingWord || isUpdatingWord}
                        />
                    </Form.Item>

                    <Form.Item
                        label='description kiril'
                        name='descriptionKiril'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your description kiril!',
                            }
                        ]}
                    >
                        <Input.TextArea
                            disabled={isCreactingWord || isUpdatingWord}
                        />
                    </Form.Item>

                    <Form.Item
                        label='description latin'
                        name='descriptionLatin'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your description latin!',
                            }
                        ]}
                    >
                        <Input.TextArea
                            disabled={isCreactingWord || isUpdatingWord}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

