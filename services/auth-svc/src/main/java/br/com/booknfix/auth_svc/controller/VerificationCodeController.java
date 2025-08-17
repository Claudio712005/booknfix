package br.com.booknfix.auth_svc.controller;

import br.com.booknfix.auth_svc.service.VerificationCodeService;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/verification-codes")
@RequiredArgsConstructor
public class VerificationCodeController {

  private final VerificationCodeService verificationCodeService;

  @PostMapping("/email-confirmation")
  public ResponseEntity sendEmailConfirmationCode(@RequestBody
                                                  @NotBlank(message = "Email não deve estar em branco")
                                                  String email) {
    verificationCodeService.generateAndSendCode(email);
    return ResponseEntity.ok().build();
  }
}
