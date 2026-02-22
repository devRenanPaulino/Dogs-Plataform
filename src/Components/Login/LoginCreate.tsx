import React from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import { USER_POST } from "../../api";
import { UserContext } from "../../UserContext";
import useFetch from "../../Hooks/useFetch";
import Erro from "../Help/Error"

const LoginCriar = () => {
  const username = useForm();
  const email = useForm('email');
  const password = useForm('password');

  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error("userLogin precisa de um novo usuário");
  }

  const {userLogin} = context;
  const {loading, error, request} = useFetch();
  
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  if (
    username.validate() &&
    email.validate() &&
    password.validate()
  ) {
    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    });

    const { response } = await request(url, options);

    if (response && response.ok) {
      userLogin(username.value, password.value);
    }
  }
}

  return (
    <section className="anime-left">
      <h1 className="font-secondary font-bold text-5xl my-4 mx-auto relative title-decoration">
        Cadastre-se
      </h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username}/>
         <Input label="Email" type="email" name="email" {...email}/>
          <Input label="Senha" type="password" name="password" {...password}/>
          {loading ? (<Button disabled>Cadastrando...</Button>) : (<Button>Cadastrar</Button>)}
          <Erro error={error}/>
      </form>
    </section>
  );
};

export default LoginCriar;
