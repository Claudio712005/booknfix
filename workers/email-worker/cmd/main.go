package cmd

import (
	"log"

	"github.com/Claudio712005/booknfix/workers/email-worker/internal/config"
)

func main() {

	log.Println("Starting email worker...")

	config.InitializeKafkaConfig()
	config.ListeningEvents()

	select {}
}