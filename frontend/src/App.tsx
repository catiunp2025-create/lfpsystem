import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { type ReactNode } from "react";
import Login from "./pages/auth";
import Home from "./pages/home";
import NewOrderService from "./pages/new_order_service";

function PrivateRoute({children}: {children: ReactNode}) {
  const token = localStorage.getItem("token");
  return token ? <>{children}</> : <Navigate to="/" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/new-order" element={<PrivateRoute><NewOrderService /></PrivateRoute>} />
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
