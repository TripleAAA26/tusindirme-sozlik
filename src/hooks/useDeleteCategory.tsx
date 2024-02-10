import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCategoryApi } from '../service/categoryApi.ts'
import useAuth from './useAuth.tsx'

type ArgTypes = {
    idCategory: number
}
export default function useDeleteCategory() {
    const queryClient = useQueryClient()
    const { auth } = useAuth()

    const { mutate: deleteCategory, isPending } = useMutation({
        mutationFn: ( { idCategory }: ArgTypes ) =>
            deleteCategoryApi({ accessToken: auth, idCategory }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ 'categoryList' ],
            })
        },
        onError: (error) => {
            console.log(error)
        },
    })

    return { deleteCategory, isPending }
}

