package router

import (
	"encoding/json"
	"log"

	"github.com/Claudio712005/booknfix/workers/email-worker/internal/dto"
	"github.com/Claudio712005/booknfix/workers/email-worker/internal/handler"
	"github.com/segmentio/kafka-go"
)

func RouteMessage(msg kafka.Message) {
	
	var payload dto.ValidateEmailPayload
	if err := json.Unmarshal(msg.Value, &payload); err != nil {
		log.Printf("Error unmarshalling message: %v", err)
		return
	}

	switch payload.Type {
	case "VALIDATE_EMAIL":
		h := handler.NewValidateEmailHandler()
		h.HandleSendValidateEmailUser(payload)
	default:
		log.Printf("Unhandled message type: %s", payload.Type)
	}
}
