import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../context/AuthContext";
import api from "../utils/axios";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages

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
      navigate("/");
    } catch (error) {
      // Handle specific error types
      if (error.response && error.response.status === 401) {
        setError("Invalid username or password."); // Incorrect credentials
      } else {
        setError("Something went wrong. Please try again later."); // General error
      }
    }
  };

  return (
    <div className="flex flex-col mt-12 max-w-sm m-auto p-8 rounded-md bg-[#3333] text-gray-800">
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold text-[#c9c9c9]">Login</h1>
        <p className="text-sm dark:text-gray-600">
          Log in to access your account
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm text-[#c9c9c9]"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
            />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="password" className="text-sm text-[#c9c9c9]">
                Password
              </label>
              <a
                rel="noopener noreferrer"
                href="#"
                className="text-xs hover:underline dark:text-gray-600"
              >
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="*****"
              className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <div>
            <button
              type="submit"
              className="w-full px-8 py-3 font-semibold rounded-md bg-primaryColor dark:text-gray-50"
            >
              Log In
            </button>
            {error && (
          <div className="text-red-500 mt-4 text-sm text-center">{error}</div>
        )}  
          </div>
          <p className="px-6 text-sm text-center dark:text-gray-600">
            Don't have an account yet?{" "}
            <a
              rel="noopener noreferrer"
              href="#"
              className="hover:underline text-secondaryColor"
            >
              Sign up
            </a>
            .
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
