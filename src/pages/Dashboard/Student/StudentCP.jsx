import { useUser } from "../../../hooks/useUser";
import WelcomeImg from "../../../assets/dashboard/WelcomeImg.jpg";

const StudentCP = () => {
  const { currentUser } = useUser();
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <div>
          <h1 className="text-3xl font-bold capitalize">
            Hi,{" "}
            <span className="items-stretch text-secondary">
              {currentUser?.name}!
            </span>{" "}
            Welcome to your dashboard
          </h1>
          <div>
            <img
              onContextMenu={(e) => e.preventDefault()}
              src={WelcomeImg}
              alt=""
              className="h-[400px]  mx-auto"
              placeholder="blur"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCP;
