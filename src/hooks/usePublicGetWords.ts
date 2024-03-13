import { useQuery } from '@tanstack/react-query'
import { getWords } from '../service/getWords.ts'

export default function usePublicGetWords() {
    const { data: wordList, isLoading:isLoadingWords } = useQuery({
        queryKey: [ 'wordlist' ],
        queryFn: async () => getWords(),
    })

    return { wordList, isLoadingWords }
}

