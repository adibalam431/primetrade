import SkeletonCard from "../component/ui/SkeletonCard";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  

  return (
    <div className="p-10">
      <h1>Login Page</h1>
     
      
    </div>
  );
}

export default Login;