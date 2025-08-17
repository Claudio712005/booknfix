package br.com.booknfix.auth_svc.service;

import br.com.booknfix.auth_svc.dto.event.VerificationCodeEventDTO;
import br.com.booknfix.auth_svc.enums.CodeType;
import br.com.booknfix.auth_svc.enums.KafkaTopics;
import br.com.booknfix.auth_svc.exception.InvalidCodeException;
import br.com.booknfix.auth_svc.model.UserEntity;
import br.com.booknfix.auth_svc.model.VerificationCodeEntity;
import br.com.booknfix.auth_svc.msg.KafkaProducer;
import br.com.booknfix.auth_svc.repository.UserRepository;
import br.com.booknfix.auth_svc.repository.VerificationCodeRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VerificationCodeService {

  private final UserRepository userRepository;
  private final VerificationCodeRepository verificationCodeRepository;
  private final KafkaProducer kafkaProducer;
  private final ObjectMapper objectMapper;

  private static final SecureRandom secureRandom = new SecureRandom();

  private static final Logger LOGGER = LoggerFactory.getLogger(VerificationCodeService.class);

  private String generateToken(CodeType codeType) {
    int digits = codeType.getNumberOfDigits();
    int bound = (int) Math.pow(10, digits);
    int token = secureRandom.nextInt(bound);
    return String.format("%0" + digits + "d", token);
  }

  public void generateAndSendCode(String email) {
    if (userRepository.findByEmail(email).isPresent()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Usuário já cadastrado.");
    }

    List<VerificationCodeEntity> activeCodes = verificationCodeRepository
            .findByEmailAndExpirationDateAfterAndUsedFalse(email, LocalDateTime.now());

    if (activeCodes.size() >= 5) {
      throw new ResponseStatusException(HttpStatus.TOO_MANY_REQUESTS,
              "Limite de códigos ativos atingido, aguarde expiração.");
    }

    String token = generateToken(CodeType.CONFIRM_EMAIL);

    VerificationCodeEntity codeEntity = VerificationCodeEntity.builder()
            .email(email)
            .token(token)
            .type(CodeType.CONFIRM_EMAIL)
            .expirationDate(LocalDateTime.now().plusSeconds(CodeType.CONFIRM_EMAIL.getExpirationTimeInSeconds()))
            .used(false)
            .build();

    verificationCodeRepository.save(codeEntity);

    VerificationCodeEventDTO event = new VerificationCodeEventDTO(
            email,
            token,
            CodeType.CONFIRM_EMAIL.name(),
            CodeType.CONFIRM_EMAIL.getExpirationTimeInSeconds()
    );

    try {
      String payload = objectMapper.writeValueAsString(event);
      kafkaProducer.sendMessage(KafkaTopics.EMAIL_TOPIC, payload);
      LOGGER.info("Evento de e-mail enviado para {}", email);
    } catch (Exception e) {
      LOGGER.error("Erro ao serializar evento de e-mail", e);
      throw new RuntimeException("Erro ao serializar evento de e-mail", e);
    }
  }

  public boolean validateCode(String email, String token) {
    VerificationCodeEntity code = verificationCodeRepository
            .findByEmailAndTokenAndTypeAndExpirationDateAfter(email, token, CodeType.CONFIRM_EMAIL, LocalDateTime.now())
            .orElseThrow(() -> new InvalidCodeException("Código inválido ou expirado."));

    if (code.isUsed()) {
      LOGGER.warn("Código já utilizado para {}", email);
      throw new InvalidCodeException("Código já utilizado.");
    }

    code.setUsed(true);
    verificationCodeRepository.save(code);

    return true;
  }


}
