import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAuth from './useAuth.tsx'
import { createSynonymApi } from '../service/wordApi.ts'


type ArgTypes = {
    newSynonym: {
        word_id: number,
        synonym_id: number[]
    }
}
export default function useCreateSynonym() {
    const queryClient = useQueryClient()
    const { auth } = useAuth()

    const { mutate: createSynonym, isPending } = useMutation({
        mutationFn: ({ newSynonym }: ArgTypes) =>
            createSynonymApi({ accessToken: auth, newSynonym }),
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