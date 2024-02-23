import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAntonymApi } from '../../../service/wordApi.ts'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../auth/authSlice.ts'


type ArgTypes = {
    newAntonym: {
        word_id: number,
        antonym_id: number[]
    }
}
export default function useCreateAntonym() {
    const queryClient = useQueryClient()
    const accessToken = useSelector(selectCurrentToken)

    const { mutate: createAntonym, isPending } = useMutation({
        mutationFn: ({ newAntonym }: ArgTypes) =>
            createAntonymApi({ accessToken, newAntonym }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ 'words' ],
            })
        },
        onError: (error) => {
            console.log(error)
        },
    })

    return { createAntonym, isPending }
}