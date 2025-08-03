package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
)

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

func GetData(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
}

func SaveData(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
}

func AssetsHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, r.URL.Path[1:])
}

func main() {
	http.HandleFunc("/", HomeHandler)
	http.HandleFunc("/assets/", AssetsHandler)
	fmt.Println("server runing on http://localhost:8080/")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
