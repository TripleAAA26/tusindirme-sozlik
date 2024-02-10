import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAuth from './useAuth.tsx'
import { deleteAntonymApi } from '../service/wordApi.ts'


type ArgTypes = {
    idWord: number,
    idAntonym: number
}
export default function useDeleteAntonym() {
    const queryClient = useQueryClient()
    const { auth } = useAuth()

    const { mutate: deleteAntonym, isPending } = useMutation({
        mutationFn: ( { idWord, idAntonym }: ArgTypes ) =>
            deleteAntonymApi({ accessToken: auth, idWord, idAntonym }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ 'words' ],
            })
        },
        onError: (error) => {
            console.log(error)
        },
    })

    return { deleteAntonym, isPending }
}