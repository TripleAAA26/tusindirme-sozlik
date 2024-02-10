import { useState } from 'react'
import useCreateWord from '../hooks/useCreateWord.ts'
import { Button, Flex, Form, Input, Modal, Select } from 'antd'
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import useUpdateWord from '../hooks/useUpdateWord.ts'
import { useQuery } from '@tanstack/react-query'
import { getCategoryApi } from '../service/categoryApi.ts'
import useAuth from '../hooks/useAuth.tsx'

export default function CreateUpdateWord({ item = {} }) {
    const [ open, setOpen ] = useState(false)
    const [ confirmLoading, setConfirmLoading ] = useState(false)
    const [ form ] = Form.useForm()

    const [ categoryId, setCategoryId ] = useState(0)
    const [ titleKiril, setTitleKiril ] = useState('')
    const [ titleLatin, setTitleLatin ] = useState('')
    const [ descriptionKiril, setDescriptionKiril ] = useState('')
    const [ descriptionLatin, setDescriptionLatin ] = useState('')
    const isUpdateSession = Boolean(item.id)

    const { createWord, isPending:isCreactingWord } = useCreateWord()
    const { updateWord, isPending:isUpdatingWord } = useUpdateWord()

    const { auth } = useAuth()
    const { data: categories } = useQuery({
        queryKey: [ 'categoryList' ],
        queryFn: async () => getCategoryApi({ accessToken: auth })
    })

    const categoryOptions = categories?.data.map(category => ({ value: category.id, label: category.title.latin }))

    const showModal = () => {
        setOpen(true)

        if (isUpdateSession) {
            setCategoryId(item.category_id)
            setTitleKiril(item.title.kiril)
            setTitleLatin(item.title.latin)
            setDescriptionKiril(item.description.kiril)
            setDescriptionLatin(item.description.latin)
        }
    }
    const handleOk = () => {
        if (!titleKiril || !titleLatin || !descriptionKiril || !descriptionLatin) return
        setConfirmLoading(true)

        if (isUpdateSession) {
            updateWord({
                idWord: item.id,
                updatedWord: {
                    category_id: categoryId,
                    title: {
                        kiril: titleKiril,
                        latin: titleLatin,
                    },
                    description: {
                        kiril: descriptionKiril,
                        latin: descriptionLatin
                    }
                }
            },{
                onSettled: () => {
                    setCategoryId(0)
                    setTitleKiril('')
                    setTitleLatin('')
                    setDescriptionKiril('')
                    setDescriptionLatin('')
                    form.resetFields()
                }
            })
        } else {
            createWord({
                newWord: {
                    category_id: 1,
                    title: {
                        kiril: titleKiril,
                        latin: titleLatin,
                    },
                    description: {
                        kiril: descriptionKiril,
                        latin: descriptionLatin
                    }
                }
            }, {
                onSettled: () => {
                    setCategoryId(0)
                    setTitleKiril('')
                    setTitleLatin('')
                    setDescriptionKiril('')
                    setDescriptionLatin('')
                    form.resetFields()
                }
            })
        }

        setTimeout(() => {
            setOpen(false)
            setConfirmLoading(false)
        }, 2000)
    }
    const handleCancel = () => {
        setOpen(false)

        setCategoryId(0)
        setTitleKiril('')
        setTitleLatin('')
        setDescriptionKiril('')
        setDescriptionLatin('')
        form.resetFields()
    }


    return (
        <>
            <Flex justify='end'>
                <Button type={isUpdateSession ? 'default' : 'primary'} onClick={showModal}>
                    {isUpdateSession ? <div><EditOutlined /> edit</div> :  <div><PlusCircleOutlined/> Create word</div> }
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
                        initialValue={isUpdateSession && item.category_id}
                        label='category'
                        name='category'
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
                            value={categoryId}
                            onChange={(value) => setCategoryId(value)}
                        />
                    </Form.Item>

                    <Form.Item
                        initialValue={isUpdateSession ? item.title.kiril : ''}
                        label='title kiril'
                        name='title kiril'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your title kiril!',
                            }
                        ]}
                    >
                        <Input
                            disabled={isCreactingWord || isUpdatingWord}
                            value={titleKiril}
                            onChange={(e) => setTitleKiril(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        initialValue={isUpdateSession ? item.title.latin : ''}
                        label='title latin'
                        name='title latin'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your title latin!',
                            }
                        ]}
                    >
                        <Input
                            disabled={isCreactingWord || isUpdatingWord}
                            value={titleLatin}
                            onChange={(e) => setTitleLatin(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        initialValue={isUpdateSession ? item.description.kiril : ''}
                        label='description kiril'
                        name='description kiril'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your description kiril!',
                            }
                        ]}
                    >
                        <Input.TextArea

                            disabled={isCreactingWord || isUpdatingWord}
                            value={descriptionKiril}
                            onChange={(e) => setDescriptionKiril(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        initialValue={isUpdateSession ? item.description.latin : ''}
                        label='description latin'
                        name='description latin'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your description latin!',
                            }
                        ]}
                    >
                        <Input.TextArea
                            disabled={isCreactingWord || isUpdatingWord}
                            value={descriptionLatin}
                            onChange={(e) => setDescriptionLatin(e.target.value)}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

