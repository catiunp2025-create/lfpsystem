import React, { useRef } from "react";
import api from "../../services/api";
import "./login.css";
import { useNavigate } from "react-router-dom";

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

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", user);

      if (token) {
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container-login">
      <div className="bloco-superior">CATI - Sistema LFP</div>
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
