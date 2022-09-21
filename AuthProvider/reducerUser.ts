import { InitialState } from "@react-navigation/native";
import { IAuthContext } from "./AuthProvider";
import { USER_SIGN_IN } from "./types";

interface UserAction {
  type: string;
  payload: object;
}

export const reducerUser = (state: InitialState, action: UserAction) => {
  switch (action.type) {
    case USER_SIGN_IN:
      return {
        ...state,
        isSignedin: true,
      };
  }
};
