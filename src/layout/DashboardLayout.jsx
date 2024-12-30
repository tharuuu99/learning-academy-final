import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useUser } from "../hooks/useUser";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BiHomeAlt, BiLogInCircle } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaUsers } from "react-icons/fa";
//import { IoMdDoneAll } from "react-icons/io";
import { BsFillPostcardFill } from "react-icons/bs";
//import { SiGoogleclassroom, SiInstructure } from "react-icons/si";
import { TbBrandAppleArcade } from "react-icons/tb";
import { MdExplore, MdOfflineBolt, MdPendingActions } from "react-icons/md";
import { GiFigurehead } from "react-icons/gi";
import { IoSchoolSharp } from "react-icons/io5";
import { IoMdDoneAll } from "react-icons/io";
import Scroll from "../hooks/useScroll";
import {FadeLoader} from "react-spinners"
import useWindowSize from "../hooks/useWindowSize";

const adminNavItems = [
  {
    to: "/dashboard/admin-home",
    icon: <BiHomeAlt className="text-2xl" />,
    label: "Dashboard Home"
  },
  {
    to: "/dashboard/manage-users",
    icon: <FaUsers className="text-2xl" />,
    label: "Manage Users"
  },
  {
    to: "/dashboard/manage-class",
    icon: <BsFillPostcardFill className="text-2xl" />,
    label: "Manage Class"
  },
  {
    to: "/dashboard/applications",
    icon: <TbBrandAppleArcade className="text-2xl" />,
    label: "Applications"
  },
  {
    to: "/dashboard/my-profile",
    icon: <CgProfile   className="text-2xl" />,
    label: "Profile",
  },
];

const instructorNavItems =[
  {
    to: "/dashboard/instructor-cp",
    icon: <BiHomeAlt className="text-2xl" />,
    label: "Dashboard",
  },
  {
    to: "/dashboard/add-class",
    icon: <MdExplore className="text-2xl" />,
    label: "Add a class",
  },
  {
    to: "/dashboard/my-classes",
    icon: <IoSchoolSharp  className="text-2xl" />,
    label: "My Classes",
  },
  {
    to: "/dashboard/my-pending",
    icon: <MdPendingActions className="text-2xl" />,
    label: "Pending Courses",
  },
  {
    to: "/dashboard/my-approved",
    icon: <IoMdDoneAll  className="text-2xl" />,
    label: "Approved CLasses",
  },
  {
    to: "/dashboard/my-profile",
    icon: <CgProfile  className="text-2xl" />,
    label: "Profile",
  },
]

const students = [
  {
    to: "/dashboard/student-cp",
    icon: <BiHomeAlt className="text-2xl" />,
    label: "Home"
  },
  {
    to: "/dashboard/enrolled-class",
    icon: <FaUsers className="text-2xl" />,
    label: "My Enroll"
  },
  {
    to: "/dashboard/my-selected",
    icon: <BsFillPostcardFill className="text-2xl" />,
    label: "My Selected"
  },
  {
    to: "/dashboard/my-payments",
    icon: <TbBrandAppleArcade className="text-2xl" />,
    label: "Payment History"
  },
  {
    to: "/dashboard/apply-instructor",
    icon: <TbBrandAppleArcade className="text-2xl" />,
    label: "Apply for Instructor"
  },
  {
    to: "/dashboard/my-profile",
    icon: <CgProfile  className="text-2xl" />,
    label: "Profile",
  },
];

const lastMenuItem = [
  {
    to: "/",
    icon: <BiHomeAlt className="text-2xl" />,
    label: "Main Home"
  },
  {
    to: "/trending",
    icon: <MdOfflineBolt className="text-2xl" />,
    label: "Trending"
  },
  {
    to: "/browse",
    icon: <GiFigurehead className="text-2xl" />,
    label: "Following"
  },
];

