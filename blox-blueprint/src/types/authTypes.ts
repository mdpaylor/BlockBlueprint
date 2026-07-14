export type UserDto = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

export type RegisterUserRequestDto = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
};

export type RegisterUserResponseDto = {
  success: boolean;
  user?: UserDto;
  usernameTaken?: boolean;
  emailTaken?: boolean;
  phoneNumberTaken?: boolean;
};

export type LoginUserRequestDto = {
  username: string;
  password: string;
};

export type LoginUserResponseDto = {
  success: boolean;
  message: string;
  token?: string;
  user?: UserDto;
};