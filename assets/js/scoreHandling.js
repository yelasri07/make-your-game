import { GetData, SaveScore } from "../services/fetch.js";
import { scoreBoard, user } from "./config.js"

let data

export async function scoreHandling(victory, type) {
    const score = {
        name: user.username,
        score: scoreBoard.score,
        time: `${2 - scoreBoard.minutes}:${60 - scoreBoard.seconds}`
    }

    let method = user.firstGame ? "POST" : "PUT"
    const resp = await SaveScore(score, method)

    if (!resp) {
        user.firstGame = true
        return null
    }

    data = await GetData()

    data = data.sort((a, b) => b.score - a.score)

    const rank = GetRankUser()
    const classment = (rank * 100) / data.length

    const msgCongrats = document.createElement('p')
    msgCongrats.textContent = `${type === 'win' ? "Congrats" : ""} ${user.username}, you are in the top ${Math.round(classment)}%, on the ${rank === 1 ? rank + "st" : rank === 2 ? rank + "nd" : rank === 3 ? rank + "rd" : rank + "th"} position.`
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

    user.page = 1 
    CreateTable(table, data)
    victory.appendChild(table)
    victory.appendChild(Pagination(data.length))
}

function GetRankUser() {
    const rank = data.findIndex(ele => ele.name === user.username)
    return rank !== -1 ? rank + 1 : null
}

function CreateTable(table, data) {
    const start = (user.page - 1) * 5
    const PaginateTable = data.slice(start, start + 5)

    PaginateTable.forEach((ele, index) => {
        const cont = document.createElement('tr')
        cont.classList.add("current5")
        if (ele.name === user.username) {
            cont.classList.add("me")
        }

        const tdR = document.createElement('td')
        const rank = start + index + 1
        tdR.textContent = rank === 1 ? rank + "st" : rank === 2 ? rank + "nd" : rank === 3 ? rank + "rd" : rank + "th"

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

function Pagination(dataLen) {
    const div = document.createElement('div')
    div.className = "pagination"

    const totalPages = Math.ceil(dataLen / 5)

    const prev = document.createElement('button')
    prev.disabled = user.page <= 1
    prev.textContent = 'Previous'
    prev.className = "previous"

    const page = document.createElement('p')
    page.textContent = `Page ${user.page} / ${totalPages}`

    const next = document.createElement('button')
    next.disabled = user.page >= totalPages
    next.textContent = 'Next'
    next.className = "next"

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

    contentTable.forEach(ele => ele.remove())

    const totalPages = Math.ceil(data.length / 5)

    if (e.target.textContent === "Next" && user.page < totalPages) {
        user.page++
    } else if (e.target.textContent === "Previous" && user.page > 1) {
        user.page--
    }

    CreateTable(table, data)

    const prev = paginationDiv.querySelector('.previous')
    const next = paginationDiv.querySelector('.next')

    prev.disabled = user.page <= 1
    next.disabled = user.page >= totalPages

    pageText.textContent = `Page ${user.page} / ${totalPages}`
}
