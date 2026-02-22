import React from "react";
import { Link } from "react-router-dom";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../UserContext";
import Erro from "../Help/Error";

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error("LoginForm precisa estar dentro de UserStorage");
  }

  const { userLogin, error, loading } = context;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  }

  return (
    <section className="anime-left">
      <h1 className="font-secondary font-bold text-5xl my-4 mx-auto relative title-decoration">
        Login
      </h1>
      <form className="mb-8" onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        <Erro error={error} />
      </form>
      <Link className="inline-block text-[#666] py-2" to="/login/perdeu">
        Perdeu a Senha?
      </Link>
      <br />
      <div className="mt-16">
        <h2 className="font-secondary text-[2rem] font-bold subtitle">
          Cadastre-se
        </h2>
        <p className="my-8">Ainda não possui conta? Cadastre-se no site.</p>
        <Button as="link" to="/login/criar">
          Cadastro
        </Button>
      </div>
    </section>
  );
};

export default LoginForm;
