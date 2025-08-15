package config

const USER_TOPIC = "user-events"
const EMAIL_TOPIC = "email-events"

func getTopics() []string {
	return []string{
		USER_TOPIC,
		EMAIL_TOPIC,
	}
}