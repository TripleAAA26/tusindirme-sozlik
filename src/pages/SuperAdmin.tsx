import useAuth from '../hooks/useAuth.tsx'
import { useQuery } from '@tanstack/react-query'
import { List } from 'antd'
import { getAdminApi } from '../service/adminApi.ts'
import AdminItem from '../components/AdminItem.tsx'
import CreateUpdateAdmin from '../components/CreateUpdateAdmin.tsx'


export default function SuperAdmin() {
    const { auth: accessToken } = useAuth()
    const { data: admins } = useQuery(adminListQuery(accessToken))

    return (
        <>
            <CreateUpdateAdmin />
            <List
                itemLayout="horizontal"
                dataSource={admins.data}
                renderItem={(item, index) => (
                    <AdminItem item={item} key={index}/>
                )}
            />
        </>
    )
}



const adminListQuery = (accessToken) => ({
    queryKey: [ 'adminList' ],
    queryFn: async () => getAdminApi({ accessToken })
})

export const loader = (queryClient, auth) =>
    async ({ params }) => {

        return (
            await queryClient.ensureQueryData(adminListQuery(auth))
        )
    }
