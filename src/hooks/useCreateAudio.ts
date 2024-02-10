import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAuth from './useAuth.tsx'
import { createAudioApi } from '../service/wordApi.ts'


type ArgTypes = {
    idWord: number,
}
export default function useCreateAudio() {
    const queryClient = useQueryClient()
    const { auth } = useAuth()

    const { mutate: createAudio, isPending } = useMutation({
        mutationFn: ({ idWord }: ArgTypes) =>
            createAudioApi({ accessToken: auth, idWord }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ 'words' ],
            })
        },
        onError: (error) => {
            console.log(error)
        },
    })

    return { createAudio, isPending }
}