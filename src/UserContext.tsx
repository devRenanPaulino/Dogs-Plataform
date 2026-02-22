import React from 'react';

export interface IUser {
  id: number;
  username: string;
  email: string;
}

export interface IUserContext {
  data: IUser | null;
  login: boolean;
  loading: boolean;
  error: string | null;
  userLogin: (username: string, password: string) => Promise<void>;
  userLogout: () => void;
}

export const UserContext = React.createContext<IUserContext | null>(null);