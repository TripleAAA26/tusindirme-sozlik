import { useQuery } from '@tanstack/react-query'
import { getCategoryApi } from '../../service/categoryApi.ts'
import CategoryItem from '../../features/Admin-Panel/Category/CategoryItem.tsx'
import { List } from 'antd'
import CreateUpdateCategory from '../../features/Admin-Panel/Category/CreateUpdateCategory.tsx'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../features/auth/authSlice.ts'


export default function Category() {
    const accessToken = useSelector(selectCurrentToken)
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

export const loader = (queryClient, accessToken) =>
    async ({ params }) => {

        return (
            await queryClient.ensureQueryData(categoryListQuery(accessToken))
        )
    }
