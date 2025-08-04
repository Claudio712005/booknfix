package br.com.booknfix.auth_svc.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Role {
  ENTERPRISE_ADMIN(1L, "Administrador"),
  COMMON_USER(2L, "Usuário Comum"),
  BUSINESS_USER(3L, "Usuário de Empresa");

  private Long id;
  private String description;

  public static Role fromId(Long id) {
    for (Role role : Role.values()) {
      if (role.getId().equals(id)) {
        return role;
      }
    }
    throw new IllegalArgumentException("Role not found for id: " + id);
  }

  public static Role fromDescription(String description) {
    for (Role role : Role.values()) {
      if (role.getDescription().equalsIgnoreCase(description)) {
        return role;
      }
    }
    throw new IllegalArgumentException("Role not found for description: " + description);
  }

}
