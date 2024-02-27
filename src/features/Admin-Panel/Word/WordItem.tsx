import { Button, List, message } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import useDeleteWord from './useDeleteWord.ts'
import CreateUpdateWord from './CreateUpdateWord.tsx'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

export default function WordItem({ item }) {
    const { deleteWord, isPending:isDeletingWord } = useDeleteWord()
    const [ messageApi, contextHolder ] = message.useMessage()

    const isMobile = useMediaQuery({ query: '(max-width: 500px)' })

    function handleDelete() {
        deleteWord({ idWord: item.id }, {
            onSuccess: () => {
                messageApi.open({
                    type: 'success',
                    content: 'Word successfully deleted!',
                })
            },
            onError: (error) => {
                messageApi.open({
                    type: 'error',
                    content: 'Could not delete word!',
                })
            }
        })
    }

    return (
        <>
            {contextHolder}
            <List.Item actions={[
                <Button type='default' danger={true} loading={isDeletingWord} onClick={handleDelete}>
                    { isMobile ? <DeleteOutlined/> : <span><DeleteOutlined/>delete</span>}
                </Button>
            ]}>
                <Link to={`${item.id}`} style={{ marginRight: 'auto'}}>
                    <List.Item.Meta
                        title={<p>{item.title.latin}</p>}
                        description={item.title.kiril}
                    />
                </Link>
                <CreateUpdateWord item={item} />
            </List.Item>
        </>
    )
}

