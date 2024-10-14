import { FieldError, FieldValues, UseFormRegister , Path} from "react-hook-form";
import { z, ZodType } from "zod";

export type FormData = {
  email: string;
  password: string;
};

export const UserSchema: ZodType<FormData> = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Password must contain at least 1 letter" })
    .regex(/\d/, { message: "Password must contain at least 1 number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least 1 special character",
    }),
});



export type FormFieldProps<T extends FieldValues> = {
    type: string;
    placeholder: string;
    name: Path<T>; 
    register: UseFormRegister<T>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
  };

export type ValidFieldNames = "email" | "password";
