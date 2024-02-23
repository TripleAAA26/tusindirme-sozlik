import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAudioApi } from '../../../service/wordApi.ts'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../auth/authSlice.ts'


type ArgTypes = {
    idWord: number,
    audioFile: FormData,
}
export default function useCreateAudio() {
    const queryClient = useQueryClient()
    const accessToken = useSelector(selectCurrentToken)

    const { mutate: createAudio, isPending } = useMutation({
        mutationFn: ({ idWord, audioFile }: ArgTypes) =>
            createAudioApi({ accessToken, idWord, audioFile }),
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