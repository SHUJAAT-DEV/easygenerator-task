import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.svg";
import Button from "@/components/basic/button/Button";
import useAuth from "./hooks/useAuth";
import ErrorMessage from "@/components/basic/error/ErrorMessage";

const signupSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  name: z.string().min(2, { message: "Name is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Password must contain at least 1 letter" })
    .regex(/\d/, { message: "Password must contain at least 1 number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least 1 special character",
    }),
});

type SignUpFormData = z.infer<typeof signupSchema>;

const SignUp: FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
  });

  const { signUp, signUpIsPendding, signUpError, signUpSuccess } = useAuth();
  const onSubmit = (data: SignUpFormData) => {
    signUp(data);
  };

  useEffect(() => {
    if (signUpSuccess) {
      navigate("/login");
    }
  }, [signUpSuccess, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-500 via-red-400 to-red-500">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center">
          <img src={logo} alt="Logo" className="w-24 h-24" />
        </div>
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Sign Up
        </h2>
        {signUpError && (
          <ErrorMessage
            message={
              signUpError?.response?.data?.message || signUpError?.message
            }
          />
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className={`w-full px-3 py-2 mt-1 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-[#df545d] focus:border-[#df545d]`}
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`w-full px-3 py-2 mt-1 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-[#df545d] focus:border-[#df545d]`}
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`w-full px-3 py-2 mt-1 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-[#df545d] focus:border-[#df545d]`}
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <Button
              disabled={signUpIsPendding}
              type="submit"
              className="w-full px-4 py-2 text-white bg-[#df545d] rounded-md hover:bg-[#e25c66] focus:outline-none focus:ring-4 focus:ring-[#df545d] focus:ring-opacity-50"
            >
              Sign Up
            </Button>
          </div>
        </form>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <a
            href="#"
            className="text-[#df545d] hover:underline"
            onClick={() => navigate("/login")}
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
