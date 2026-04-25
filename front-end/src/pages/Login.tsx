import { useState } from "react";
import Input from "../components/Input";
import { Link } from "react-router";
import Button from "../components/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
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
          />
          <Input
            placeholder="Senha"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <Button title="Login" variant="default"></Button>
          <Link to="/register">
            <Button title="Não tenho uma conta" variant="outline"></Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
