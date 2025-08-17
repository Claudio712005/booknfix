package br.com.booknfix.auth_svc.model;

import br.com.booknfix.auth_svc.enums.CodeType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Table(name = "codigo_verificacao")
@AllArgsConstructor
@Entity
@NoArgsConstructor
@Getter
@Setter
@Builder
public class VerificationCodeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "token", nullable = false)
  private String token;

  @Column(name = "tipo", nullable = false)
  @Enumerated(EnumType.STRING)
  private CodeType type;

  @ManyToOne
  @JoinColumn(name = "usuario_id", nullable = true)
  private UserEntity user;

  @Column(name = "email", nullable = false)
  private String email;

  @Column(name = "data_expiracao", nullable= false)
  private LocalDateTime expirationDate;

  @CreationTimestamp
  @Column(name = "criado_em", nullable = false)
  private LocalDateTime createdAt;

  @Column(name = "usado", nullable = false)
  private boolean used = false;
}
