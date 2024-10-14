/* eslint-disable @typescript-eslint/naming-convention */
import { useMutation } from "@tanstack/react-query";
import { LoginParams, UserRegisterParams } from "@/interface/user/user.interface";
import { Auth } from "@/api/request";
import authUser from "@/utils/authUser";

const useAuth = () => {
  const {
    mutate: login,
    error: loginError,
    isPending,
    isError:loginHasError,
    isSuccess: loginSuccess,
  } = useMutation({
    mutationFn: async ({ email, password }: LoginParams) => {
       
      const response:any = await Auth.login({ email, password });
      const token_data: string =  response?.token
      console.log("login", response);
      authUser.setJWTToken(token_data)

      return token_data;
    },
    onError: (error) => {
      console.log("Login error:", error);
      // Here you can handle error logging or toast notifications
    },
  });

  const {
    mutate: signUp,
    error: signUpError,
    isPending: signUpIsPendding,
    isSuccess:signUpSuccess,
  } = useMutation({
    mutationFn: async ( user: UserRegisterParams) => {
       
      const response = await Auth.signup(user);

      return response;
    },
  });

  return {
    login,
    loginError,
    loginSuccess,
    isPending,
    loginHasError,

    signUp,
    signUpIsPendding,
    signUpError,
    signUpSuccess
  };
};

export default useAuth;
