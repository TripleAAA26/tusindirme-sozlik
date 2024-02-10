import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAuth from './useAuth.tsx'
import { updateWordApi } from '../service/wordApi.ts'


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
    const { auth } = useAuth()

    const { mutate: updateWord, isPending } = useMutation({
        mutationFn: ({ idWord, updatedWord }: ArgTypes) =>
            updateWordApi({ accessToken: auth, idWord, updatedWord }),
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

