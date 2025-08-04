package br.com.booknfix.auth_svc.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AuthRequestDTO {

  @Email(message = "Email inválido")
  private String email;

  @NotBlank(message = "Senha é obrigatória")
  private String senha;
}
