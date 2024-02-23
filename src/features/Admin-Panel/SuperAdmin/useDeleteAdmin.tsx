import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteAdminApi } from '../../../service/adminApi.ts'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../auth/authSlice.ts'


type ArgTypes = {
    user_id: number
}
export default function useDeleteAdmin() {
    const queryClient = useQueryClient()
    const accessToken = useSelector(selectCurrentToken)

    const { mutate: deleteAdmin, isPending } = useMutation({
        mutationFn: ({ user_id }: ArgTypes) =>
            deleteAdminApi({ accessToken, user_id }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ 'adminList' ],
            })
        },
        onError: (error) => {
            console.log(error)
        },
    })

    return { deleteAdmin, isPending }
}