package com.bloxblueprint.bloxblueprint.dtos.user;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginUserResponseDto {
    private boolean success;
    private String message;
    private String token;
    private UserDto user;
}
