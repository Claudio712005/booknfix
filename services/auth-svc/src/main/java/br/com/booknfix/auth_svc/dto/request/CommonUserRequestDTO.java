package br.com.booknfix.auth_svc.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CommonUserRequestDTO {

  @NotBlank(message = "O nome é obrigatório")
  @Size(min = 3, message = "O nome deve ter pelo menos 3 caracteres")
  private String nome;

  @NotBlank(message = "O sobrenome é obrigatório")
  @Size(min = 3, message = "O sobrenome deve ter pelo menos 3 caracteres")
  private String sobrenome;

  @NotBlank(message = "O email é obrigatório")
  @Email(message = "O email deve ser válido")
  private String email;

  @NotBlank(message = "A senha é obrigatória")
  @Size(min = 6, message = "A senha deve ter pelo menos 6 caracteres")
  private String senha;

  @NotBlank(message = "O telefone é obrigatório")
  @Size(min = 10, message = "O telefone deve ter pelo menos 10 caracteres")
  private String telefone;

  @NotBlank(message = "O CPF é obrigatório")
  @Min(value = 11, message = "O CPF deve ter pelo menos 11 caracteres")
  private String cpf;

  @NotNull(message = "A data de nascimento é obrigatória")
  @Past(message = "A data de nascimento deve ser no passado")
  private LocalDate dataNascimento;

}
