import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAuth from './useAuth.tsx'
import { deleteAdminApi } from '../service/adminApi.ts'


type ArgTypes = {
    user_id: number
}
export default function useDeleteAdmin() {
    const queryClient = useQueryClient()
    const { auth } = useAuth()

    const { mutate: deleteAdmin, isPending } = useMutation({
        mutationFn: ({ user_id }: ArgTypes) =>
            deleteAdminApi({ accessToken: auth, user_id }),
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