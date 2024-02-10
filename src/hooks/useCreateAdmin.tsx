import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAuth from './useAuth.tsx'
import { createAdminApi } from '../service/adminApi.ts'


type ArgTypes = {
    newAdmin: { name: string, phone: string, role_id: number, password: string },
}
export default function useCreateAdmin() {
    const queryClient = useQueryClient()
    const { auth } = useAuth()

    const { mutate: createAdmin, isPending } = useMutation({
        mutationFn: ({ newAdmin }: ArgTypes) =>
            createAdminApi({ accessToken: auth, newAdmin }),
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