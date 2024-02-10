import { Button, List } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import useDeleteWord from '../hooks/useDeleteWord.ts'
import CreateUpdateWord from './CreateUpdateWord.tsx'
import { Link } from 'react-router-dom'

export default function WordItem({ item }) {
    const { deleteWord, isPending:isDeletingWord } = useDeleteWord()

    function handleDelete() {
        deleteWord({ idWord: item.id })
    }

    return (
        <List.Item actions={[ <Button type='default' danger={true} loading={isDeletingWord} onClick={handleDelete}><DeleteOutlined />delete</Button>, ]}>
            <Link to={`${item.id}`}>
                <List.Item.Meta
                    title={<p>{item.title.latin}</p>}
                    description={item.title.kiril}
                />
            </Link>
            <CreateUpdateWord item={item} />
        </List.Item>
    )
}

