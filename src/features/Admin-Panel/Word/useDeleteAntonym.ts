import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteAntonymApi } from '../../../service/wordApi.ts'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../auth/authSlice.ts'


type ArgTypes = {
    idWord: number,
    idAntonym: number
}
export default function useDeleteAntonym() {
    const queryClient = useQueryClient()
    const accessToken = useSelector(selectCurrentToken)

    const { mutate: deleteAntonym, isPending } = useMutation({
        mutationFn: ( { idWord, idAntonym }: ArgTypes ) =>
            deleteAntonymApi({ accessToken, idWord, idAntonym }),
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