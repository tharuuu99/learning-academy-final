import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useUser } from "../../../hooks/useUser";
import { Link, useNavigate } from "react-router-dom";
import { Fade, Slide } from "react-awesome-reveal";
import moment from "moment";
import Swal from "sweetalert2";

const MyClasses = () => {
  const [classes, setClasses] = useState([]);
  const { currentUser, isLoading } = useUser();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/classes/${currentUser?.email}`)
      .then((res) => setClasses(res.data))
      .catch((err) => console.log(err));
  }, [isLoading]);

  const handleFeedback = (id) => {
    const theClass = classes.find((cls) => cls._id === id);
    if (theClass.reason) {
      Swal.fire("Feedback", theClass.reason, "info");
    } else {
      Swal.fire(
        "No Feedback Available",
        "There is no feedback for this class.",
        "info"
      );
    }
  };

  return (
    <div>
      <div className="my-9">
        <h1 className="text-4xl font-bold text-center text-black">
          My Classes
        </h1>
        <div className="text-center">
          <Fade
            duration={100}
            className="text-[10px]  text-center md:text-[12px] lg:text-[12px] xl:text-[12px] 2xl:text-[12px]"
            cascade
          >
            Here you can see how many classes added by you and all classes
            status
          </Fade>
        </div>

        <div className="">
          {classes.length === 0 ? (
            <div className="mt-10 text-2xl font-bold text-center">
              You have not added any class yet
            </div>
          ) : (
            <div className="mt-9 ">
              {classes.map((cls, index) => (
                <Slide
                  duration={1000}
                  key={index}
                  className="mb-5 duration-200 rounded-lg hover:ring ring-secondary focus:ring"
                >
                  <div className="gap-8 p-4 text-xs bg-white rounded-lg shadow md:flex lg:flex xl:flex 2xl:flex sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-base">
                    <div className="">
                      <img
                        className="lg:max-h-[200px] lg:max-w-[300px] sm:max-h-[100px] sm:max-w-[200px] "
                        src={cls.Image}
                        alt=""
                      />
                    </div>
                    <div className="w-full mt-4 md:mt-0 lg:mt-0 xl:mt-0 2xl-mt-0">
                      <h1 className="text-[21px] font-bold text-secondary border-b pb-2 mb-2 leading-tight">
                        {cls.name}
                      </h1>
                      <div className="flex gap-5">
                        <div className="">
                          <h1 className="mb-3 font-bold">Some Info : </h1>
                          <h1 className="my-2 text-secondary">
                            <span className="text-black ">Total Student</span> :{" "}
                            {cls.totalEnrolled ? cls.totalEnrolled : 0}
                          </h1>
                          <h1 className="text-secondary">
                            <span className="text-black ">Total Seats</span> :{" "}
                            {cls.availableSeats}
                          </h1>
                          <h1 className="my-2 text-secondary">
                            <span className="text-black ">Status</span> :{" "}
                            <span
                              className={`font-bold ${
                                cls.status === "pending"
                                  ? "text-orange-400"
                                  : cls.status === "checking"
                                  ? "text-yellow-300"
                                  : cls.status === "approved"
                                  ? "text-green-500"
                                  : "text-red-600"
                              }`}
                            >
                              {cls.status}
                            </span>
                          </h1>
                        </div>
                        <div className="">
                          <h1 className="mb-3 font-bold">.....</h1>
                          <h1 className="my-2 text-secondary">
                            <span className="text-black ">Price</span> :{" "}
                            <span className="text-black">LKR </span>
                            {cls.price}
                          </h1>
                          <h1 className="my-2 text-secondary">
                            <span className="text-black ">Submitted</span> :{" "}
                            <span className="">
                              {cls.submitted
                                ? moment(cls.submitted).format("MMMM Do YYYY")
                                : "Not Get Data"}
                            </span>
                          </h1>
                        </div>
                        <div className="w-1/3">
                          <h1 className="mb-3 font-bold">Action : </h1>
                          <button
                            onClick={() => handleFeedback(cls._id)}
                            className="w-full px-3 py-1 font-bold text-white bg-orange-400 rounded-lg"
                          >
                            View Feedback
                          </button>
                          <Link to={`/class/${cls._id}`}>
                            <button className="w-full px-3 py-1 my-3 font-bold text-white bg-green-500 rounded-lg">
                              View Details
                            </button>
                          </Link>
                          <button
                            className="w-full px-3 py-1 font-bold text-white rounded-lg bg-secondary"
                            onClick={() =>
                              navigate(`/dashboard/update/${cls._id}`)
                            }
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Slide>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyClasses;
