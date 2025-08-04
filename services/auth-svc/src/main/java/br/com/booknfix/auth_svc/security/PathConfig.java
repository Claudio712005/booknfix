package br.com.booknfix.auth_svc.security;

import org.springframework.http.HttpMethod;

import java.util.Map;

public class PathConfig {

  public static final Map<String, HttpMethod> PUBLIC_PATHS = Map.ofEntries(
          Map.entry("/users/auth/login", HttpMethod.POST),
          Map.entry("/users/common/register", HttpMethod.POST),
          Map.entry("/error", HttpMethod.GET)
  );

  public static final Map<String, HttpMethod> PRIVATE_COMMON_USER_PATHS = Map.of();
  public static final Map<String, HttpMethod> PRIVATE_ENTERPRISE_ADMIN_PATHS = Map.of();
  public static final Map<String, HttpMethod> PRIVATE_BUSINESS_USER_PATHS = Map.of();
}
