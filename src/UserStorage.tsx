import React from "react";
import { UserContext } from "./UserContext";
import type { IUser } from "./UserContext";
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "./api";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export const UserStorage: React.FC<Props> = ({ children }) => {
  const [data, setData] = React.useState<IUser | null>(null);
  const [login, setLogin] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

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
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const tokenRes = await fetch(url, options);

      if (!tokenRes.ok) {
        throw new Error(`Error: ${tokenRes.statusText}`);
      }

      const { token }: { token: string } = await tokenRes.json();

      window.localStorage.setItem("token", token);
      await getUser(token);
      navigate("/conta");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro desconhecido");
      }
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  const userLogout = React.useCallback(async function () {
    setData(null);
    setError(null);
    setLoading(false);
    setLogin(false);
    window.localStorage.removeItem("token");
  }, []);

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem("token");
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error("Token inválido");
          await getUser(token);
        } catch {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{ data, login, loading, error, userLogin, userLogout }}
    >
      {children}
    </UserContext.Provider>
  );
};
