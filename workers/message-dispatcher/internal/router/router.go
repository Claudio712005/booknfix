package router

import (
	"encoding/json"
	"log"

	"github.com/Claudio712005/booknfix/workers/message-dispatcher/internal/handlers"
	"github.com/segmentio/kafka-go"
)

// Envelope represents the structure of a message envelope
type Envelope struct {
	EventType string          `json:"event_type"`
	Payload   json.RawMessage `json:"payload"`
}

func RouteMessage(msg kafka.Message) {

	var envelope Envelope

	if err := json.Unmarshal(msg.Value, &envelope); err != nil {
		log.Println("Erro ao deserializar mensagem:", err)
		return
	}

	switch envelope.EventType {
	case "USER_CREATED":
		handlers.HandleUserCreated(envelope.Payload)
	default:
		log.Printf("Evento não reconhecido: %s", envelope.EventType)
	}
}
