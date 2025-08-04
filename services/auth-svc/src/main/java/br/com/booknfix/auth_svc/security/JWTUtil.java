package br.com.booknfix.auth_svc.security;

import br.com.booknfix.auth_svc.enums.TokenType;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.UUID;

@Component
public class JWTUtil {

  private final SecretKey key;

  @Value("${jwt.access-expiration}")
  private Long accessExpiration;

  @Value("${jwt.refresh-expiration}")
  private Long refreshExpiration;

  public JWTUtil(@Value("${jwt.secret}") String secret) {
    this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
  }

  public String generateToken(UserDetails userDetails) {
    return Jwts.builder()
            .setSubject(userDetails.getUsername())
            .claim("role", userDetails.getAuthorities().iterator().next().getAuthority())
            .claim("token_type", TokenType.ACCESS)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + accessExpiration))
            .signWith(key, SignatureAlgorithm.HS256)
            .compact();
  }

  public String generateRefreshToken(UserDetails userDetails) {
    return Jwts.builder()
            .setSubject(userDetails.getUsername())
            .claim("token_type", TokenType.REFRESH)
            .setId(UUID.randomUUID().toString())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + refreshExpiration))
            .signWith(key, SignatureAlgorithm.HS256)
            .compact();
  }

  public boolean validateToken(String token, UserDetails userDetails) {
    final String username = extractUsername(token);
    return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
  }

  public String validateToken(String token) {
    try {
      return isTokenExpired(token) ? null : extractUsername(token);
    } catch (JwtException e) {
      return null;
    }
  }

  public String validateAccessToken(String token) {
    try {
      Claims claims = extractAllClaims(token);
      if (claims.get("token_type", TokenType.class) == TokenType.ACCESS && !isTokenExpired(token)) {
        return claims.getSubject();
      }
    } catch (JwtException e) {
      return null;
    }
    return null;
  }

  public String extractUsername(String token) {
    return extractAllClaims(token).getSubject();
  }

  private boolean isTokenExpired(String token) {
    return extractAllClaims(token).getExpiration().before(new Date());
  }

  private Claims extractAllClaims(String token) {
    return Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .getBody();
  }
}