const DashboardLayout = () => {
  const { width } = useWindowSize();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (width < 768) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [width]);
  
  const { loader, logout } = useAuth();
  const { currentUser } = useUser();
  const navigate = useNavigate();
  const role = currentUser?.role;
  //console.log(role)
  
  
  const handleLogout = () => {
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
          .then(
            Swal.fire({
              title: "Signed out",
              text: "Done",
              icon: "success",
            })
          )
          .catch((error) => console.log(error));
      }
      navigate("/")
    });
  };

  

  if(loader){
    return <div className="flex items-center justify-center h-screen"><FadeLoader color="#F44336" size={50}/></div>
  }

  return (
    <div className="flex">
      

      <div
        className={`${
          open ? "w-60 overflow-y-auto" : "w-[90px]  overflow-auto"
        } bg-white h-screen p-5 md:block  pt-8 relative duration-300`}
      >
        <div className="flex items-center gap-x-4">
          <img
            onClick={() => setOpen(!open)}
            src="/learning-logo.png"
            alt=""
            className={`cursor-poniter h-[40px] duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <Link to="/">
            <h1
              onClick={() => setOpen(!open)}
              className={`text-dark-primary cursor-pointer font-bold origin-left text-l duration-200 ${
                !open && "scale-0"
              }`}
            >
              Learning Academy
            </h1>
          </Link>
        </div>

        {/* Navlinks */}

        {/* admin roles */}
        {role === "admin" && (
          <ul className="pt-6">
            <p className={`ml-3 text-gray-500   ${!open && "hidden"}`}>
              <small> MENU </small>
            </p>
            {role === "admin" &&
              adminNavItems.map((menuItem, index) => (
                <li key={index} className="mb-2">
                  <NavLink
                    to={menuItem.to}
                    className={({ isActive }) =>
                      `flex ${
                        isActive ? "bg-red-500 text-white " : "text-[#413F44]"
                      }duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`
                    }
                  >
                    {menuItem.icon}
                    <span
                      className={`${
                        !open && "hidden"
                      } origin-left duration-200`}
                    >
                      {menuItem.label}{" "}
                    </span>
                  </NavLink>
                </li>
              ))}
          </ul>
          
          
        )}

        {/* instructor roles */}
        {role === "instructor" && (
          <ul className="pt-6">
            <p className={`ml-3 text-gray-500 ${!open && "hidden"}`}>
              <small> MENU </small>
            </p>
            {role === "instructor" &&
              instructorNavItems.map((menuItem, index) => (
                <li key={index} className="mb-2">
                  <NavLink
                    to={menuItem.to}
                    className={({ isActive }) =>
                      `flex ${
                        isActive ? "bg-red-500 text-white " : "text-[#413F44]"
                      }duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`
                    }
                  >
                    {menuItem.icon}
                    <span
                      className={`${
                        !open && "hidden"
                      } origin-left duration-200`}
                    >
                      {menuItem.label}{" "}
                    </span>
                  </NavLink>
                </li>
              ))}
          </ul>
        )}

        {/* student roles */}
        {role === "user" && (
          <ul className="pt-6">
            <p className={`ml-3 text-gray-500 ${!open && "hidden"}`}>
              <small> MENU </small>
            </p>
            {role === "user" &&
              students.map((menuItem, index) => (
                <li key={index} className="mb-2">
                  <NavLink
                    to={menuItem.to}
                    className={({ isActive }) =>
                      `flex ${
                        isActive ? "bg-red-500 text-white " : "text-[#413F44]"
                      }duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`
                    }
                  >
                    {menuItem.icon}
                    <span
                      className={`${
                        !open && "hidden"
                      } origin-left duration-200`}
                    >
                      {menuItem.label}{" "}
                    </span>
                  </NavLink>
                </li>
              ))}
          </ul>
        )}

        <ul className="pt-6">
          <p
            className={`ml-3 text-gray-500  uppercase mb-3 ${
              !open && "hidden"
            }`}
          >
            <small> Useful links </small>
          </p>
          {lastMenuItem.map((menuItem, index) => (
            <li key={index} className="mb-2">
              <NavLink
                to={menuItem.to}
                className={({ isActive }) =>
                  `flex ${
                    isActive ? "bg-red-500 text-white " : "text-[#413F44]"
                  }duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`
                }
              >
                {menuItem.icon}
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {menuItem.label}{" "}
                </span>
              </NavLink>
            </li>
          ))}
          <li>
            <button
              onClick={() => handleLogout()}
              className="flex items-center p-2 text-sm font-bold duration-150 rounded-md cursor-pointer hover:bg-secondary hover:text-white gap-x-4"
            >
              <BiLogInCircle className="text-2xl" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Logout
              </span>
            </button>
          </li>
        </ul>
      </div>
      
      <div className="flex-1 h-screen px-8 overflow-y-auto ">
        <Scroll/>
        <Outlet/>
      </div>
    </div>
  );
};

export default DashboardLayout;
