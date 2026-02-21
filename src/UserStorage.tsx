import React from "react";
import { UserContext } from "./UserContext";
import type { IUser } from "./UserContext";
import { TOKEN_POST, USER_GET } from "./api";

interface Props {
  children: React.ReactNode;
}

export const UserStorage: React.FC<Props> = ({ children }) => {
  const [data, setData] = React.useState<IUser | null>(null);
  const [login, setLogin] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function getUser(token: string): Promise<void> {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Erro ao buscar usuário");
    }

    const json: IUser = await response.json();
    setData(json);
    setLogin(true);
  }

  async function userLogin(username: string, password: string): Promise<void> {
    const { url, options } = TOKEN_POST({ username, password });
    const tokenRes = await fetch(url, options);

    if (!tokenRes.ok) {
      throw new Error("Erro no login");
    }

    const { token }: { token: string } = await tokenRes.json();

    window.localStorage.setItem("token", token);
    await getUser(token);
  }

  return (
    <UserContext.Provider value={{ data, login, loading, error, userLogin }}>
      {children}
    </UserContext.Provider>
  );
};
