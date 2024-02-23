import { useQuery } from '@tanstack/react-query'
import { getSuperAdminApi } from '../service/adminApi.ts'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../features/auth/authSlice.ts'

export default function useGetSuperAdmin() {
    const accessToken = useSelector(selectCurrentToken)

    const { data: superAdmin, isPending } = useQuery({
        queryKey: [ 'superAdmin' ],
        queryFn: async () => getSuperAdminApi({ accessToken })
    })

    return { superAdmin, isPending }
}

