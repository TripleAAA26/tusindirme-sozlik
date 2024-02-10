import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAuth from './useAuth.tsx'
import { createWordApi } from '../service/wordApi.ts'


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
    const { auth } = useAuth()

    const { mutate: createWord, isPending } = useMutation({
        mutationFn: ({ newWord }: ArgTypes) =>
            createWordApi({ accessToken: auth, newWord }),
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

