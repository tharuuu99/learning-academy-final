import { useUser } from "../../hooks/useUser";
import {FadeLoader} from "react-spinners"
import DashboardNavigate from "../../routes/DashboardNavigate";

const Dashboard = () => {
  const {currentUser, isLoading} = useUser();
  const role = currentUser?.role;

  if(isLoading){
    return <div className="flex items-center justify-center h-screen"><FadeLoader color="#F44336" size={50}/></div>
  }
  return (
    <div>
      <DashboardNavigate/>
    </div>
  )
}

export default Dashboard
