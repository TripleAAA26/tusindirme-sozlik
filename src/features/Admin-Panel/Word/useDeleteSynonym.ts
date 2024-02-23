import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteSynonymApi } from '../../../service/wordApi.ts'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../auth/authSlice.ts'



type ArgTypes = {
    idWord: number,
    idSynonym: number
}
export default function useDeleteSynonym() {
    const queryClient = useQueryClient()
    const accessToken = useSelector(selectCurrentToken)

    const { mutate: deleteSynonym, isPending } = useMutation({
        mutationFn: ( { idWord, idSynonym }: ArgTypes ) =>
            deleteSynonymApi({ accessToken, idWord, idSynonym }),
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