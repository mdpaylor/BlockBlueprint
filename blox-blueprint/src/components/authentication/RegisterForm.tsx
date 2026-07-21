import {
  LockKeyholeIcon,
  Mail,
  Phone,
  User,
  Eye,
  type LucideIcon,
} from "lucide-react";

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

function RegisterForm() {
  return (
    <form className="register-form">
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

        <div className="register-other-fields">
          {otherInputFields.map(
            ({ name, icon: Icon, title, hint, hasVisibilityToggle }) => (
              <div className="register-input-field" key={name}>
                <div className="register-field-icon">
                  <Icon size={32} strokeWidth={2} color="#ffffff" />
                </div>
                <div>
                  <label className="register-input-label">
                    <span>{title}</span>
                    <input type="text" name={name} placeholder={hint} />
                  </label>
                </div>
                {hasVisibilityToggle && (
                  <Eye className="register-visibility-toggle" strokeWidth={2} />
                )}
              </div>
            ),
          )}
        </div>
      </div>
    </form>
  );
}

export default RegisterForm;
