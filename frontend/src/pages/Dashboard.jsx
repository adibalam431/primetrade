import axiosInstance from "../api/axios";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { login } = useAuth();

  const testLogin = () => {
    login("test-token", { name: "Adib" });
  };

  const testRequest = async () => {
    try {
      await axiosInstance.get("/test");
    } catch (err) {
      console.log("Request sent with token");
    }
  };

  return (
    <div className="p-10">
      <button onClick={testLogin}>Set Token</button>
      <button onClick={testRequest}>Send Request</button>
    </div>
  );
}
export default Dashboard;