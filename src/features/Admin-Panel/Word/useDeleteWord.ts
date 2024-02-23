import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteWordApi } from '../../../service/wordApi.ts'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../auth/authSlice.ts'

type ArgTypes = {
    idWord: number
}

export default function useDeleteWord() {
    const queryClient = useQueryClient()
    const accessToken = useSelector(selectCurrentToken)

    const { mutate: deleteWord, isPending } = useMutation({
        mutationFn: ( { idWord }: ArgTypes ) =>
            deleteWordApi({ accessToken, idWord }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ 'words' ],
            })
        },
        onError: (error) => {
            console.log(error)
        },
    })

    return { deleteWord, isPending }
}

