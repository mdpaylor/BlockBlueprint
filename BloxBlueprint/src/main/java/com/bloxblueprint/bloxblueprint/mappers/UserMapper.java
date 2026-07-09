package com.bloxblueprint.bloxblueprint.mappers;

import com.bloxblueprint.bloxblueprint.dtos.user.RegisterUserRequestDto;
import com.bloxblueprint.bloxblueprint.dtos.user.UserDto;
import com.bloxblueprint.bloxblueprint.entities.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toUserDto(User user);
    User toEntity(RegisterUserRequestDto registerUserRequestDto);
}
