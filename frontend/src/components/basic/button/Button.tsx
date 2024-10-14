import { FC, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
}

const Button: FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  className,
  children,
  ...props
}) => {
  const baseStyles = "font-semibold rounded focus:outline-none focus:ring";
  const variantStyles = {
    primary:
      "bg-[#df545d] rounded-md hover:bg-[#e25c66]  text-white focus:ring-blue-300",
    secondary: "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-300",
  };

  const sizeStyles = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg",
  };

  const buttonStyles = clsx(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    {
      "opacity-50 cursor-not-allowed": props.disabled,
    },
    className
  );

  return (
    <button className={buttonStyles} {...props}>
      {children}
    </button>
  );
};

export default Button;
