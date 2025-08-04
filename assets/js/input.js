import { user } from "./config.js"
import { scoreHandling } from "./scoreHandling.js"

export function Input(victory, type) {
    const input = document.createElement('input')
    input.className = "username"
    input.type = 'text'
    input.name = 'username'
    input.id = 'username'
    input.placeholder = "Type your username..."
    const handleUsername = async (e) => {
        if (e.key == "Enter" && e.target.value.trim() != "") {
            user.username = e.target.value
            const result = await scoreHandling(victory, type)

            if (result === null) {
                // Échec : score non enregistré
                console.log("Erreur lors de l'enregistrement du score")
                user.firstGame = true
                return
            }        
            // Succès
            user.firstGame = false
            input.remove()
            input.removeEventListener("keydown", handleUsername)
        }
    }

    input.addEventListener("keydown", handleUsername)
    victory.appendChild(input)
}