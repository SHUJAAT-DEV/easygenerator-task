import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      "Page not found"
      <button onClick={() => navigate("/")}>
        Back Home
      </button>
    </div>
  );
};

export default NotFoundPage;
