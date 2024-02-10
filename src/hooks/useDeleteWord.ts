import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAuth from './useAuth.tsx'
import { deleteWordApi } from '../service/wordApi.ts'

type ArgTypes = {
    idWord: number
}

export default function useDeleteWord() {
    const queryClient = useQueryClient()
    const { auth } = useAuth()

    const { mutate: deleteWord, isPending } = useMutation({
        mutationFn: ( { idWord }: ArgTypes ) =>
            deleteWordApi({ accessToken: auth, idWord }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ 'words' ],
            })
        },
        onError: (error) => {
            console.log(error)
        },
    })

    return { deleteWord, isPending }
}

