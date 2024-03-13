import { useQuery } from '@tanstack/react-query'
import { getWordOfDay } from '../service/getWords.ts'


export default function useGetWordOfDay() {
    const { data: wordOfDay, isLoading:isLoadingWordOfDay } = useQuery({
        queryKey: [ 'wordofday' ],
        queryFn: async () => getWordOfDay(),
    })

    return { wordOfDay, isLoadingWordOfDay }
}