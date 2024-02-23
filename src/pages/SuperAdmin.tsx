
import { useQuery } from '@tanstack/react-query'
import { List } from 'antd'
import { getAdminApi } from '../service/adminApi.ts'
import AdminItem from '../features/Admin-Panel/SuperAdmin/AdminItem.tsx'
import CreateUpdateAdmin from '../features/Admin-Panel/SuperAdmin/CreateUpdateAdmin.tsx'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../features/auth/authSlice.ts'


export default function SuperAdmin() {
    const accessToken = useSelector(selectCurrentToken)
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

export const loader = (queryClient, accessToken) =>
    async ({ params }) => {

        return (
            await queryClient.ensureQueryData(adminListQuery(accessToken))
        )
    }
