import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createSynonymApi } from '../../../service/wordApi.ts'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../auth/authSlice.ts'


type ArgTypes = {
    newSynonym: {
        word_id: number,
        synonym_id: number[]
    }
}
export default function useCreateSynonym() {
    const queryClient = useQueryClient()
    const accessToken = useSelector(selectCurrentToken)

    const { mutate: createSynonym, isPending } = useMutation({
        mutationFn: ({ newSynonym }: ArgTypes) =>
            createSynonymApi({ accessToken, newSynonym }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ 'words' ],
            })
        },
        onError: (error) => {
            console.log(error)
        },
    })

    return { createSynonym, isPending }
}