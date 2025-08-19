package handler

import (
	"github.com/Claudio712005/booknfix/workers/email-worker/internal/dto"
)

// ValidateEmailHandler handles email validation requests
type ValidateEmailHandler struct {

}

type validateEmailHandler interface {

}

// NewValidateEmailHandler creates a new instance of ValidateEmailHandler
func NewValidateEmailHandler() *ValidateEmailHandler {
	return &ValidateEmailHandler{}
}

// HandleSendValidateEmail handles the email validation request
func (v *ValidateEmailHandler) HandleSendValidateEmailUser(payload dto.ValidateEmailPayload){

}