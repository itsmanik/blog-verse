import { FaUserCircle } from "react-icons/fa";
import classes from "./Navbar.module.css";
import { Link } from "react-router";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import api from "../../utils/axios";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const FetchProfile = async () => {
    try {
      const response = await api.get("profile/");
      await setUsername(response.data.username);
      await setImgUrl(() => {
        return `https://avatar.iran.liara.run/username?username=${username}`;
      });
    } catch (error) {
      console.log("error.message");
    }
  };
  const context = useContext(AuthContext);
  if (context.isAuthenticated) FetchProfile()
  return (
    <>
      <nav className={classes.navbar}>
        {/* Logo */}
        <div className={classes["navbar-logo"]}>
          <Link to="/">BlogVerse</Link>
        </div>

        {/* Links container */}
        <div>
          {/* Links */}
          <ul className={classes["navbar-links"]}>
            <li>
              <Link to={"/blogs"}>Home</Link>
            </li>
            {context.isAuthenticated && (
              <>
                <li>
                  <Link to={"/create-blog"}>Create</Link>
                </li>
                <li>
                  <Link to={"/manage"}>Manage</Link>
                </li>
                <li>
                  <Link to={"/analytics"}>Analytics</Link>
                </li>
              </>
            )}
            {context.isAuthenticated ? (
              <li>
                <button
                  onClick={context.logout}
                  className={classes.logoutButton}
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link to={"/login"}>Log in</Link>
              </li>
            )}
            {/* User Icon */}
            {context.isAuthenticated && (
              <li className={classes["navbar-user-icon"]}>
                <img
                  alt=""
                  src={`${imgUrl}`}
                  className="object-cover w-8 h-8 rounded-full shadow bg-gray-500"
                />
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
