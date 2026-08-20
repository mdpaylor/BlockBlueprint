import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import "./css/App.css";
import AuthModal from "./components/authentication/AuthModal";
import MainLayout from "./layouts/MainLayout";
import ExperienceLayout from "./layouts/ExperienceLayout";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="login" element={<AuthModal />} />
          <Route path="register" element={<AuthModal />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/experiences/:experienceId" element={<ExperienceLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </main>
  );
}

export default App;
