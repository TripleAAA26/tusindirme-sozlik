import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAuth from './useAuth.tsx'
import { isCorrectApi } from '../service/wordApi.ts'

type ArgTypes = {
    idWord: number,
    updatedIsCorrect: {
        is_correct: boolean
    }
}
export default function useIsCorrect() {
    const queryClient = useQueryClient()
    const { auth } = useAuth()

    const { mutate: isCorrect, isPending } = useMutation({
        mutationFn: ({ idWord, updatedIsCorrect }: ArgTypes) =>
            isCorrectApi({ accessToken: auth, idWord, updatedIsCorrect }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ 'words' ]
            })
        },
        onError: (error) => {
            console.log(error)
        },
    })

    return { isCorrect, isPending }
}