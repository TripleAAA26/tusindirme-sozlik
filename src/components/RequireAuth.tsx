import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth.tsx'

export default function RequireAuth() {
    const { auth } = useAuth()

    return (
        auth
            ?
            <Outlet />
            : <Navigate to='login' />
    )
}

