import { useState } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router";
import Button from "../components/Button";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();
  async function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (!email || !password) {
        setError("Por favor, preencha todos os campos");
        return;
      }

      const response = await fetch(import.meta.env.VITE_URL_BACK + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      switch (response.status) {
        case 400:
          setError("Por favor, preencha todos os campos");
          return;
        case 401:
          setError("E-mail ou senha incorretos");
          return;
        case 404:
          setError("E-mail não encontrado");
          return;
        case 500:
          setError("Erro interno do servidor");
          return;
        default:
          break;
        case 200: {
          setError("");
          navigate("/");
          const data = await response.json();
          setUser(data);
          break;
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Ocorreu um erro durante o login. Tente novamente.");
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2 bg-[#161410]">
      <form
        className="px-0.8 flex flex-col items-center gap-4 rounded-lg border-3 bg-[#302f2f] py-6 md:p-9.5"
        onSubmit={onSubmit}
      >
        <Link to="/">
          <img src="./logo-com-bg-removebg-preview 1.png" alt="" />
        </Link>
        <div className="flex flex-col gap-1">
          <Input
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <Input
            placeholder="Senha"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <p className="w-full text-left text-sm font-bold text-red-500">
          {error}
        </p>
        <div className="flex w-full flex-col gap-2">
          <Button title="Login" variant="default" type="submit"></Button>
          <Link to="/register">
            <Button title="Não tenho uma conta" variant="outline"></Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
