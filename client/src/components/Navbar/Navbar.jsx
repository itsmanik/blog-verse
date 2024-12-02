import { FaUserCircle } from "react-icons/fa";
import classes from "./Navbar.module.css";
import { Link } from "react-router";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const Navbar = () => {
  const context = useContext(AuthContext);
  return (
    <>
      <nav className={classes.navbar}>
        {/* Logo */}
        <div className={classes["navbar-logo"]}>
          <a href="/">BlogVerse</a>
        </div>

        {/* Links container */}
        <div>
          {/* Links */}
          <ul className={classes["navbar-links"]}>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            {context.isAuthenticated && (
              <li>
                <Link to={"/dashboard"}>Dashboard</Link>
              </li>
            )}
            <li>
              <Link to={"/about"}>About</Link>
            </li>
            <li>
              <Link to={"/contact"}>Contact</Link>
            </li>
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
                  src={`https://avatar.iran.liara.run/username?username=manik`}
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
