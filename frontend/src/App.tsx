import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth";
import Home from "./pages/home";
import NewOrderService from "./pages/new_order_service";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/new-order" element={<NewOrderService />} />
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
