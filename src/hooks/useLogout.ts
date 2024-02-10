import { useNavigate } from 'react-router-dom'
import useAuth from './useAuth.tsx'
import { useMutation } from '@tanstack/react-query'
import { logoutApi } from '../service/authApi.ts'

export function useLogout() {
    const navigate = useNavigate()
    const { auth, setAuth } = useAuth()

    const { mutate:logout, isPending:isLogout } = useMutation({
        mutationFn: () => logoutApi({ accessToken: auth }),
        onSuccess: () => {
            setAuth('')
            navigate('/login')
        },
        onError: ( error ) => {
            console.log(error)
        }

    })

    return { logout, isLogout }
}