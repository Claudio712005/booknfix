package config

import (
	"log"
	"os"

	"github.com/segmentio/kafka-go"
)

func createTopicsIfNotExists(conn *kafka.Conn) {
	topics := getTopics()
	for _, topic := range topics {
		if err := conn.CreateTopics(kafka.TopicConfig{
			Topic:             topic,
			NumPartitions:     1,
			ReplicationFactor: 1,
		}); err != nil {
			log.Printf("Error creating topic %s: %v", topic, err)
		} else {
			log.Printf("Topic %s created successfully", topic)
		}
	}
}

// InitializeKafkaConfig initializes the Kafka configuration
func InitializeKafkaConfig() {


	conn, err := kafka.Dial("tcp", os.Getenv("KAFKA_URL"))

	if err != nil {
		log.Fatalf("Error connecting to Kafka: %v", err)
	}

	createTopicsIfNotExists(conn)

	defer conn.Close()
}