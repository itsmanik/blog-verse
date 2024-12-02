import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import api from "../utils/axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const context = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("token/", {
        username: username,
        password: password,
      });
      localStorage.setItem("authTokens", JSON.stringify(response.data));
      context.setIsAuthenticated(true);
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};
export default Login;
