import { useQuery } from '@tanstack/react-query'
import { getCategoryApi } from '../service/categoryApi.ts'
import CategoryItem from '../components/CategoryItem.tsx'
import { List } from 'antd'
import useAuth from '../hooks/useAuth.tsx'
import CreateUpdateCategory from '../components/CreateUpdateCategory.tsx'


export default function Category() {

    const { auth: accessToken } = useAuth()
    const { data: categories } = useQuery(categoryListQuery(accessToken))

    return (
        <>
            <CreateUpdateCategory />
            <List
                itemLayout="horizontal"
                dataSource={categories?.data}
                renderItem={(item, index) => (
                    <CategoryItem item={item} key={index}/>
                )}
            />
        </>
    )
}


const categoryListQuery = (accessToken) => ({
    queryKey: [ 'categoryList' ],
    queryFn: async () => getCategoryApi({ accessToken })
})

export const loader = (queryClient, auth) =>
    async ({ params }) => {

        return (
            await queryClient.ensureQueryData(categoryListQuery(auth))
        )
    }
