import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCategoryApi } from '../../../service/categoryApi.ts'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../auth/authSlice.ts'

type ArgTypes = {
    newCategory: { title: { kiril: string, latin: string } },
}
export default function useCreateCategory() {
    const queryClient = useQueryClient()
    const accessToken = useSelector(selectCurrentToken)

    const { mutate: createCategory, isPending, error } = useMutation({
        mutationFn: ({ newCategory }: ArgTypes) =>
            createCategoryApi({ accessToken, newCategory }),
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