import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCategoryApi } from '../../../service/categoryApi.ts'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../auth/authSlice.ts'


type ArgTypes = {
    newCategory: { title: { kiril: string, latin: string } },
    idCategory: number
}
export default function useUpdateCategory() {
    const queryClient = useQueryClient()
    const accessToken = useSelector(selectCurrentToken)

    const { mutate: updateCategory, isPending, error } = useMutation({
        mutationFn: ({ newCategory, idCategory }: ArgTypes) =>
            updateCategoryApi({ accessToken, newCategory, idCategory }),
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

