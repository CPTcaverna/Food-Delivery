import { useState } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router";
import Button from "../components/Button";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cep, setCep] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (!name || !email || !password || !confirmPassword || !cep) {
        setError("Por favor, preencha todos os campos");
        return;
      }
      if (password !== confirmPassword) {
        setError("As senhas não coincidem");
        return;
      }

      const response = await fetch(
        import.meta.env.VITE_URL_BACK + "/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password, confirmPassword, cep }),
        },
      );

      switch (response.status) {
        case 400:
          setError("Por favor, preencha todos os campos");
          break;
        case 409:
          setError("E-mail já cadastrado");
          break;
        case 500:
          setError("Erro interno do servidor");
          break;
        case 201:
          setError("");
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setCep("");
          navigate("/login");
          break;
        default:
          setError("");
          break;
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error during registration:", error);
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
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <Input
            placeholder="E-mail"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input
            placeholder="Senha"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Input
            placeholder="Confirme sua Senha"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
          <Input
            placeholder="CEP"
            onChange={(e) => setCep(e.target.value)}
            value={cep}
          />
        </div>
        <p className="w-87.5 text-left text-sm font-bold text-red-500">
          {error}
        </p>
        <div className="flex w-87.5 flex-col gap-2">
          <Button title="Criar Conta" type="submit"></Button>
          <Link to="/login">
            <Button title="Já tenho uma conta" variant="outline"></Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
