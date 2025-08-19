package config

import (
	"log"
	"os"
	"strconv"
	"sync"
)

type Config struct {
	EmailServiceURL string
	SMTPServer      string
	SMTPPort        uint64
	SMTPUser        string
	SMTPPassword    string
	KafkaURL        string
}

var (
	instance *Config
	once     sync.Once

	Cfg *Config
)

func Load() (*Config, error) {
	var err error
	once.Do(func() {
		port, parseErr := strconv.ParseUint(os.Getenv("SMTP_PORT"), 10, 64)
		if parseErr != nil {
			err = parseErr
			return
		}

		instance = &Config{
			EmailServiceURL: os.Getenv("EMAIL_SERVICE_URL"),
			SMTPServer:      os.Getenv("SMTP_SERVER"),
			SMTPPort:        port,
			SMTPUser:        os.Getenv("SMTP_USER"),
			SMTPPassword:    os.Getenv("SMTP_PASSWORD"),
			KafkaURL:        os.Getenv("KAFKA_URL"),
		}
	})
	return instance, err
}

func init() {
	cfg, err := Load()
	if err != nil {
		log.Printf("erro ao carregar configuração: %v", err)
	} else {
		Cfg = cfg
		log.Printf("configuração carregada com sucesso")
	}
}
