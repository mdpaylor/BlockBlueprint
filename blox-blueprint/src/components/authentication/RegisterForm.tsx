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
    title: "First Name",
    hint: "First name",
    hasVisibilityToggle: false,
  },
  {
    name: "lastName",
    icon: User,
    title: "Last Name",
    hint: "Last name",
    hasVisibilityToggle: false,
  },
];

const otherInputFields: InputField[] = [
  {
    name: "username",
    icon: User,
    title: "Username",
    hint: "Choose a username",
    hasVisibilityToggle: false,
  },
  {
    name: "email",
    icon: Mail,
    title: "Email",
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
    title: "Password",
    hint: "Create a strong password",
    hasVisibilityToggle: true,
  },
  {
    name: "confirmPassword",
    icon: LockKeyholeIcon,
    title: "Confirm Password",
    hint: "Confirm your password",
    hasVisibilityToggle: true,
  },
];

async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
  event.preventDefault();

  console.log("Registration");
}

function RegisterForm() {
  const [visiblePasswords, setVisiblePasswords] = useState<
    Record<string, boolean>
  >({});

  function togglePasswordVisibility(name: string) {
    setVisiblePasswords((currentPasswords) => ({
      ...currentPasswords,
      [name]: !currentPasswords[name],
    }));
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
              <div className="register-input-field" key={name}>
                <div className="register-field-icon">
                  <Icon strokeWidth={2} />
                </div>

                <label className="register-input-label">
                  <span>{title}</span>
                  <input type="text" name={name} placeholder={hint} />
                </label>
              </div>
            ))}
          </div>

          {otherInputFields.map(
            ({ name, icon: Icon, title, hint, hasVisibilityToggle }) => {
              const passwordIsVisible = Boolean(visiblePasswords[name]);

              let inputType = "text";

              if (hasVisibilityToggle) {
                inputType = passwordIsVisible ? "text" : "password";
              } else if (name === "email") {
                inputType = "email";
              } else if (name === "phoneNumber") {
                inputType = "tel";
              }

              return (
                <div className="register-input-field" key={name}>
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
                        autoComplete={
                          hasVisibilityToggle ? "new-password" : undefined
                        }
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
