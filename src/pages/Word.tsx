import { useQuery } from '@tanstack/react-query'
import { List } from 'antd'
import useAuth from '../hooks/useAuth.tsx'
import { getWordsApi } from '../service/wordApi.ts'
import WordItem from '../components/WordItem.tsx'
import CreateUpdateWord from '../components/CreateUpdateWord.tsx'



export default function Word() {
    const { auth: accessToken } = useAuth()
    const { data: words } = useQuery(wordsQuery(accessToken))



    return (
        <>
            <CreateUpdateWord />
            <List
                itemLayout="horizontal"
                dataSource={words.data}
                renderItem={(item, index) => (
                    <WordItem item={item} key={index}/>
                )}
            />
        </>
    )
}


const wordsQuery = (accessToken) => ({
    queryKey: [ 'words' ],
    queryFn: async () => getWordsApi({ accessToken })
})

export const loader = (queryClient, auth) =>
    async ({ params }) => {

        return (
            await queryClient.ensureQueryData(wordsQuery(auth))
        )
    }