import { BarsOutlined, FileWordOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Flex, Layout, Menu } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'
import { useLogout } from '../features/auth/useLogout.ts'
import useGetSuperAdmin from '../hooks/useGetSuperAdmin.tsx'


const {
    Header,
    Content,
    Footer,
    Sider
} = Layout

export default function  AdminPanel()  {
    const navigate = useNavigate()
    const { logout } = useLogout()

    const { superAdmin, isPending } = useGetSuperAdmin()

    return (
        <Layout style={{ height: '100vh', }}>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken)
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type)
                }}
            >
                <div className="demo-logo-vertical"/>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[ '4' ]} items={[
                    { key: '1', icon: <UserOutlined />, label: 'Super Admin', onClick: () => navigate('/admin/superadmin') },
                    { key: '2', icon: <BarsOutlined />, label: 'Category', onClick: () => navigate('/admin/category') },
                    { key: '3', icon: <FileWordOutlined />, label: 'Word', onClick: () => navigate('/admin/word') },
                ]}/>
            </Sider>

            <Layout>
                <Header style={{ padding: '0 1rem', background: 'lightcyan', fontSize: '1rem' }}>
                    <Flex align='center' justify='space-between'>
                        Admin Panel
                        <Flex gap='2rem' align='center'>
                            <Flex gap='1rem'>
                                <UserOutlined />
                                <span>{!isPending && superAdmin.data.name}</span>
                            </Flex>
                            <Button type='text' onClick={() => logout()}><LogoutOutlined /></Button>
                        </Flex>
                    </Flex>
                </Header>

                <Content style={{ margin: '24px 16px 0', overflow: 'scroll'}}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: 'lightblue',
                            borderRadius: '1rem',
                        }}
                    >
                        <Outlet/>
                    </div>
                </Content>

                <Footer style={{ textAlign: 'center', backgroundColor:'lightcyan' }}>
                    Avtorlıq huqıqı © {new Date().getFullYear()} Bookie audiokitaplar, "KARSOFT-IT-SOLUTIONS" JSHJ • Barlıq huqıqlar qorǵalǵan.
                </Footer>
            </Layout>
        </Layout>
    )
}
