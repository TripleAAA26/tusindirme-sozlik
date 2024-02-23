import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authApi as loginApi } from '../../service/authApi.ts'
import { useDispatch } from 'react-redux'
import { setCredential } from './authSlice.ts'


type Argtypes = {
    phone: string,
    password: string
}

export function useLogin() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { mutate: login, isPending, error, } = useMutation({
        mutationFn: ({ phone, password }: Argtypes) => loginApi({ phone, password }),
        onSuccess: ( user ) => {
            if (user?.data?.error) throw new Error(user.data.error)
            if (user?.data) throw new Error(user.data)

            dispatch(setCredential(user.token))

            navigate('/admin', { replace: true })
        },
        onError: error => {
            console.error('ERROR', error)
        }
    })

    return { login, isPending, error }
}