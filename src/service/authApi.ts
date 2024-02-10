const API_URL = 'https://test.tusindirmesozlik.uz/api'

type Argtypes = {
    phone: string,
    password: string
}
export async function authApi({ phone, password }: Argtypes) {
    try {
        const res = await fetch(`${API_URL}/login`,{
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ phone, password }),
        })
        const data = await res.json()

        return data

    } catch (error) {
        console.log(error)
    }
}

type logoutTypes = {
    accessToken: string
}

export async function logoutApi({ accessToken }: logoutTypes) {
    try {
        const res = await fetch(`${API_URL}/logout`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            method: 'POST',
        })
        const data = await res.json()

        return data

    } catch (error) {
        console.log(error)
    }
}