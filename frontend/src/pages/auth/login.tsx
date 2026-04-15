import { useRef, type SubmitEvent } from "react";
import api from "../../services/api";
import "./login.css";

function Login() {
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputPass = useRef<HTMLInputElement>(null);

  async function userLogin(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    await api.post("auth/login", {
      email: "user1@email.com",
      password: "123456",
    });
  }

  return (
    <div className="container-login">
      <div className="bloco-superior">CATI - Sistema LFP</div>
      <form onSubmit={userLogin}>
        <h1>Login</h1>
        <input placeholder="Email" name="email" type="email" ref={inputEmail} />
        <input
          placeholder="Senha"
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
