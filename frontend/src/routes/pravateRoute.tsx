import { FC } from "react";
import { RouteProps, useNavigate, useLocation } from "react-router-dom";
import authUser from "@/utils/authUser";
import Button from "@/components/basic/button/Button";

const PrivateRoute: FC<RouteProps> = (props) => {
  const logged = authUser.getJWTToken();
  const navigate = useNavigate();
  const location = useLocation();
 console.log("logged", logged)
  return logged ? (
    props.element
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-xl font-semibold text-gray-700">
        You need to be logged in to access this page.
      </h2>
      <p className="text-gray-500">
        Please log in to continue. You will be redirected to the requested page
        after login.
      </p>
      <Button
        className="mt-4 px-6 py-2 bg-[#df545d] hover:bg-[#e25c66]  text-white rounded-lg focus:outline-none"
        onClick={() =>
          navigate(`/login?from=${encodeURIComponent(location.pathname)}`, {
            replace: true,
          })
        }
      >
        Go to Login
      </Button>
    </div>
  );
};

export default PrivateRoute;
