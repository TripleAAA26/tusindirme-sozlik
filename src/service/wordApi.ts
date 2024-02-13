const API_URL = 'https://test.tusindirmesozlik.uz/api'

type TypeGetSingleWord = {
    accessToken: string
    idWord: number
}
export async function getSelectedWordApi({ accessToken, idWord }: TypeGetSingleWord) {
    try {
        const res = await fetch(`${API_URL}/words/${idWord}`,{
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


type TypeGet = {
    accessToken: string
}
export async function getWordsApi({ accessToken }: TypeGet) {
    try {
        const res = await fetch(`${API_URL}/words`,{
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
    newWord: {
        category_id: number,
        title: {
            kiril: string,
            latin: string
        } ,
        description: {
            kiril: string,
            latin: string
        }
    }
}

export async function createWordApi({ accessToken, newWord }: TypeCreate) {
    try {
        const res = await fetch(`${API_URL}/words`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            method: 'POST',
            body: JSON.stringify(newWord),
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
    idWord: number,
    updatedWord: {
        category_id: number,
        title: {
            kiril: string,
            latin: string
        } ,
        description: {
            kiril: string,
            latin: string
        }
    }
}

export async function updateWordApi({ accessToken, idWord, updatedWord }: TypeUpdate) {
    try {
        const res = await fetch(`${API_URL}/words/${idWord}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            method: 'PUT',
            body: JSON.stringify(updatedWord),
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
    idWord: number
}

export async function deleteWordApi({ accessToken, idWord }: TypeDelete) {
    try {
        const res = await fetch(`${API_URL}/words/${idWord}`,{
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

//------------------------------------ ANTONYM ----------------------------------------//

type TypeCreateAntonym = {
    accessToken: string
    newAntonym: {
        word_id: number,
        antonym_id: number[]
    }
}

export async function createAntonymApi({ accessToken, newAntonym }: TypeCreateAntonym) {
    try {
        const res = await fetch(`${API_URL}/antonym`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            method: 'POST',
            body: JSON.stringify(newAntonym),
        })
        const data = await res.json()
        console.log(data)
        return data

    }catch (e) {
        console.log(e)
        throw new Error(e)
    }
}


type TypeDeleteAntonym = {
    accessToken: string,
    idWord: number,
    idAntonym: number
}

export async function deleteAntonymApi({ accessToken, idWord, idAntonym }: TypeDeleteAntonym) {
    try {
        const res = await fetch(`${API_URL}/word/${idWord}/antonym/${idAntonym}`,{
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


//---------------------------------- SYNONYM ----------------------------------------//

type TypeCreateSynonym = {
    accessToken: string
    newSynonym: {
        word_id: number,
        synonym_id: number[]
    }
}

export async function createSynonymApi({ accessToken, newSynonym }: TypeCreateSynonym) {
    try {
        const res = await fetch(`${API_URL}/synonym`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            method: 'POST',
            body: JSON.stringify(newSynonym),
        })
        const data = await res.json()
        console.log(data)
        return data

    }catch (e) {
        console.log(e)
        throw new Error(e)
    }
}


type TypeDeleteSynonym = {
    accessToken: string,
    idWord: number,
    idSynonym: number
}

export async function deleteSynonymApi({ accessToken, idWord, idSynonym }: TypeDeleteSynonym) {
    try {
        const res = await fetch(`${API_URL}/word/${idWord}/synonym/${idSynonym}`,{
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

////////////////////////////--------- IS_CORRECT ---------///////////////////////////////

type TypeIsCorrect = {
    accessToken: string,
    idWord: number,
    updatedIsCorrect: {
        is_correct: boolean
    }
}
export async function isCorrectApi({ accessToken, idWord, updatedIsCorrect }: TypeIsCorrect) {
    try {
        const res = await fetch(`${API_URL}/is-correct/${idWord}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            method: 'PUT',
            body: JSON.stringify(updatedIsCorrect),
        })
        const data = await res.json()
        console.log(data)
        return data

    }catch (e) {
        console.log(e)
        throw new Error(e)
    }
}

//////////////////////////////--------- AUDIO ----------/////////////////////////////////

type TypeCreateAudio = {
    accessToken: string,
    idWord: number,
    audioFile: FormData,
}

export async function createAudioApi({ accessToken, idWord, audioFile }: TypeCreateAudio) {
    try {
        const res = await fetch(`${API_URL}/audios/${idWord}`,{
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            method: 'POST',
            body: audioFile,
        })
        const data = await res.json()
        console.log(data)
        return data

    }catch (e) {
        console.log(e)
        throw new Error(e)
    }
}


type TypeDeleteAudio = {
    accessToken: string,
    idWord: number
}

export async function deleteAudioApi({ accessToken, idWord }: TypeDeleteAudio) {
    try {
        const res = await fetch(`${API_URL}/audios/${idWord}`,{
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