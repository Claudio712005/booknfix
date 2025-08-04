package br.com.booknfix.auth_svc.model;

import br.com.booknfix.auth_svc.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "usuarios")
public class UserEntity implements UserDetails {

  @Id
  @Column(name = "usuario_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "nome", nullable = false)
  private String nome;

  @Column(name = "sobrenome", nullable = false)
  private String sobrenome;

  @Column(name = "senha", nullable = false)
  private String senha;

  @Column(name = "email", nullable = false, unique = true)
  private String email;

  @Column(name = "ativo", nullable = false)
  private boolean ativo;

  @Column(name = "data_nascimento", nullable = false)
  private LocalDate dataNascimento;

  @Column(name = "cpf", unique = true)
  private String cpf;

  @Column(name = "telefone", unique = true)
  private String telefone;

  @Column(name = "role", nullable = false)
  private Role role;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of(
        () -> "ROLE_" + this.role.name()
    );
  }

  @Override
  public String getPassword() {
    return this.senha;
  }

  @Override
  public String getUsername() {
    return this.email;
  }
}
