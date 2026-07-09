package com.bloxblueprint.bloxblueprint.dtos.user;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterUserResponseDto {
    private boolean success;
    private UserDto user;

    private boolean usernameTaken;
    private boolean emailTaken;
    private boolean phoneNumberTaken;
}
