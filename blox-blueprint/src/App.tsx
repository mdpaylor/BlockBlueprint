import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import "./css/App.css";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/dashboard" element={<DashboardLayout />} />
      </Routes>
    </main>
  );
}

export default App;
