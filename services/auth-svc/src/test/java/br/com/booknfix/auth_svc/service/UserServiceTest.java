package br.com.booknfix.auth_svc.service;

import br.com.booknfix.auth_svc.dto.request.AuthRequestDTO;
import br.com.booknfix.auth_svc.dto.request.CommonUserRequestDTO;
import br.com.booknfix.auth_svc.dto.response.AuthResponseDTO;
import br.com.booknfix.auth_svc.enums.Role;
import br.com.booknfix.auth_svc.model.UserEntity;
import br.com.booknfix.auth_svc.repository.UserRepository;
import br.com.booknfix.auth_svc.security.JWTUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.server.ResponseStatusException;

import java.net.URI;
import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

  @InjectMocks
  private UserService service;

  @Mock
  private UserRepository userRepository;

  @Mock
  private PasswordEncoder passwordEncoder;

  @Mock
  private JWTUtil jwtUtil;

  private UserEntity mockUser;

  @BeforeEach
  void setUp() {
    mockUser = new UserEntity(
            1L,
            "Test",
            "USER",
            "1222211",
            "teste@gmail",
            true,
            LocalDate.now(),
            "11111111",
            "encodedPassword",
            Role.COMMON_USER
    );
  }

  @Nested
  @DisplayName("Login Tests")
  class LoginTests {

    @Test
    @DisplayName("Should return AuthResponseDTO when valid credentials are provided")
    void login_shouldReturnAuthResponseDTO_whenValidCredentials() {
      AuthRequestDTO requestDTO = new AuthRequestDTO();
      requestDTO.setSenha("rawPassword");
      requestDTO.setEmail("test@email.com");

      when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(mockUser));
      when(passwordEncoder.matches(anyString(), anyString())).thenReturn(true);
      when(jwtUtil.generateToken(any())).thenReturn("accessToken");
      when(jwtUtil.generateRefreshToken(any())).thenReturn("refreshToken");

      ResponseEntity<AuthResponseDTO> response = service.login(requestDTO);

      assertNotNull(response.getBody());
      assertNotNull(response.getBody().getUser());
      assertEquals("accessToken", response.getBody().getToken());
      assertEquals("refreshToken", response.getBody().getRefreshToken());
      verify(userRepository).findByEmail(anyString());
    }

    @Test
    @DisplayName("Should throw BAD_REQUEST when request body is null")
    void login_shouldThrowBadRequest_whenRequestIsNull() {
      ResponseStatusException ex = assertThrows(ResponseStatusException.class,
              () -> service.login(null));
      assertEquals("400 BAD_REQUEST \"Request body cannot be null\"", ex.getMessage());
    }

    @Test
    @DisplayName("Should throw UNAUTHORIZED when user is not found")
    void login_shouldThrowUnauthorized_whenUserNotFound() {
      AuthRequestDTO requestDTO = new AuthRequestDTO();
      requestDTO.setEmail("notfound@email.com");
      requestDTO.setSenha("123");

      when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());

      ResponseStatusException ex = assertThrows(ResponseStatusException.class,
              () -> service.login(requestDTO));
      assertEquals("401 UNAUTHORIZED \"Usuário ou senha inválidos\"", ex.getMessage());
    }

    @Test
    @DisplayName("Should throw UNAUTHORIZED when password is invalid")
    void login_shouldThrowUnauthorized_whenPasswordInvalid() {
      AuthRequestDTO requestDTO = new AuthRequestDTO();
      requestDTO.setEmail("test@email.com");
      requestDTO.setSenha("wrongPassword");

      when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(mockUser));
      when(passwordEncoder.matches(anyString(), anyString())).thenReturn(false);

      ResponseStatusException ex = assertThrows(ResponseStatusException.class,
              () -> service.login(requestDTO));
      assertEquals("401 UNAUTHORIZED \"Usuário ou senha inválidos\"", ex.getMessage());
    }
  }

  @Nested
  @DisplayName("Register Common User Tests")
  class RegisterCommonUserTests {

    @Test
    @DisplayName("Should register new user successfully")
    void registerCommonUser_shouldReturnCreated_whenValidData() {
      CommonUserRequestDTO requestDTO = new CommonUserRequestDTO();
      requestDTO.setCpf("12345678900");
      requestDTO.setEmail("newuser@email.com");
      requestDTO.setTelefone("99999999");
      requestDTO.setSenha("password");

      when(userRepository.existsByCpfAndRole(anyString(), eq(Role.COMMON_USER))).thenReturn(false);
      when(userRepository.existsByEmail(anyString())).thenReturn(false);
      when(userRepository.existsByTelefone(anyString())).thenReturn(false);
      when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
      when(userRepository.save(any(UserEntity.class))).thenAnswer(invocation -> {
        UserEntity saved = invocation.getArgument(0);
        saved.setId(100L);
        return saved;
      });

      ResponseEntity<URI> response = service.registerCommonUser(requestDTO);

      assertEquals(201, response.getStatusCodeValue());
      assertEquals("/users/100", response.getHeaders().getLocation().toString());
      verify(userRepository).save(any(UserEntity.class));
    }

    @Test
    @DisplayName("Should throw BAD_REQUEST when request body is null")
    void registerCommonUser_shouldThrowBadRequest_whenRequestIsNull() {
      ResponseStatusException ex = assertThrows(ResponseStatusException.class,
              () -> service.registerCommonUser(null));
      assertEquals("400 BAD_REQUEST \"Request body cannot be null\"", ex.getMessage());
    }

    @Test
    @DisplayName("Should throw BAD_REQUEST when CPF already exists")
    void registerCommonUser_shouldThrowBadRequest_whenCpfExists() {
      CommonUserRequestDTO requestDTO = new CommonUserRequestDTO();
      requestDTO.setCpf("123");
      requestDTO.setEmail("new@email.com");
      requestDTO.setTelefone("1234");

      when(userRepository.existsByCpfAndRole(anyString(), eq(Role.COMMON_USER))).thenReturn(true);

      ResponseStatusException ex = assertThrows(ResponseStatusException.class,
              () -> service.registerCommonUser(requestDTO));
      assertEquals("400 BAD_REQUEST \"Já existe um usuário com este CPF cadastrado\"", ex.getMessage());
    }

    @Test
    @DisplayName("Should throw BAD_REQUEST when Email already exists")
    void registerCommonUser_shouldThrowBadRequest_whenEmailExists() {
      CommonUserRequestDTO requestDTO = new CommonUserRequestDTO();
      requestDTO.setCpf("123");
      requestDTO.setEmail("existing@email.com");
      requestDTO.setTelefone("1234");

      when(userRepository.existsByCpfAndRole(anyString(), eq(Role.COMMON_USER))).thenReturn(false);
      when(userRepository.existsByEmail(anyString())).thenReturn(true);

      ResponseStatusException ex = assertThrows(ResponseStatusException.class,
              () -> service.registerCommonUser(requestDTO));
      assertEquals("400 BAD_REQUEST \"Já existe um usuário com este email cadastrado\"", ex.getMessage());
    }

    @Test
    @DisplayName("Should throw BAD_REQUEST when Phone already exists")
    void registerCommonUser_shouldThrowBadRequest_whenPhoneExists() {
      CommonUserRequestDTO requestDTO = new CommonUserRequestDTO();
      requestDTO.setCpf("123");
      requestDTO.setEmail("email@email.com");
      requestDTO.setTelefone("999999");

      when(userRepository.existsByCpfAndRole(anyString(), eq(Role.COMMON_USER))).thenReturn(false);
      when(userRepository.existsByEmail(anyString())).thenReturn(false);
      when(userRepository.existsByTelefone(anyString())).thenReturn(true);

      ResponseStatusException ex = assertThrows(ResponseStatusException.class,
              () -> service.registerCommonUser(requestDTO));
      assertEquals("400 BAD_REQUEST \"Já existe um usuário com este telefone cadastrado\"", ex.getMessage());
    }
  }
}