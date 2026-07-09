package com.bloxblueprint.bloxblueprint.dtos.user;

import lombok.*;

@Data
public class RegisterUserRequestDto {
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String phoneNumber;
    private String password;
}
