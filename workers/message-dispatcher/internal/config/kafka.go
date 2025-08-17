package config

import (
	"context"
	"log"
	"os"

	"github.com/Claudio712005/booknfix/workers/message-dispatcher/internal/consumers"
	"github.com/Claudio712005/booknfix/workers/message-dispatcher/internal/router"
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

func ListeningEvents(){
	ctx := context.Background()

	go func ()  {
		for _, topic := range getTopics(){
			kfkConsumer := consumers.NewKafkaConsumer(topic, "message-dispatcher-group")
			kfkConsumer.Start(ctx, func(message kafka.Message) error {
				log.Printf("Message received on topic %s: %s", topic, string(message.Key))
				router.RouteMessage(message)
				return nil
			})
		}
	}()
}