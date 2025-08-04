package br.com.booknfix.auth_svc.service;

import br.com.booknfix.auth_svc.dto.request.AuthRequestDTO;
import br.com.booknfix.auth_svc.dto.request.CommonUserRequestDTO;
import br.com.booknfix.auth_svc.dto.response.AuthResponseDTO;
import br.com.booknfix.auth_svc.enums.Role;
import br.com.booknfix.auth_svc.mapper.UserMapper;
import br.com.booknfix.auth_svc.model.UserEntity;
import br.com.booknfix.auth_svc.repository.UserRepository;
import br.com.booknfix.auth_svc.security.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.net.URI;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JWTUtil jwtUtil;

  public ResponseEntity<AuthResponseDTO> login(AuthRequestDTO requestDTO) throws ResponseStatusException{
    if(requestDTO == null) {
      throw new ResponseStatusException(
          HttpStatus.BAD_REQUEST, "Request body cannot be null");
    }

    UserEntity userEntity = userRepository.findByEmail(requestDTO.getEmail())
        .orElseThrow(() -> new ResponseStatusException(
            HttpStatus.UNAUTHORIZED, "Usuário ou senha inválidos"));

    if(!passwordEncoder.matches(requestDTO.getSenha(), userEntity.getSenha())) {
      throw new ResponseStatusException(
          HttpStatus.UNAUTHORIZED, "Usuário ou senha inválidos");
    }

    AuthResponseDTO responseDTO = new AuthResponseDTO();
    responseDTO.setUser(UserMapper.INSTANCE.toResponseDTO(userEntity));
    responseDTO.setToken(jwtUtil.generateToken(userEntity));
    responseDTO.setRefreshToken(jwtUtil.generateRefreshToken(userEntity));

    return ResponseEntity.ok(responseDTO);
  }

  public ResponseEntity<URI> registerCommonUser(CommonUserRequestDTO requestDTO) throws ResponseStatusException{
    if(requestDTO == null) {
      throw new ResponseStatusException(
          HttpStatus.BAD_REQUEST, "Request body cannot be null");
    }

    if(userRepository.existsByCpfAndRole(requestDTO.getCpf(), Role.COMMON_USER)){
      throw new ResponseStatusException(
          HttpStatus.BAD_REQUEST, "Já existe um usuário com este CPF cadastrado");
    }

    if(userRepository.existsByEmail(requestDTO.getEmail())){
      throw new ResponseStatusException(
          HttpStatus.BAD_REQUEST, "Já existe um usuário com este email cadastrado");
    }

    if(userRepository.existsByTelefone(requestDTO.getTelefone())){
      throw new ResponseStatusException(
          HttpStatus.BAD_REQUEST, "Já existe um usuário com este telefone cadastrado");
    }

    requestDTO.setSenha(passwordEncoder.encode(requestDTO.getSenha()));

    UserEntity userEntity = UserMapper.INSTANCE.toEntity(requestDTO);

    userEntity.setRole(Role.COMMON_USER);

    userEntity.setAtivo(true);

    UserEntity savedUser = userRepository.save(userEntity);

    return ResponseEntity.created(URI.create("/users/" + savedUser.getId())).build();
  }
}
