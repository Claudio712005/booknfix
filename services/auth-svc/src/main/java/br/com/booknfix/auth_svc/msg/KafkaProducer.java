package br.com.booknfix.auth_svc.msg;

import br.com.booknfix.auth_svc.enums.KafkaTopics;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class KafkaProducer {

  private final KafkaTemplate<String, String> kafkaTemplate;

  private static final Logger LOGGER = LoggerFactory.getLogger(KafkaProducer.class);

  public void sendMessage(KafkaTopics topic, String message) {
    kafkaTemplate.send(topic.getTopicName(), message);
    LOGGER.info("Message sent to topic {}: {}", topic.getTopicName(), message);
  }

}
