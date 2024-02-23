import { useQuery } from '@tanstack/react-query'
import { List } from 'antd'

import { getWordsApi } from '../service/wordApi.ts'
import WordItem from '../features/Admin-Panel/Word/WordItem.tsx'
import CreateUpdateWord from '../features/Admin-Panel/Word/CreateUpdateWord.tsx'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../features/auth/authSlice.ts'



export default function Word() {
    const accessToken = useSelector(selectCurrentToken)
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

export const loader = (queryClient, accessToken) =>
    async ({ params }) => {

        return (
            await queryClient.ensureQueryData(wordsQuery(accessToken))
        )
    }