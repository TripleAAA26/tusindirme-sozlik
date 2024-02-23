import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteAudioApi } from '../../../service/wordApi.ts'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../auth/authSlice.ts'

type ArgTypes ={
    idWord: number
}
export default function useDeleteAudio() {
    const queryClient = useQueryClient()
    const accessToken = useSelector(selectCurrentToken)

    const { mutate: deleteAudio, isPending } = useMutation({
        mutationFn: ( { idWord }: ArgTypes ) =>
            deleteAudioApi({ accessToken, idWord }),
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