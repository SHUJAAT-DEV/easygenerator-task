import { FC } from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="text-sm text-red-500">
      {message}
    </div>
  );
};

export default ErrorMessage;
