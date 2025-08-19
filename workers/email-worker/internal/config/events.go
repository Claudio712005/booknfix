package config

const MAIN_TOPIC = "email"

const VALIDATION_TOPIC = MAIN_TOPIC + ".validation"

const VALIDATION_USER_TOPIC = VALIDATION_TOPIC + ".user"

func getTopics() []string {
	return []string{
		MAIN_TOPIC,
		VALIDATION_TOPIC,
		VALIDATION_USER_TOPIC,
	}
}
