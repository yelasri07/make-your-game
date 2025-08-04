import { GetData, SaveScore } from "../services/fetch.js";
import { scoreBoard, user } from "./config.js"
let data
export async function scoreHandling(victory, type) {

    const score = {
        name: user.username,
        score: scoreBoard.score,
        time: `${2 - scoreBoard.minutes}:${60 - scoreBoard.seconds}`
    }
    let method = "PUT"
    if (user.firstGame) {
        method = "POST"
    }

    await SaveScore(score, method)

    data = await GetData()
    data = data.sort((a, b) => {
        if (a.score < b.score) {
            return 1
        } else if (a.score > b.score) {
            return -1
        } else {
            return 0
        }
    })
    const rank = GetRankUser()
    const msgCongrats = document.createElement('p')
    const classment = (rank * 100) / data.length
    msgCongrats.textContent = `${type === 'win' ? "Congrats" : ""} ${user.username}, you are in the top ${Math.round(classment)}%, on the ${rank == 1 ? rank + "th" : rank == 2 ? rank + "nd" : rank == 3 ? rank + "rd" : rank + "th"} position. `
    victory.appendChild(msgCongrats)
    const table = document.createElement('table')
    table.className = "table-scores"
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
    PaginateTable.map((ele, index) => {
        const cont = document.createElement('tr')
        cont.className = "current5"
        const tdR = document.createElement('td')
        const rank = index + 1 + user.from
        tdR.textContent = rank == 1 ? rank + "th" : rank == 2 ? rank + "nd" : rank == 3 ? rank + "rd" : rank + "th"
        const tdN = document.createElement('td')
        tdN.textContent = ele.name
        const tdS = document.createElement('td')
        tdS.textContent = ele.score
        const tdT = document.createElement('td')
        tdT.textContent = ele.time
        cont.appendChild(tdR)
        cont.appendChild(tdN)
        cont.appendChild(tdS)
        cont.appendChild(tdT)
        table.appendChild(cont)
    })

}

function GetRankUser() {
    const rank = data.findIndex(ele => ele.name === user.username)
    return rank !== -1 ? rank + 1 : null
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
    next.addEventListener('click', UpdateTableAndPagination)
    prev.addEventListener('click', UpdateTableAndPagination)
    return div
}

function UpdateTableAndPagination(e) {
    const table = document.querySelector('.table-scores')
    const contentTable = document.querySelectorAll('.current5')
    const paginationDiv = e.target.parentNode
    const pageText = paginationDiv.querySelector('p')

    contentTable.forEach(ele => {
        ele.remove()
    })

    if (e.target.textContent === "next") {
        user.from += 5
        if (user.from >= data.length) {
            user.from = data.length - (data.length % 5 || 5)
        }
    } else if (e.target.textContent === "previous") {
        user.from -= 5
        if (user.from < 0) {
            user.from = 0
        }
    } else {
        alert('You try to hack us?!..')
        return
    }

    CreateTable(table, data)

    const prev = paginationDiv.querySelector('button:first-child')
    const next = paginationDiv.querySelector('button:last-child')

    prev.disabled = user.from <= 0
    next.disabled = user.from + 5 >= data.length
    const page = user.from + 5 > data.length ? data.length : user.from + 5
    pageText.textContent = `${page}/${data.length}`
}
