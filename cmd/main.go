package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
)

type PlayerData struct {
	Rank  string `json:"rank"`
	Name  string `json:"name"`
	Score int    `json:"score"`
	Time  string `json:"time"`
}

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
	temp, err := template.ParseFiles("index.html")
	if err != nil {
		return
	}
	temp.Execute(w, nil)
}

func Player(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		GetData(w, r)
	case http.MethodPost:
		SaveData(w, r)
	default:
		ResponseJSON(w, http.StatusMethodNotAllowed, map[string]any{
			"error": "Method not allowed",
		})
		return
	}
}

func GetData(w http.ResponseWriter, r *http.Request) {
	data, err := os.ReadFile("data.json")
	if err != nil {
		ResponseJSON(w, http.StatusInternalServerError, map[string]any{
			"error": "Failed to read file",
		})
		return
	}

	fmt.Println(string(data))
}

func SaveData(w http.ResponseWriter, r *http.Request) {
	var player PlayerData
	if err := json.NewDecoder(r.Body).Decode(&player); err != nil {
		ResponseJSON(w, http.StatusBadRequest, map[string]any{
			"error": err,
		})
		return
	}

	const filename = "data.json"

	if _, err := os.Stat(filename); err != nil {
		_, err := os.Create(filename)
		if err != nil {
			ResponseJSON(w, http.StatusInternalServerError, map[string]any{
				"error": "Failed to create file",
			})
			return
		}
	}

	data, err := os.ReadFile(filename)
	if err != nil {
		ResponseJSON(w, http.StatusInternalServerError, map[string]any{
			"error": "Failed to read file",
		})
		return
	}

	var players []*PlayerData
	if len(data) != 0 {
		err = json.Unmarshal(data, &players)
		if err != nil {
			ResponseJSON(w, http.StatusInternalServerError, map[string]any{
				"error": "Failed to decode file data",
			})
			return
		}
	}

	for _, p := range players {
		if player.Name == p.Name {
			ResponseJSON(w, http.StatusBadRequest, map[string]any{
				"error": "This name already exists",
			})
			return
		}
	}

	players = append(players, &player)

	ply, err := json.Marshal(players)
	if err != nil {
		ResponseJSON(w, http.StatusInternalServerError, map[string]any{
			"error": err,
		})
		return
	}

	err = os.WriteFile(filename, ply, 0666)
	if err != nil {
		ResponseJSON(w, http.StatusInternalServerError, map[string]any{
			"error": "Failed to write file",
		})
		return
	}

	ResponseJSON(w, http.StatusOK, map[string]any{
		"message": "Player saved successfully!",
	})
}

func AssetsHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, r.URL.Path[1:])
}

func main() {
	http.HandleFunc("/", HomeHandler)
	http.HandleFunc("/api/player", Player)
	http.HandleFunc("/assets/", AssetsHandler)
	fmt.Println("server runing on http://localhost:8080/")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func ResponseJSON(w http.ResponseWriter, status int, message any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(message)
}
