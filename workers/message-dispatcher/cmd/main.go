package main

import (
	"log"
	"net/http"
	"os"

	"github.com/Claudio712005/booknfix/workers/message-dispatcher/internal/config"
)

func main() {

	log.Println("Starting message dispatcher...")

	config.LoadEnv()

	config.InitializeKafkaConfig()

	log.Println("Message dispatcher started.")

	http.ListenAndServe(os.Getenv("HTTP_PORT"), nil)
}