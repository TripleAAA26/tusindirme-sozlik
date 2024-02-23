import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createAdminApi } from '../../../service/adminApi.ts'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../auth/authSlice.ts'


type ArgTypes = {
    newAdmin: { name: string, phone: string, role_id: number, password: string },
}
export default function useCreateAdmin() {
    const queryClient = useQueryClient()
    const accessToken = useSelector(selectCurrentToken)

    const { mutate: createAdmin, isPending } = useMutation({
        mutationFn: ({ newAdmin }: ArgTypes) =>
            createAdminApi({ accessToken, newAdmin }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ 'adminList' ],
                refetchType: 'all',
            })
        },
        onError: (error) => {
            console.log(error)
        },
    })

    return { createAdmin, isPending }
}