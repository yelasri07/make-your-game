import { user } from "./config.js"

export function Input(victory) {
    const input = document.createElement('input')
    input.className = "username"
    input.type = 'text'
    input.name = 'username'
    input.id = 'username'
    input.placeholder = "Type your username..."
    const handleUsername = (e) => {
        if (e.key == "Enter" && e.target.value.trim() != "") {
            
            input.remove()
            user.firstGame=true
            user.username=e.target.value
            removeEventListener("keydown", handleUsername)
        }
    }
    input.addEventListener("keydown", handleUsername)
    victory.appendChild(input)
}