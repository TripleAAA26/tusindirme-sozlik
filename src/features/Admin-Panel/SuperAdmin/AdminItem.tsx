import { Button, List, message } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import useDeleteAdmin from './useDeleteAdmin.tsx'
import CreateUpdateAdmin from './CreateUpdateAdmin.tsx'
import { useMediaQuery } from 'react-responsive'




export default function AdminItem({ item }) {
    const [ messageApi, contextHolder ] = message.useMessage()
    const { deleteAdmin, isPending: isDeleting } = useDeleteAdmin()

    const isMobile = useMediaQuery({ query: '(max-width: 500px)' })


    function handleDelete() {
        deleteAdmin({ user_id: item.id }, {
            onSuccess: () => {
                messageApi.open({
                    type: 'success',
                    content: 'Admin successfully deleted!',
                })
            },
            onError: (error) => {
                messageApi.open({
                    type: 'error',
                    content: 'Could not delete admin!',
                })
            }
        })
    }

    return (
        <>
            {contextHolder}
            <List.Item
                actions={[
                    <Button
                        type="default"
                        danger={true}
                        loading={isDeleting}
                        onClick={handleDelete}
                    >
                        { isMobile ? <DeleteOutlined/> : <span><DeleteOutlined/>delete</span>}
                    </Button>
                ]}
            >
                <List.Item.Meta
                    title={<p>{item.name}</p>}
                    description={item.role}
                />
                <CreateUpdateAdmin item={item}/>
            </List.Item>
        </>
    )


}

