import { X } from "lucide-react";
import { type ReactNode, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../css/AuthModal.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function AuthModal() {
  const navigate = useNavigate();
  const location = useLocation();

  const isRegister = location.pathname === "/register";

  function closeModal() {
    navigate("/");
  }

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") closeModal();
    }

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="auth-overlay" role="presentation" onMouseDown={closeModal}>
      <section
        className="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          className="auth-close"
          type="button"
          aria-label="Close"
          onClick={closeModal}
        >
          <X />
        </button>

        <div className="auth-form-panel">
          <div className="brand">
            <img
              src="../src/assets/blox-blueprint-logo.png"
              alt=""
              className="brand-logo"
            />

            <span>
              Blox<span className="brand-accent">Blueprint</span>
            </span>
          </div>

          <div className="auth-tabs">
            <div
              className={`auth-tab-indicator ${isRegister ? "register-active" : ""}`}
            />

            <Link
              className={`auth-tab ${!isRegister ? "active" : ""}`}
              to="/login"
            >
              Login
            </Link>

            <Link
              className={`auth-tab ${isRegister ? "active" : ""}`}
              to="/register"
            >
              Create Account
            </Link>
          </div>

          <div className="auth-form-container">
            <div className="auth-form-transition" key={isRegister ? "register" : "login"}>
              {isRegister ? <RegisterForm /> : <LoginForm />}
            </div>
          </div>
        </div>

        <aside className="auth-visual-panel">

        </aside>
      </section>
    </div>
  );
}

export default AuthModal;
