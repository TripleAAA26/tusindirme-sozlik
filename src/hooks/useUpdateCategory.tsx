import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCategoryApi } from '../service/categoryApi.ts'
import useAuth from './useAuth.tsx'


type ArgTypes = {
    newCategory: { title: { kiril: string, latin: string } },
    idCategory: number
}
export default function useUpdateCategory() {
    const queryClient = useQueryClient()
    const { auth } = useAuth()

    const { mutate: updateCategory, isPending, error } = useMutation({
        mutationFn: ({ newCategory, idCategory }: ArgTypes) =>
            updateCategoryApi({ accessToken: auth, newCategory, idCategory }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ 'categoryList' ]
            })
        },
        onError: (error) => {
            console.log(error)
        },
    })

    return { updateCategory, isPending,  error }
}

