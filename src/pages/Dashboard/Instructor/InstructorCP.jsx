import WelcomeImg from "../../../assets/dashboard/WelcomeImg.jpg"
import { useAuth } from "../../../hooks/useAuth";
import { Fade } from "react-awesome-reveal";

const InstructorCP = () => {
  const { user } = useAuth();
  return (
    <div>
      <div className="h-screen my-8">
      <Fade delay={1e3} cascade damping={1e-1}>
                <h1 className='my-0 text-4xl font-bold text-center'>Welcome <span className='text-secondary'>{user?.displayName}</span></h1>
            </Fade>
        <img src={WelcomeImg} alt=""  className="mx-auto md:w-3/4"/>
      </div>
    </div>
  );
}

export default InstructorCP;
