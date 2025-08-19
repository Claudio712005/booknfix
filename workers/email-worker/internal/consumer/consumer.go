package consumers

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/segmentio/kafka-go"
)

// KafkaConsumer is a struct that represents a Kafka consumer
type KafkaConsumer struct {
	reader *kafka.Reader
}

// NewKafkaConsumer creates a new Kafka consumer
func NewKafkaConsumer(topic string, groupID string) *KafkaConsumer {
	broker := os.Getenv("KAFKA_URL")

	r := kafka.NewReader(kafka.ReaderConfig{
		Brokers:        []string{broker},
		Topic:          topic,
		GroupID:        groupID,
		MinBytes:       10e3,
		MaxBytes:       10e6,
		CommitInterval: time.Second,
		StartOffset:    kafka.FirstOffset,
	})

	return &KafkaConsumer{reader: r}
}

// Start begins consuming messages from the Kafka topic
func (c *KafkaConsumer) Start(ctx context.Context, handler func(message kafka.Message) error) {
	defer c.reader.Close()

	for {
		m, err := c.reader.ReadMessage(ctx)
		if err != nil {
			log.Printf("Error reading message: %v", err)
			return
		}

		if err := handler(m); err != nil {
			log.Printf("Error handling message: %v", err)
		}
	}
}
