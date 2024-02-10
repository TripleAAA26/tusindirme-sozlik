const API_URL = 'https://test.tusindirmesozlik.uz/api'
export async function getWords() {
    const res = await fetch(`${API_URL}/all-words`)
    const data = await res.json()
    console.log(data)
    return data
}

