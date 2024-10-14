
export type Role = "Admin" | "Staf";

export interface LoginParams {
  email: string;
  password: string;
}


export interface UserRegisterParams {
  email: string;
  password: string;
  name: string;
}

