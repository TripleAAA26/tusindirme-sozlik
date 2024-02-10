import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authApi as loginApi } from '../service/authApi.ts'
import useAuth from './useAuth.tsx'

type Argtypes = {
    phone: string,
    password: string
}

export function useLogin() {
    const navigate = useNavigate()
    const { setAuth } = useAuth()

    const { mutate: login, isPending, error, } = useMutation({
        mutationFn: ({ phone, password }: Argtypes) => loginApi({ phone, password }),
        onSuccess: ( user ) => {
            if (user?.data?.error) throw new Error(user.data.error)
            if (user?.data) throw new Error(user.data)
            setAuth(user.token)

            navigate('/admin', { replace: true })
        },
        onError: error => {
            console.error('ERROR', error)
        }
    })

    return { login, isPending, error }
}