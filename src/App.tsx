import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import AppLayout from "./components/AppLayout.tsx"
import Error from "./components/Error.tsx"
import Home from "./pages/Home.tsx"
import WordList, { loader as wordListLoader } from "./pages/WordList.tsx"
import OftenSearchedWords from "./pages/OftenSearchedWords.tsx"
import Login from './pages/Login.tsx'
import AdminPanel from './pages/AdminPanel.tsx'
import RequireAuth from './components/RequireAuth.tsx'
import TWords from './pages/TWords.tsx'
import MisspelledWords from './pages/MisspelledWords.tsx'
import SuperAdmin, { loader as adminLoader } from './pages/SuperAdmin.tsx'
import Category, { loader as categoryLoader } from './pages/Category.tsx'
import Word, { loader as wordLoader } from './pages/Word.tsx'
import useAuth from './hooks/useAuth.tsx'
import SelectedWord from './pages/SelectedWord.tsx'


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 600
        }
    }
})

const AppRoot = () => {
    const { auth } = useAuth()

    const router = createBrowserRouter([
        {
            element: <AppLayout/>,
            errorElement: <Error/>,
            children: [
                { path: '/', element: <Home/> },
                { path: '/wordlist', element: <WordList/>, loader: wordListLoader(queryClient) },
                { path: '/oftenwords', element: <OftenSearchedWords/> },
                { path: '/twords', element: <TWords/> },
                { path: '/misspelledwords', element: <MisspelledWords/> },
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
                        { path: '/admin/superadmin', element: <SuperAdmin/>, loader: adminLoader(queryClient, auth) },
                        { path: '/admin/category', element: <Category/>, loader: categoryLoader(queryClient, auth) },
                        { path: '/admin/word', element: <Word/>, loader: wordLoader(queryClient, auth) },
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
