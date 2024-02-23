import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { logoutApi } from '../../service/authApi.ts'
import { useDispatch, useSelector } from 'react-redux'
import { logOut, selectCurrentToken } from './authSlice.ts'

export function useLogout() {
    const navigate = useNavigate()
    const accessToken = useSelector(selectCurrentToken)
    const dispatch = useDispatch()

    const { mutate:logout, isPending:isLogout } = useMutation({
        mutationFn: () => logoutApi({ accessToken }),
        onSuccess: () => {
            dispatch(logOut())
            navigate('/login')
        },
        onError: ( error ) => {
            console.log(error)
        }

    })

    return { logout, isLogout }
}