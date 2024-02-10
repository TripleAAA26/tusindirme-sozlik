import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAuth from './useAuth.tsx'
import { createAntonymApi } from '../service/wordApi.ts'


type ArgTypes = {
    newAntonym: {
        word_id: number,
        antonym_id: number[]
    }
}
export default function useCreateAntonym() {
    const queryClient = useQueryClient()
    const { auth } = useAuth()

    const { mutate: createAntonym, isPending } = useMutation({
        mutationFn: ({ newAntonym }: ArgTypes) =>
            createAntonymApi({ accessToken: auth, newAntonym }),
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