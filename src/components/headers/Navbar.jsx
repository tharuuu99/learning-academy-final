import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Button, Switch } from "@mui/material";
import { motion } from "framer-motion";
import img from "../../assets/dashboard/user.png";
import { FaBars } from "react-icons/fa";
import { AuthContext } from "../../utilities/providers/AuthProvider";
import Swal from "sweetalert2";
import { useUser } from "../../hooks/useUser";

const navLinks = [
  { name: "Home", route: "/" },
  { name: "Instructors", route: "/instructors" },
  { name: "Classes", route: "/classes" },
];

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff0000",
    },
    secondary: {
      main: "#00ff00",
    },
  },
});

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [navBg, setNavBg] = useState("bg-[#15151580");
  const { logout, user } = useContext(AuthContext);
  const { currentUser } = useUser();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const darkClass = "dark";
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add(darkClass);
    } else {
      root.classList.remove(darkClass);
    }
  }, [isDarkMode]);

  useEffect(() => {
    setIsHome(location.pathname === "/");
    setIsLogin(location.pathname === "/login");
    setIsFixed(
      location.pathname === "/register" || location.pathname === "/login"
    );
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;
      setScrollPosition(currentPosition);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (scrollPosition > 100) {
      if (isHome) {
        setNavBg(
          "text-black bg-white bg-opacity-0 backdrop-filter backdrop-blur-xl dark:text-white"
        );
      } else {
        setNavBg("text-black bg-white dark:bg-black dark:text-white");
      }
    } else {
      setNavBg(
        `${
          isHome || location.pathname === "/"
            ? "bg-transparent"
            : "bg-white dark:bg-black"
        } text-white dark:text-white`
      );
    }
  }, [scrollPosition]);

  const handleLogout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
          .then(() => {
            Swal.fire({
              title: "Signed out",
              text: "Done",
              icon: "success",
            });
          })
          .catch((err) => {
            Swal.fire("Error!", err.message, "error");
          });
      }
    });
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`${
        isHome ? navBg : "bg-white dark:bg-black backdrop-blur-2xl"
      } ${
        isFixed ? "static" : "fixed"
      } top-0  transition-colors duration-500 ease-in-out w-full z-10`}
    >
      <div className="lg:w-[95%] mx-auto sm:px-6 lg:px-6">
        <div className="flex items-center justify-between px-4 py-4">
          {/* logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center flex-shrink-0 cursor-pointer pl-7 md:p-0"
          >
            <div>
              <h1 className="inline-flex items-center gap-3 text-2xl font-bold">
                Learning Academy{" "}
                <img src="/learning-logo.png" alt="" className="w-8 h-8" />
              </h1>
            </div>
          </div>
          {/* mobile menu icons */}

          <div className="flex items-center md:hidden lg:hidden">
            {/* Conditionally render the Login button instead of the hamburger menu */}
            {!user ? (
              <Link to="/login">
                <button
                  type="button"
                  className="text-gray-300 focus:outline-none hover:text-gray-800"
                >
                  <p className="text-white">Login</p>
                </button>
              </Link>
            ) : (
              <button
                type="button"
                onClick={toggleMobileMenu}
                className="text-gray-300 hover:text-white focus:outline-none"
              >
                <FaBars className="w-6 h-6 text-gray-300 hover:text-gray-800" />
              </button>
            )}
          </div>

          {isMobileMenuOpen && user && (
            <div className="absolute left-0 w-full text-white bg-gray-800 top-12 md:hidden lg:hidden">
              <ul className="flex flex-col items-center w-full">
                <div className="w-full text-center">
                  <Link to="/">
                    <li className="p-2 hover:bg-gray-700 ">Home</li>
                  </Link>
                </div>
                <div className="w-full text-center">
                  <Link to="/instructors">
                    <li className="p-2 hover:bg-gray-700">Instructors</li>
                  </Link>
                </div>
                <div className="w-full text-center">
                  <Link to="/classes">
                    <li className="p-2 hover:bg-gray-700">Classes</li>
                  </Link>
                </div>
                <div className="w-full text-center">
                  <Link to="/dashboard">
                    <li className="p-2 hover:bg-gray-700">Dashboard</li>
                  </Link>
                </div>
                <div className="w-full text-center">
                  <li className="p-2 hover:bg-gray-700">
                    <Button onClick={handleLogout}>
                      <p className="text-white">Logout</p>
                    </Button>
                  </li>
                </div>
              </ul>
            </div>
          )}

          {/* Navigational links */}
          <div className="hidden text-black md:block dark:text-white">
            <div className="flex">
              <ul className="flex items-center pr-4 ml-10 space-x-4">
                {navLinks.map((Link) => (
                  <li key={Link.route}>
                    <NavLink
                      to={Link.route}
                      style={{ whiteSpace: "nowrap" }} //This text will stay on one line and will not wrap.
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${
                                navBg.includes("bg-transparent")
                                  ? "text-white"
                                  : "text-black dark:text-white"
                              }`
                        } hover:text-secondary duration-300`
                      }
                    >
                      {Link.name}
                    </NavLink>
                  </li>
                ))}
                {/* based on users */}
                {user ? null : isLogin ? ( // like if else
                  <li>
                    <NavLink
                      to="/register"
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${
                                navBg.includes("bg-transparent")
                                  ? "text-white"
                                  : "text-black dark:text-white"
                              }`
                        } hover:text-secondary duration-300`
                      }
                    >
                      Register
                    </NavLink>
                  </li>
                ) : (
                  <li>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${
                                navBg.includes("bg-transparent")
                                  ? "text-white"
                                  : "text-black dark:text-white"
                              }`
                        } hover:text-secondary duration-300`
                      }
                    >
                      Login
                    </NavLink>
                  </li>
                )}

                {user && (
                  <li>
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${
                                navBg.includes("bg-transparent")
                                  ? "text-white"
                                  : "text-black dark:text-white"
                              }`
                        } hover:text-secondary duration-300`
                      }
                    >
                      Dashboard
                    </NavLink>
                  </li>
                )}

                {user && (
                  <li>
                    <Link to="dashboard/my-profile">
                      <img
                        src={currentUser?.photoUrl || `${img}`}
                        alt=""
                        className="h-[40px] rounded-full w-[40px]"
                      />
                    </Link>
                  </li>
                )}

                {user && (
                  <li>
                    <NavLink
                      onClick={handleLogout}
                      className={
                        "font-bold px-3 py-2 bg-secondary text-white rounded-xl"
                      }
                    >
                      Logout
                    </NavLink>
                  </li>
                )}

                {/* color toggle */}
                <li>
                  <ThemeProvider theme={theme}>
                    <div className="flex flex-col items-center justify-center">
                      <Switch onChange={() => setIsDarkMode(!isDarkMode)} />
                      <h1 className="text-[8px]">Light/Dark</h1>
                    </div>
                  </ThemeProvider>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
