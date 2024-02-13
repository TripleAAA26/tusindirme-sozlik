const API_URL = 'https://test.tusindirmesozlik.uz/api'

type TypeGet = {
    accessToken: string
}
export async function getCategoryApi({ accessToken }: TypeGet) {
    try {
        const res = await fetch(`${API_URL}/categories`,{
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
    newCategory: { title: { kiril: string, latin: string } }
}

export async function createCategoryApi({ accessToken, newCategory }: TypeCreate) {
    try {
        const res = await fetch(`${API_URL}/categories`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            method: 'POST',
            body: JSON.stringify(newCategory),
        })
        const data = await res.json()
        console.log(data)
        return data

    }catch (e) {
        console.log(e)
        throw new Error(e)
    }
}


type TypeUpdate = {
    accessToken: string,
    newCategory: { title: { kiril: string, latin: string } },
    idCategory: number
}

export async function updateCategoryApi({ accessToken, newCategory, idCategory }: TypeUpdate) {
    try {
        const res = await fetch(`${API_URL}/categories/${idCategory}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            method: 'PUT',
            body: JSON.stringify(newCategory),
        })
        const data = await res.json()
        console.log(data)
        return data

    }catch (e) {
        console.log(e)
        throw new Error(e)
    }
}


type TypeDelete = {
    accessToken: string,
    idCategory: number
}

export async function deleteCategoryApi({ accessToken, idCategory }: TypeDelete) {
    try {
        const res = await fetch(`${API_URL}/categories/${idCategory}`,{
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
        throw new Error(e)
    }
}