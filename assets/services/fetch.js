const API_URL = "http://localhost:8080/"
export async function SaveScore(score, method) {
    try {
        const resp = await fetch(`${API_URL}api/player`, {
            method: method,
            body: JSON.stringify(score)
        })
        if (!resp.ok || resp.status != 200) {
            alert("name already taken.")
            return null
        }
        return true
    } catch (e) {
        alert(e)
        return null
    }
}

export async function GetData() {
    const resp = await fetch(`${API_URL}api/player`, {
        method: "GET",

    })
    if (resp.ok && resp.status == 200) {
        const data = await resp.json()
        return data.data
    }
    else if (!resp.ok || resp.status != 200) {
        alert("name already taken.")
    }
}