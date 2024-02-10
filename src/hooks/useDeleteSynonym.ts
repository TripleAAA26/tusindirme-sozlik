import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAuth from './useAuth.tsx'
import { deleteSynonymApi } from '../service/wordApi.ts'



type ArgTypes = {
    idWord: number,
    idSynonym: number
}
export default function useDeleteSynonym() {
    const queryClient = useQueryClient()
    const { auth } = useAuth()

    const { mutate: deleteSynonym, isPending } = useMutation({
        mutationFn: ( { idWord, idSynonym }: ArgTypes ) =>
            deleteSynonymApi({ accessToken: auth, idWord, idSynonym }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ 'words' ],
            })
        },
        onError: (error) => {
            console.log(error)
        },
    })

    return { deleteSynonym, isPending }
}