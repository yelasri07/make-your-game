import { user } from "./config.js"
import { scoreHandling } from "./scoreHandling.js"

export function Input(victory, type) {
    const input = document.createElement('input')
    input.className = "username"
    input.type = 'text'
    input.name = 'username'
    input.id = 'username'
    input.placeholder = "Type your username..."
    const handleUsername = (e) => {
        if (e.key == "Enter" && e.target.value.trim() != "") {

            user.username = e.target.value
            input.remove()
            removeEventListener("keydown", handleUsername)
            scoreHandling(victory, type)
            user.firstGame = false
        }
    }
    input.addEventListener("keydown", handleUsername)
    victory.appendChild(input)
}