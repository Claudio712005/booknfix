package br.com.booknfix.auth_svc.dto.response;

import br.com.booknfix.auth_svc.enums.Role;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserResponseDTO {

  private Long id;
  private String nome;
  private String email;
  private String telefone;
  private String cpf;
  private LocalDate dataNascimento;
  private Role role;
  private boolean ativo;

}
