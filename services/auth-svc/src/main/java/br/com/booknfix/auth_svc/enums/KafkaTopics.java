package br.com.booknfix.auth_svc.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum KafkaTopics {
  USER_TOPIC("user-events"),
  EMAIL_TOPIC("email-events");

  private final String topicName;
}
