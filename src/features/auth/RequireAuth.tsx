import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from './authSlice.ts'


export default function RequireAuth() {
    const accessToken = useSelector(selectCurrentToken)

    return (
        accessToken
            ?
            <Outlet />
            : <Navigate to='login' />
    )
}

