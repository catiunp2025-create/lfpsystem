import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<div>Home</div>} />
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
