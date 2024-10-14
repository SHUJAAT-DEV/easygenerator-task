import { FormFieldProps } from "@/types";
import ErrorMessage from "../error/ErrorMessage";
import { FieldValues } from "react-hook-form";

const FormField = <T extends FieldValues>({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber = false,
}: FormFieldProps<T>) => (
  <>
    <input
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
      className={`w-full px-3 py-2 mt-1 border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-md focus:outline-none focus:ring`}
    />
    {error && <ErrorMessage message={error?.message || ""} />}
  </>
);

export default FormField;
