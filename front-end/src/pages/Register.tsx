import { useState } from "react";
import Input from "../components/Input";
import { Link } from "react-router";
import Button from "../components/Button";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cep, setCep] = useState("");

  function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    console.log("CEP:", cep);
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
          <Input placeholder="Nome" onChange={(e) => setName(e.target.value)} />
          <Input
            placeholder="E-mail"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Senha"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="Confirme sua Senha"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Input placeholder="CEP" onChange={(e) => setCep(e.target.value)} />
        </div>
        <div className="flex w-full flex-col gap-2">
          <Button title="Criar Conta"></Button>
          <Link to="/login">
            <Button title="Já tenho uma conta" variant="outline"></Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
