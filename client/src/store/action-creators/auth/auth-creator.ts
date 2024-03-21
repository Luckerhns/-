import { AxiosError } from "axios";
import { login, registration } from "../../../http/userApi";
import getErrorByStatus from "../../../utils/functions";
import { AppDispatch } from "./../../store";
import {
  AuthActionsEnum,
  IUser,
  SetAuthAction,
  SetErrorAction,
  SetIsLoadingAction,
  SetUserAction,
} from "./auth";

export const AuthActionCreators = {
  setIsAuth: (auth: boolean): SetAuthAction => ({
    type: AuthActionsEnum.SET_AUTH,
    payload: auth,
  }),
  setError: (error: string): SetErrorAction => ({
    type: AuthActionsEnum.SET_ERROR,
    payload: error,
  }),
  setUser: (user: IUser): SetUserAction => ({
    type: AuthActionsEnum.SET_USER,
    payload: user,
  }),
  setIsLoading: (isLoading: boolean): SetIsLoadingAction => ({
    type: AuthActionsEnum.SET_IS_LOADING,
    payload: isLoading,
  }),
  registration:
    (
      email: string,
      password: string,
      firstname: string,
      lastname: string,
      patronymic: string
    ) =>
    async (dispatch: AppDispatch) => {
      try {
        dispatch(AuthActionCreators.setIsLoading(true));
        setTimeout(async () => {
          try {
            const data = await registration({
              email,
              password,
              firstname,
              lastname,
              patronymic,
            });
            dispatch(AuthActionCreators.setIsAuth(true));
            localStorage.setItem("isAuth", "true");
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", (data.tokens.accessToken));
            window.location.reload();
            window.location.pathname = "/";
            console.log(data);
          } catch (error: any) {
            console.log("Error in registration", error);
          }
        });
      } catch (error) {
        dispatch(AuthActionCreators.setError("Некорректные данные"));
      }
    },

  login: (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true));
      setTimeout(async () => {
        try {
          const data = await login({ email, password });
          console.log(data.tokens.accessToken);
          dispatch(AuthActionCreators.setIsAuth(true));
          localStorage.setItem("isAuth", "true");
          localStorage.setItem("token", data.tokens.accessToken);
          localStorage.setItem("user", JSON.stringify(data.user));
          // window.location.reload();
          // window.location.pathname = "/";
          console.log(data);
        } catch (error: any) {
          dispatch(AuthActionCreators.setError(error.message));
        }
      });
    } catch (error) {
      dispatch(AuthActionCreators.setError("Некорректные данные"));
    }
  },
};
