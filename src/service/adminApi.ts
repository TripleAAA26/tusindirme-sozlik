const API_URL = 'https://test.tusindirmesozlik.uz/api'

type TypeGet = {
    accessToken: string
}
export async function getAdminApi({ accessToken }: TypeGet) {
    try {
        const res = await fetch(`${API_URL}/admins`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            method: 'GET',
        })
        const data = await res.json()
        console.log(data)
        return data

    }catch (e) {
        console.log(e)
    }
}


export async function getAdminHistoriesApi({ accessToken }: TypeGet) {
    try {
        const res = await fetch(`${API_URL}/admin-histories`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            method: 'GET',
        })
        const data = await res.json()
        console.log(data)
        return data

    }catch (e) {
        console.log(e)
    }
}


type TypeCreate = {
    accessToken: string
    newAdmin: { name: string, phone: string, role_id: number, password: string }
}

export async function createAdminApi({ accessToken, newAdmin }: TypeCreate) {
    try {
        const res = await fetch(`${API_URL}/admins`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            method: 'POST',
            body: JSON.stringify(newAdmin),
        })
        const data = await res.json()
        console.log(data)
        return data

    }catch (e) {
        console.log(e)
    }
}


type TypeUpdate = {
    accessToken: string,
    updatedAdmin: { user_id: number, name: string, phone: string, role_id: number },
}

export async function updateAdminApi({ accessToken, updatedAdmin }: TypeUpdate) {
    try {
        const res = await fetch(`${API_URL}/edit-admin`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            method: 'PUT',
            body: JSON.stringify(updatedAdmin),
        })
        const data = await res.json()
        console.log(data)
        return data

    }catch (e) {
        console.log(e)
    }
}


type TypeDelete = {
    accessToken: string,
    user_id: number
}

export async function deleteAdminApi({ accessToken, user_id }: TypeDelete) {
    try {
        const res = await fetch(`${API_URL}/admins/${user_id}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            method: 'DELETE',
        })
        const data = await res.json()
        console.log(data)
        return data

    }catch (e) {
        console.log(e)
    }
}


export async function getSuperAdminApi({ accessToken }: TypeGet) {
    try {
        const res = await fetch(`${API_URL}/get-data`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            method: 'GET',
        })
        const data = await res.json()
        console.log(data)
        return data

    }catch (e) {
        console.log(e)
    }
}