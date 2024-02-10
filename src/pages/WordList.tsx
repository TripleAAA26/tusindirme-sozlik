import { Card, Flex, Pagination } from "antd"
import { getWords } from '../service/getWords.ts'
import { useQuery } from '@tanstack/react-query'

export default function WordList() {
    const { data: wordList } = useQuery(wordListQuery())
    console.log('HI!',wordList)

    return (
        <div style={{
            paddingLeft: '10rem',
            paddingRight: '10rem',
            marginBottom: '5rem',
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: '100rem'
        }}>
            <h2>Sózler dizimi</h2>
            <Card style={{ marginBottom: '5rem' }}>
                <p style={{ color: '#229ED9', fontSize: '2rem', fontWeight: 'bold' }}>
                    Aa
                </p>
                <ul>
                    <li>
                        Abadan
                    </li>
                </ul>
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


