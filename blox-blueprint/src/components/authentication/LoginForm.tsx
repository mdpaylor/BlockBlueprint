import { useState, type SubmitEvent } from "react";
import { loginUser } from "../../services/authApi";
import type {
  LoginUserRequestDto,
  LoginUserResponseDto,
} from "../../types/authTypes";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [loginError, setLoginError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoginError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    const loginUserRequest: LoginUserRequestDto = {
      identifier: String(formData.get("username") ?? ""),
      password: String(formData.get("password") ?? ""),
    };

    try {
      const response = await loginUser(loginUserRequest);
      const responseText = await response.text();

      let data: LoginUserResponseDto | null = null;
      if (responseText) {
        try {
          data = JSON.parse(responseText) as LoginUserResponseDto;
        } catch {
          console.error("The server retruned invalid JSON:", responseText);
        }
      }

      if (!response.ok) {
        console.error("Login failed", response.status, response.statusText);

        if (response.status === 401) {
          setLoginError("Incorrect username or password.");
        } else {
          setLoginError("Unable to log in. Please try again.");
        }

        return;
      }

      if (data?.user) {
        setUser(data.user);
        navigate("/dashboard");
        console.log("Login successful");
      } else {
        console.error("Login unsuccessful", data);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Unable to reach the server:", error.message);
      } else {
        console.error("An unknown error occured");
      }
      setLoginError("Unable to reach the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="auth-form">
      <h2 id="auth-title">Welcome Back</h2>
      <p>Log in to continue to BloxBlueprint.</p>

      <form onSubmit={handleSubmit}>
        <div
          className={`login-input-field ${loginError ? "login-input-field-error" : ""}`}
        >
          <label htmlFor="login-username">Username, Email, or Phone Number</label>
          <input
            id="login-username"
            name="username"
            type="text"
            autoComplete="username"
            required
            onChange={() => setLoginError("")}
          />
        </div>
        <div
          className={`login-input-field ${loginError ? "login-input-field-error" : ""}`}
        >
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            onChange={() => setLoginError("")}
          />
        </div>

        {loginError && (
          <p className="login-error-message" id="login-error" role="alert">
            {loginError}
          </p>
        )}

        <button
          className="button button-primary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
