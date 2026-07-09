package com.bloxblueprint.bloxblueprint.dtos.user;

import lombok.Data;

@Data
public class LoginUserRequestDto {
    private String username;
    private String password;
}
