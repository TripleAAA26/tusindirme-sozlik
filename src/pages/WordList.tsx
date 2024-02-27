import { Button, Card, Flex, List, Pagination } from 'antd'
import { getWords } from '../service/getWords.ts'
import { useQuery } from '@tanstack/react-query'



export default function WordList() {
    const { data: wordList } = useQuery(wordListQuery())
    console.log('HI!',wordList)

    return (
        <div className='container'>
            <h2>Sózler dizimi</h2>
            <Card style={{ marginBottom: '5rem' }}>
                <List
                    itemLayout="horizontal"
                    dataSource={wordList?.data}
                    renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            title={<p>{item.title.latin}</p>}
                            description={item.title.kiril}
                        />
                    </List.Item>
                    )}
                />
            </Card>
            <Flex justify="center">
                <Pagination total={130}/>
            </Flex>
        </div>
    )
}

const wordListQuery = () => ({
    queryKey: [ 'wordlist' ],
    queryFn: async () => getWords(),
})

export const loader = (queryClient) =>
    async ( {params} ) => {
       return  (
           await queryClient.ensureQueryData(wordListQuery())
       )
    }


