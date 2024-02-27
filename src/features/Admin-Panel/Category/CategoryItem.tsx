import { Button, List, message } from 'antd'
import useDeleteCategory from './useDeleteCategory.tsx'
import { DeleteOutlined } from '@ant-design/icons'
import CreateUpdateCategory from './CreateUpdateCategory.tsx'
import { useMediaQuery } from 'react-responsive'

export default function CategoryItem({ item }) {
    const [ messageApi, contextHolder ] = message.useMessage()
    const { deleteCategory, isPending: isDeleting } = useDeleteCategory()

    const isMobile = useMediaQuery({ query: '(max-width: 500px)' })

    function handleDelete() {
        deleteCategory({ idCategory: item.id },{
            onSuccess: () => {
                messageApi.open({
                    type: 'success',
                    content: 'Category successfully deleted!',
                })
            },
            onError: (error) => {
                messageApi.open({
                    type: 'error',
                    content: 'Could not delete category!',
                })
            }
        })
    }

    return (
        <>
            {contextHolder}
            <List.Item actions={[
                <Button
                    type='default'
                    danger={true}
                    loading={isDeleting}
                    onClick={handleDelete}
                >
                    { isMobile ? <DeleteOutlined/> : <span><DeleteOutlined/>delete</span>}
                </Button>
            ]}>
                <List.Item.Meta
                    title={<p>{item.title.latin}</p>}
                    description={item.title.kiril}
                />
                <CreateUpdateCategory item={item} />
            </List.Item>
        </>
    )
}

