package br.com.booknfix.auth_svc.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;

@RequiredArgsConstructor
@Getter
public enum CodeType {
  CONFIRM_EMAIL(1L, "confirm_email", "Código utilizado para confirmar o e-mail do usuário no cadastro", 900L, 6);

  private final Long id;
  private final String code;
  private final String description;
  private final Long expirationTimeInSeconds;
  private final int numberOfDigits;

  public static CodeType fromCode(String code) {
    return Arrays.stream(values())
            .filter(t -> t.code.equals(code))
            .findFirst()
            .orElseThrow(() -> new IllegalArgumentException("Invalid code: " + code));
  }

}
