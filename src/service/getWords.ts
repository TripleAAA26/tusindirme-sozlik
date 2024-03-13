const API_URL = 'https://test.tusindirmesozlik.uz/api'
export async function getWords() {
    const res = await fetch(`${API_URL}/get-all-words`)
    const data = await res.json()
    console.log(data)
    return data
}


export async function getWordOfDay() {
    const res = await fetch(`${API_URL}/word-of-the-day`)
    const data = await res.json()
    console.log(data)
    return data.data
}