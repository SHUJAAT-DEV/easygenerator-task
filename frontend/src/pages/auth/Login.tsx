import logo from "@/assets/logo.svg"; // Ensure you have the correct path to the logo
import Button from "@/components/basic/button/Button";
import ErrorMessage from "@/components/basic/error/ErrorMessage";
import FormField from "@/components/basic/input/FormField";
import { FormData, UserSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const SignIn: FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(UserSchema),
    mode: "onChange",
  });
  const { login, loginError, isPending, loginSuccess } =
    useAuth();

  const onSubmit = (data: FormData) => {
    login(data);
  };
  useEffect(() => {
    if (loginSuccess) {
      navigate("/home");
    }
  }, [loginSuccess, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-500 via-red-400 to-red-500">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center">
          <img src={logo} alt="Logo" className="w-24 h-24" />
        </div>
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Sign In
        </h2>
        {loginError && (
          <ErrorMessage
            message={loginError?.response?.data?.message || loginError?.message}
          />
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <FormField
              type="email"
              placeholder="Enter your email"
              name="email"
              register={register}
              error={errors.email}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <FormField
              type="password"
              placeholder="Enter your password"
              name="password"
              register={register}
              error={errors.password}
            />
          </div>

          <div>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full px-4 py-2 text-white bg-[#df545d] rounded-md hover:bg-[#e25c66] focus:outline-none focus:ring-4 focus:ring-[#df545d] focus:ring-opacity-50"
            >
              Sign In
            </Button>
          </div>
        </form>

        <p className="text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <a
            href="#"
            className="text-[#df545d] hover:underline"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
