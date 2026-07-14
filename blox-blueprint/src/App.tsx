import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import "./css/App.css";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </main>
  );
}

export default App;
