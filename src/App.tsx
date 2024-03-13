import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import AppLayout from "./components/AppLayout.tsx"
import Error from "./components/Error.tsx"
import Home from "./pages/user/Home.tsx"
import WordList from "./pages/user/WordList.tsx"
import Login from './pages/admin/Login.tsx'
import AdminPanel from './pages/admin/AdminPanel.tsx'
import RequireAuth from './features/auth/RequireAuth.tsx'
import SuperAdmin, { loader as adminLoader } from './pages/admin/SuperAdmin.tsx'
import Category, { loader as categoryLoader } from './pages/admin/Category.tsx'
import Word, { loader as wordLoader } from './pages/admin/Word.tsx'
import SelectedWord from './pages/admin/SelectedWord.tsx'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from './features/auth/authSlice.ts'
import Blog from './pages/user/Blog.tsx'
import SearchResults from './pages/user/SearchResults.tsx'


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 600
        }
    }
})

const AppRoot = () => {
    const accessToken = useSelector(selectCurrentToken)

    const router = createBrowserRouter([
        {
            element: <AppLayout/>,
            errorElement: <Error/>,
            children: [
                { path: '/', element: <Home/> },
                { path: '/wordlist', element: <WordList/>,  },
                { path: '/wordlist/:letter', element: <WordList/>,  },
                { path: '/about', element: <Blog/> },
                { path: '/soz/:idsoz', element: <SearchResults /> }
            ],
        },
        { path: '/login', element: <Login/> },
        {
            element: <RequireAuth/>,
            errorElement: <Error/>,
            children: [
                {
                    path: '/admin', element: <AdminPanel/>,
                    children: [
                        { path: '/admin/superadmin', element: <SuperAdmin/>, loader: adminLoader(queryClient, accessToken) },
                        { path: '/admin/category', element: <Category/>, loader: categoryLoader(queryClient, accessToken) },
                        { path: '/admin/word', element: <Word/>, loader: wordLoader(queryClient, accessToken) },
                        { path: '/admin/word/:idword', element: <SelectedWord/> },
                    ]
                }
            ]
        }
    ])

    return <RouterProvider router={router}/>
}

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <AppRoot/>
        </QueryClientProvider>
    )
}

export default App
