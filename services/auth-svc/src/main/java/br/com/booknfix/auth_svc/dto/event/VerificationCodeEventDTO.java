package br.com.booknfix.auth_svc.dto.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VerificationCodeEventDTO {

  private String to;
  private String code;
  private String type;
  private long expirationInSeconds;
}
