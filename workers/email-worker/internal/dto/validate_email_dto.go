package dto

// ValidateEmailPayload represents the payload for email validation
type ValidateEmailPayload struct {
	To                  string `json:"to"`
	Code                string `json:"code"`
	Type                string `json:"type"`
	ExpirationInSeconds uint64 `json:"expirationInSeconds"`
}
