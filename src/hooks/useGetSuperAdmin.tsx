import useAuth from './useAuth.tsx'
import { useQuery } from '@tanstack/react-query'
import { getSuperAdminApi } from '../service/adminApi.ts'

export default function useGetSuperAdmin() {
    const { auth: accessToken } = useAuth()

    const { data: superAdmin, isPending } = useQuery({
        queryKey: [ 'superAdmin' ],
        queryFn: async () => getSuperAdminApi({ accessToken })
    })

    return { superAdmin, isPending }
}

