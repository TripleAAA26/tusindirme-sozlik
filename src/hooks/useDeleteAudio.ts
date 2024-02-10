import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAuth from './useAuth.tsx'
import { deleteAudioApi } from '../service/wordApi.ts'

type ArgTypes ={
    idWord: number
}
export default function useDeleteAudio() {
    const queryClient = useQueryClient()
    const { auth } = useAuth()

    const { mutate: deleteAudio, isPending } = useMutation({
        mutationFn: ( { idWord }: ArgTypes ) =>
            deleteAudioApi({ accessToken: auth, idWord }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ 'words' ],
            })
        },
        onError: (error) => {
            console.log(error)
        },
    })

    return { deleteAudio, isPending }
}