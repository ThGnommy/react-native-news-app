import React, { createContext, useReducer } from "react";
import { reducerUser } from "./reducerUser";

export interface IAuthContext {
  user: object;
  isSignedin: boolean;
}

export const initialState: IAuthContext = {
  user: {},
  isSignedin: false,
};

export const AuthContext = createContext(initialState);

export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer<any>(reducerUser, initialState);

  return (
    <AuthContext.Provider value={initialState}>{children}</AuthContext.Provider>
  );
};
