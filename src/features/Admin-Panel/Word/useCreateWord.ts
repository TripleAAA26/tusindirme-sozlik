import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createWordApi } from '../../../service/wordApi.ts'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../auth/authSlice.ts'


type ArgTypes = {
    newWord: {
        category_id: number,
        title: {
            kiril: string,
            latin: string
        },
        description: {
            kiril: string,
            latin: string
        }
    }
}
export default function useCreateWord() {
    const queryClient = useQueryClient()
    const accessToken = useSelector(selectCurrentToken)

    const { mutate: createWord, isPending } = useMutation({
        mutationFn: ({ newWord }: ArgTypes) =>
            createWordApi({ accessToken, newWord }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ 'words' ],
                refetchType: 'all',
            })
        },
        onError: (error) => {
            console.log(error)
        },
    })

    return { createWord, isPending }
}

