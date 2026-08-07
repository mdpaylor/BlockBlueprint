import {
  LockKeyholeIcon,
  Mail,
  Phone,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { useState, type SubmitEvent } from "react";
import type {
  RegisterUserRequestDto,
  RegisterUserResponseDto,
} from "../../types/authTypes";
import { registerUser } from "../../services/authApi";

type InputField = {
  name: string;
  icon: LucideIcon;
  title: string;
  hint: string;
  hasVisibilityToggle: boolean;
};

const nameInputFields: InputField[] = [
  {
    name: "firstName",
    icon: User,
    title: "First Name*",
    hint: "First name",
    hasVisibilityToggle: false,
  },
  {
    name: "lastName",
    icon: User,
    title: "Last Name*",
    hint: "Last name",
    hasVisibilityToggle: false,
  },
];

const otherInputFields: InputField[] = [
  {
    name: "username",
    icon: User,
    title: "Username*",
    hint: "Choose a username",
    hasVisibilityToggle: false,
  },
  {
    name: "email",
    icon: Mail,
    title: "Email*",
    hint: "you@example.com",
    hasVisibilityToggle: false,
  },
  {
    name: "phoneNumber",
    icon: Phone,
    title: "Phone Number",
    hint: "+1 (123) 456-7890",
    hasVisibilityToggle: false,
  },
  {
    name: "password",
    icon: LockKeyholeIcon,
    title: "Password*",
    hint: "Create a strong password",
    hasVisibilityToggle: true,
  },
  {
    name: "confirmPassword",
    icon: LockKeyholeIcon,
    title: "Confirm Password*",
    hint: "Confirm your password",
    hasVisibilityToggle: true,
  },
];

function RegisterForm() {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [emptyFields, setEmptyFields] = useState<Record<string, boolean>>({});
  const [visiblePasswords, setVisiblePasswords] = useState<
    Record<string, boolean>
  >({});

  function togglePasswordVisibility(name: string) {
    setVisiblePasswords((currentPasswords) => ({
      ...currentPasswords,
      [name]: !currentPasswords[name],
    }));
  }

  function clearFieldError(name: string) {
    setFieldErrors((currentErrors) => {
      if (!currentErrors[name]) return currentErrors;

      const nextErrors = { ...currentErrors };
      delete nextErrors[name];

      return nextErrors;
    });
  }

  function markFieldInvalid(event: React.InvalidEvent<HTMLInputElement>) {
    const fieldName = event.currentTarget.name;

    setEmptyFields((currentFields) => ({
      ...currentFields,
      [fieldName]: true,
    }));
  }

  function clearEmptyField(event: React.ChangeEvent<HTMLInputElement>) {
    const fieldName = event.currentTarget.name;

    if (event.currentTarget.value.trim()) {
      setEmptyFields((currentFields) => ({
        ...currentFields,
        [fieldName]: false,
      }));
    }

    clearFieldError(fieldName);
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldErrors({});

    const formData = new FormData(event.currentTarget);

    const firstName = String(formData.get("firstName") ?? "");
    const lastName = String(formData.get("lastName") ?? "");
    const username = String(formData.get("username") ?? "");
    const email = String(formData.get("email") ?? "");
    const phoneNumber = String(formData.get("phoneNumber") ?? "");
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (password !== confirmPassword) {
      setFieldErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    const registerUserRequest: RegisterUserRequestDto = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
    };

    try {
      const response = await registerUser(registerUserRequest);
      const responseText = await response.text();

      let data: RegisterUserResponseDto | null = null;
      if (responseText) {
        try {
          data = JSON.parse(responseText) as RegisterUserResponseDto;
        } catch {
          console.error("The server retruned invalid JSON:", responseText);
        }
      }

      if (!response.ok) {
        console.error(
          "Registration failed:",
          response.status,
          response.statusText,
          data,
        );

        if (data) {
          const duplicateErrors: Record<string, string> = {};
          if (data.usernameTaken)
            duplicateErrors.username = "Username is already taken.";
          if (data.emailTaken)
            duplicateErrors.email = "Email is already taken.";
          if (data.phoneNumberTaken)
            duplicateErrors.phoneNumber = "Phone Number is already taken.";

          setFieldErrors(duplicateErrors);
        }

        return;
      }

      // setUser(data.user);
      // navigate("/dashboard");
      console.log("Account created:", data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Unable to reach the server:", error.message);
      } else {
        console.error("An unknown error occured");
      }
    }

    console.log("Registration");
  }

  return (
    <div>
      <span className="register-description-text">
        Create your account to start planning like a pro
      </span>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="register-fields">
          <div className="register-name-fields">
            {nameInputFields.map(({ name, icon: Icon, title, hint }) => (
              <div
                className={`register-input-field ${
                  emptyFields[name] || fieldErrors[name]
                    ? "register-input-field-error"
                    : ""
                }`}
                key={name}
              >
                <div className="register-field-icon">
                  <Icon strokeWidth={2} />
                </div>

                <label className="register-input-label">
                  <span>{title}</span>
                  <input
                    type="text"
                    required
                    name={name}
                    onInvalid={markFieldInvalid}
                    onChange={clearEmptyField}
                    placeholder={hint}
                  />
                </label>
              </div>
            ))}
          </div>

          {otherInputFields.map(
            ({ name, icon: Icon, title, hint, hasVisibilityToggle }) => {
              const passwordIsVisible = Boolean(visiblePasswords[name]);
              const errorMessage = fieldErrors[name];

              let inputType = "text";

              if (hasVisibilityToggle) {
                inputType = passwordIsVisible ? "text" : "password";
              } else if (name === "email") {
                inputType = "email";
              } else if (name === "phoneNumber") {
                inputType = "tel";
              }

              return (
                <div className="register-field-group" key={name}>
                  <div
                    className={`register-input-field ${
                      emptyFields[name] || errorMessage
                        ? "register-input-field-error"
                        : ""
                    }`}
                  >
                    <div className="register-field-icon">
                      <Icon size={32} strokeWidth={2} color="#ffffff" />
                    </div>
                    <div className="register-text-holder">
                      <label className="register-input-label">
                        <span>{title}</span>
                        <input
                          type={inputType}
                          name={name}
                          placeholder={hint}
                          required={name !== "phoneNumber"}
                          onInvalid={markFieldInvalid}
                          onChange={clearEmptyField}
                        />
                      </label>
                    </div>

                    {hasVisibilityToggle && (
                      <button
                        className="register-visibility-button"
                        type="button"
                        aria-label={
                          passwordIsVisible ? `Hide ${title}` : `Show ${title}`
                        }
                        aria-pressed={passwordIsVisible}
                        onClick={() => togglePasswordVisibility(name)}
                      >
                        {passwordIsVisible ? (
                          <Eye strokeWidth={2} />
                        ) : (
                          <EyeOff strokeWidth={2} />
                        )}
                      </button>
                    )}
                  </div>

                  {errorMessage && (
                    <p
                      className="register-field-error-message"
                      id={`${name}-error`}
                      role="alert"
                    >
                      {errorMessage}
                    </p>
                  )}
                </div>
              );
            },
          )}

          <button
            type="submit"
            className="button button-primary register-submit-button"
          >
            Create Account
            <ArrowRight size={20} strokeWidth={2} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
