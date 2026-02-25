import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleFakeLogin = () => {
    login("fake-token", { name: "Test User" });
    navigate("/dashboard");
  };

  return (
    <div className="p-10">
      <h1>Login Page</h1>
      <button
        onClick={handleFakeLogin}
        className="mt-4 px-4 py-2 bg-blue-600 text-white"
      >
        Fake Login
      </button>
    </div>
  );
}

export default Login;