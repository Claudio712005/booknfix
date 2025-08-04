package br.com.booknfix.auth_svc.controller;

import br.com.booknfix.auth_svc.dto.request.AuthRequestDTO;
import br.com.booknfix.auth_svc.dto.request.CommonUserRequestDTO;
import br.com.booknfix.auth_svc.dto.response.AuthResponseDTO;
import br.com.booknfix.auth_svc.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {

  private final UserService userService;

  @PostMapping("/auth/login")
  public ResponseEntity<AuthResponseDTO> login(@RequestBody @Valid AuthRequestDTO requestDTO) {
    return userService.login(requestDTO);
  }

  @PostMapping("/common/register")
  public ResponseEntity<URI> registerCommonUser(@RequestBody @Valid CommonUserRequestDTO requestDTO) {
    return userService.registerCommonUser(requestDTO);
  }

}
