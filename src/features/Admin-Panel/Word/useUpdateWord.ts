import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateWordApi } from '../../../service/wordApi.ts'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../auth/authSlice.ts'


type ArgTypes = {
    idWord: number,
    updatedWord: {
        category_id: number,
        title: {
            kiril: string,
            latin: string
        } ,
        description: {
            kiril: string,
            latin: string
        }
    },
}

export default function useUpdateWord() {
    const queryClient = useQueryClient()
    const accessToken = useSelector(selectCurrentToken)

    const { mutate: updateWord, isPending } = useMutation({
        mutationFn: ({ idWord, updatedWord }: ArgTypes) =>
            updateWordApi({ accessToken, idWord, updatedWord }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ 'words' ]
            })
        },
        onError: (error) => {
            console.log(error)
        },
    })

    return { updateWord, isPending }
}

