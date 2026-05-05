import React, { useRef } from "react";
import api from "../../services/api";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { BlocoSuperiorLogin } from "../../components/bloco_superior-login/BlocoSuperiorLogin";

function Login() {
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputPass = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function userLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await api.post("auth/login", {
        email: inputEmail.current?.value,
        password: inputPass.current?.value,
      });

      const { accessToken } = response.data;

      if (accessToken) {
        localStorage.setItem("token", accessToken);
        navigate("/home");
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        navigate("/auth/login");
      }
      console.log(error);
    }
  }

  return (
    <div className="container-login">
      <BlocoSuperiorLogin />
      <form onSubmit={userLogin}>
        <h1>Login</h1>
        <input
          placeholder="Digite seu email"
          name="email"
          type="email"
          ref={inputEmail}
        />
        <input
          placeholder="Digite sua senha"
          name="password"
          type="password"
          ref={inputPass}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
