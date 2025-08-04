package br.com.booknfix.auth_svc.repository;

import br.com.booknfix.auth_svc.enums.Role;
import br.com.booknfix.auth_svc.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

  Optional<UserEntity> findByEmail(String email);

  boolean existsByEmail(String email);

  boolean existsByCpf(String cpf);

  boolean existsByCpfAndRole(String cpf, Role role);

  boolean existsByTelefone(String telefone);

  boolean existsById(Long id);

  void deleteById(Long id);
}
