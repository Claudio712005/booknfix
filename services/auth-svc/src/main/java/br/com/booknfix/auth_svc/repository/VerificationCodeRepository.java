package br.com.booknfix.auth_svc.repository;

import br.com.booknfix.auth_svc.enums.CodeType;
import br.com.booknfix.auth_svc.model.UserEntity;
import br.com.booknfix.auth_svc.model.VerificationCodeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface VerificationCodeRepository extends JpaRepository<VerificationCodeEntity, Long> {

  List<VerificationCodeEntity> findByEmailAndExpirationDateAfterAndUsedFalse(
          String email, LocalDateTime now
  );

  Optional<VerificationCodeEntity> findByEmailAndTokenAndTypeAndExpirationDateAfter(
          String email, String token, CodeType type, LocalDateTime now
  );

  Optional<VerificationCodeEntity> findByUserAndTokenAndType(
          UserEntity user, String token, CodeType type
  );
}
