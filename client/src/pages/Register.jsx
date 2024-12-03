import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../context/AuthContext";
import api from "../utils/axios";
import { Link } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const context = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("register/", {
        name: name,
        username: username,
        password: password,
      });
      if (response.status === 201) {
        context.setIsAuthenticated(true);
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid username or password."); // Incorrect credentials
      } else {
        setError("Something went wrong. Please try again later."); // General error
      }
    }
  };

  return (
    <div className="flex flex-col mt-8 max-w-sm m-auto px-8 py-6 rounded-md bg-[#3333] text-gray-800">
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold text-[#c9c9c9]">Sign Up</h1>
        <p className="text-sm dark:text-gray-600">Create a new account</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm text-[#c9c9c9]">
              Enter name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="w-full px-3 py-2 mb-4 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
            />
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
              Sign Up
            </button>
            {error && (
              <div className="text-red-500 mt-4 text-sm text-center">
                {error}
              </div>
            )}
          </div>
          <p className="px-6 text-sm text-center dark:text-gray-600">
            Already have an account?{" "}
            <Link
              rel="noopener noreferrer"
              to={"/login"}
              className="hover:underline text-secondaryColor"
            >
              Log In
            </Link>
            .
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
