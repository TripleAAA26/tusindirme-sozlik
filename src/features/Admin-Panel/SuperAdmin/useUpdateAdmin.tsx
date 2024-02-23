import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateAdminApi } from '../../../service/adminApi.ts'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../auth/authSlice.ts'


type ArgTypes = {
    updatedAdmin: { user_id: number, name: string, phone: string, role_id: number },
}
export default function useUpdateAdmin() {
    const queryClient = useQueryClient()
    const accessToken = useSelector(selectCurrentToken)

    const { mutate: updateAdmin, isPending } = useMutation({
        mutationFn: ({ updatedAdmin }: ArgTypes) =>
            updateAdminApi({ accessToken, updatedAdmin }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ 'adminList' ],
            })
        },
        onError: (error) => {
            console.log(error)
        },
    })

    return { updateAdmin, isPending }
}