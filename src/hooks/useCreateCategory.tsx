import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCategoryApi } from '../service/categoryApi.ts'
import useAuth from './useAuth.tsx'

type ArgTypes = {
    newCategory: { title: { kiril: string, latin: string } },
}
export default function useCreateCategory() {
    const queryClient = useQueryClient()
    const { auth } = useAuth()

    const { mutate: createCategory, isPending, error } = useMutation({
        mutationFn: ({ newCategory }: ArgTypes) =>
            createCategoryApi({ accessToken: auth, newCategory }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ 'categoryList' ],
                refetchType: 'all',
            })
        },
        onError: (error) => {
            console.log(error)
        },
    })

    return { createCategory, isPending,  error }
}