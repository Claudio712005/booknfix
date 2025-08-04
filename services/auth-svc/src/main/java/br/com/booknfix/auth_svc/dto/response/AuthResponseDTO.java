package br.com.booknfix.auth_svc.dto.response;

import lombok.Data;

@Data
public class AuthResponseDTO {

  private String token;
  private String refreshToken;

  private UserResponseDTO user;
}
