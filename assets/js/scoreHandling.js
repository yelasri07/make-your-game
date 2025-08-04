import { user } from "./config.js"
export function scoreHandling(victory, type) {

    let data = [
        { "Rank": 0, "name": "Omar", "Score": 770, "time": "02:42" },
        { "Rank": 0, "name": "Sam", "Score": 1400, "time": "07:01" },
        { "Rank": 0, "name": "Sara", "Score": 830, "time": "03:08" },
        { "Rank": 0, "name": "A.J.", "Score": 1720, "time": "10:45" },
        { "Rank": 0, "name": "-.-", "Score": 1550, "time": "08:10" },
        { "Rank": 0, "name": "iris", "Score": 1470, "time": "07:32" },
        { "Rank": 0, "name": "Rian", "Score": 700, "time": "02:16" },
        { "Rank": 0, "name": "O.J.", "Score": 1640, "time": "09:35" },
        { "Rank": 0, "name": "Kave", "Score": 1800, "time": "12:01" },
        { "Rank": 0, "name": "Mo", "Score": 1280, "time": "05:50" },
        { "Rank": 0, "name": "Alex", "Score": 1200, "time": "05:11" },
        { "Rank": 0, "name": "Dima", "Score": 900, "time": "03:31" },
        { "Rank": 0, "name": "Badr", "Score": 1150, "time": "04:53" },
        { "Rank": 0, "name": "Yass", "Score": 1050, "time": "04:10" },
        { "Rank": 0, "name": "Zac", "Score": 980, "time": "03:55" },
        { "Rank": 0, "name": "Tariq", "Score": 560, "time": "01:29" },
        { "Rank": 0, "name": "Nina", "Score": 1100, "time": "04:40" },
        { "Rank": 0, "name": "Lina", "Score": 1330, "time": "06:22" },
        { "Rank": 0, "name": "Maya", "Score": 630, "time": "01:54" },
        { "Rank": 0, "name": "Salim", "Score": 500, "time": "01:03" }
    ]

    data = data.sort((a, b) => {
        if (a.Score < b.Score) {
            return 1
        } else if (a.Score > b.Score) {
            return -1
        } else {
            return 0
        }
    })

    const msgCongrats = document.createElement('p')
    msgCongrats.textContent = `${type === 'win' ? "Congrats" : ""} ${user.username}, you are in the top 6%, on the 2nd position. `
    victory.appendChild(msgCongrats)
    const table = document.createElement('table')
    //table.border = "1px"
    table.innerHTML =/*html*/`
        <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
            <th>Time</th>
        </tr>
    `
    CreateTable(table, data)

    victory.appendChild(table)
    victory.appendChild(Pagination(data.length))
}


function CreateTable(table, data) {
    const PaginateTable = data.slice(user.from, user.from + 5)
    PaginateTable.map((ele) => {
        const cont = document.createElement('tr')
        const tdR = document.createElement('td')
        tdR.textContent = ele.Rank
        const tdN = document.createElement('td')
        tdN.textContent = ele.name
        const tdS = document.createElement('td')
        tdS.textContent = ele.Score
        const tdT = document.createElement('td')
        tdT.textContent = ele.time
        cont.appendChild(tdR)
        cont.appendChild(tdN)
        cont.appendChild(tdS)
        cont.appendChild(tdT)
        table.appendChild(cont)
    })

}


function Pagination(dataLen) {
    const div = document.createElement('div')
    const prev = document.createElement('button')
    prev.disabled = user.from <= 5 ? true : false
    prev.textContent = 'previous'
    const page = document.createElement('p')
    page.textContent = `${user.from}/${dataLen}`
    const next = document.createElement('button')
    next.disabled = user.from + 5 <= dataLen ? false : true
    next.textContent = 'next'
    div.appendChild(prev)
    div.appendChild(page)
    div.appendChild(next)
    return div
}