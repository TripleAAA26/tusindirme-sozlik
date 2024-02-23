import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCategoryApi } from '../../../service/categoryApi.ts'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../auth/authSlice.ts'


type ArgTypes = {
    idCategory: number
}
export default function useDeleteCategory() {
    const queryClient = useQueryClient()
    const accessToken = useSelector(selectCurrentToken)

    const { mutate: deleteCategory, isPending } = useMutation({
        mutationFn: ( { idCategory }: ArgTypes ) =>
            deleteCategoryApi({ accessToken, idCategory }),
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

