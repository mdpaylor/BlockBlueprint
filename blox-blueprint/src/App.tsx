import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import "./css/App.css";
import AuthModal from "./components/authentication/AuthModal";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="login" element={<AuthModal />} />
          <Route path="register" element={<AuthModal />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />} />
      </Routes>
    </main>
  );
}

export default App;
