import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isCorrectApi } from '../../../service/wordApi.ts'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../auth/authSlice.ts'

type ArgTypes = {
    idWord: number,
    updatedIsCorrect: {
        is_correct: boolean
    }
}
export default function useIsCorrect() {
    const queryClient = useQueryClient()
    const accessToken = useSelector(selectCurrentToken)

    const { mutate: isCorrect, isPending } = useMutation({
        mutationFn: ({ idWord, updatedIsCorrect }: ArgTypes) =>
            isCorrectApi({ accessToken, idWord, updatedIsCorrect }),
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