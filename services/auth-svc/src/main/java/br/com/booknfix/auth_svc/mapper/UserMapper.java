package br.com.booknfix.auth_svc.mapper;

import br.com.booknfix.auth_svc.dto.request.CommonUserRequestDTO;
import br.com.booknfix.auth_svc.dto.response.UserResponseDTO;
import br.com.booknfix.auth_svc.model.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {

  UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);


  UserEntity toEntity(CommonUserRequestDTO requestDTO);

  UserResponseDTO toResponseDTO(UserEntity userEntity);
}
