import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import "./css/App.css";
import LoginForm from "./components/authentication/LoginForm";
import AuthModal from "./components/authentication/AuthModal";
import RegisterForm from "./components/authentication/RegisterForm";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="login" element={<AuthModal />} />
          <Route path="register" element={<AuthModal />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
