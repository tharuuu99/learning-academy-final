import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";


import Instructors from "../pages/Instructors/Instructors";
import Classes from "../pages/Classes/Classes";
import Home from "../pages/Home/Home";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import SingleClasses from "../pages/Classes/SingleClasses";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import EnrolledClasses from "../pages/Dashboard/Student/Enroll/EnrolledClasses";
import SelectedClass from "../pages/Dashboard/Student/SelectedClass";
import MyPaymentHistory from "../pages/Dashboard/Student/Payment/History/MyPaymentHistory";
import AsInstructor from "../pages/Dashboard/Student/Apply/AsInstructor";
import Payment from "../pages/Dashboard/Student/Payment/Payment";
import StudentCP from "../pages/Dashboard/Student/StudentCP";
import CourseDetails from "../pages/Dashboard/Student/Enroll/CourseDetails";
import InstructorCP from "../pages/Dashboard/Instructor/InstructorCP";
import AddClass from "../pages/Dashboard/Instructor/AddClass";
import MyClasses from "../pages/Dashboard/Instructor/MyClasses";
import PendingCourse from "../pages/Dashboard/Instructor/PendingCourse";
import ApprovedCourse from "../pages/Dashboard/Instructor/ApprovedCourse";
import UpdateClass from "../pages/Dashboard/Instructor/UpdateClass";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import ManageClasses from "../pages/Dashboard/Admin/ManageClasses";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import UpdateUser from "../pages/Dashboard/Admin/UpdateUser";
import AdminApplications from "../pages/Dashboard/Admin/AdminApplications";
import MyProfile from "../pages/Dashboard/Student/MyProfile";



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children:[
      {
        path:"/",
        element:<Home/>
      }
      ,
      {
        path: "instructors",
        element:<Instructors/>
      },
      {
        path:"classes",
        element:<Classes/>
      },
      {
        path: "/login",
        element:<Login/>
      },
      {
        path: "/register",
        element:<Register/>
      },
      {
        path: "/class/:id",
        element:<SingleClasses/>,
        loader: ({ params }) => fetch(`https://learning-academy-server-production.up.railway.app/class/${params.id}`),
      }
    ]
  },

  {
    path: "/dashboard",
    element:<DashboardLayout/>,
    children:[
      {
        index: true,
        element: <Dashboard/>
      },

      //Student routes
      {
        path: "student-cp",
        element:<StudentCP/>
      },
      {
        path: "enrolled-class",
        element:<EnrolledClasses/>
      },
      {
        path: "my-selected",
        element:<SelectedClass/>
      },
      {
        path: "my-payments",
        element:<MyPaymentHistory/>
      },
      {
        path: "apply-instructor",
        element:<AsInstructor/>
      },
      {
        path: "user/payment",
        element:<Payment/>
      },
      {
        path: "course-details",
        element:<CourseDetails/>
      },
      {
        path: "my-profile",
        element:<MyProfile/>
      },

      //instructor Routs
      {
        path: "instructor-cp",
        element: <InstructorCP/> 
      },
      {
        path: "add-class",
        element: <AddClass/> 
      },
      {
        path: "my-classes",
        element: <MyClasses/> 
      },
      {
        path: "my-pending",
        element: <PendingCourse/> 
      },
      {
        path: "my-approved",
        element: <ApprovedCourse/> 
      },
      {
        path: 'update/:id',
        element: <UpdateClass />,
        loader: ({ params }) => fetch(`https://learning-academy-server-production.up.railway.app/class/${params.id}`)
    },
    {
      path: "my-profile",
      element:<MyProfile/>
    },
    //Admin Routes
    {
      path: "admin-home",
      element: <AdminHome/> 
    },
    {
      path: "manage-class",
      element: <ManageClasses/> 
    },
    {
      path: "manage-users",
      element: <ManageUsers/> 
    },
    {
      path: "update-user/:id",
      element: <UpdateUser/>,
      loader: ({ params }) => fetch(`https://learning-academy-server-production.up.railway.app/users/${params.id}`)
    },
    {
      path: "applications",
      element: <AdminApplications/> 
    },
    {
      path: "my-profile",
      element:<MyProfile/>
    },

    ]
  }
]);

export default router;