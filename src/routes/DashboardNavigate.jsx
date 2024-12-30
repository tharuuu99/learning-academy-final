import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";


const DashboardNavigate = () => {
    const {currentUser, isLoading} = useUser();
    const role = currentUser?.role;

  if(isLoading){
    return <div className="flex items-center justify-center h-screen"><FadeLoader color="#F44336" size={50}/></div>
  }

  if(role === 'admin') return <Navigate to="/dashboard/admin-home" replace/>
  if(role === 'instructor') return <Navigate to="/dashboard/instructor-cp" replace/> 
 if(role === 'user') return <Navigate to="/dashboard/student-cp" replace/>
}

export default DashboardNavigate;
