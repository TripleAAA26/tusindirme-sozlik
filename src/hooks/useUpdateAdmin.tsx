import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAuth from './useAuth.tsx'
import { updateAdminApi } from '../service/adminApi.ts'


type ArgTypes = {
    updatedAdmin: { user_id: number, name: string, phone: string, role_id: number },
}
export default function useUpdateAdmin() {
    const queryClient = useQueryClient()
    const { auth } = useAuth()

    const { mutate: updateAdmin, isPending } = useMutation({
        mutationFn: ({ updatedAdmin }: ArgTypes) =>
            updateAdminApi({ accessToken: auth, updatedAdmin }),
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