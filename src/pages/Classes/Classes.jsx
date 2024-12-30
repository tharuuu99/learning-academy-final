import { useEffect, useState } from "react";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import { Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const { currentUser } = useUser();
  console.log(currentUser);
  const role = currentUser?.role;
  //console.log("Current user: ", currentUser.email)
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [hoveredCard, setHoveredCard] = useState([null]);
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleHover = (index) => {
    setHoveredCard(index);
  };

  useEffect(() => {
    axiosFetch
      .get("/approved-classes")
      .then((res) => setClasses(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSelect = async (id) => {
    if (!currentUser) {
      alert("Please login first");
      return navigate("/login");
    }

    try {
      // Fetch enrolled classes and ensure the state is updated
      const res = await axiosSecure.get(
        `/enrolled-classes/${currentUser?.email}`
      );
      const fetchedEnrolledClasses = res.data;

      // Check if already enrolled
      if (fetchedEnrolledClasses.find((item) => item.classes._id === id)) {
        return alert("Already enrolled");
      }

      // Check if already selected
      const cartRes = await axiosSecure.get(
        `/cart-item/${id}?email=${currentUser?.email}`
      );
      if (cartRes.data.classId === id) {
        return alert("Already selected");
      }

      // Add to cart if not already enrolled or selected
      const data = {
        classId: id,
        userMail: currentUser?.email,
        date: new Date(),
      };
      const addRes = await axiosSecure.post("/add-to-cart", data);
      alert("Successfully added to the cart!");
      console.log(addRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="pt-3 mt-20">
        <h1 className="text-4xl font-bold text-center text-secondary">
          Classes
        </h1>
      </div>
      <div className="my-16 w-[90%] mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
        {classes.map((cls, index) => (
          <div
            onMouseLeave={() => handleHover(null)}
            key={index}
            className={`relative hover:-translate-y-2 duration-150 hover:ring-[2px] hover:ring-secondary w-64  mx-auto ${
              cls.availabeSeats < 1 ? "bg-red-300" : "bg-white"
            } dark:bg-slate-900 rounded-lg shadow-lg overflow-hidden cursor-pointer`}
            onMouseEnter={() => handleHover(index)}
          >
            <div className="relative h-48">
              {/* dynamic classname thats why curly brackets and self closing tags */}
              <div
                className={`absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ${
                  hoveredCard === index ? "opacity-60" : ""
                }`}
              />
              <img
                src={cls.Image}
                alt=""
                className="object-cover w-full h-full"
              />
              <Transition show={hoveredCard === index}>
                <div className="transition duration-300 ease-in data-[closed]:opacity-0">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => handleSelect(cls._id)}
                      title={
                        role == "admin" || role === "instructor"
                          ? "Instructor/Admin Cannot select classes"
                            ? cls.availableSeats < 1
                            : "No Seat Available"
                          : "You can select Classes"
                      }
                      disabled={
                        role === "admin" ||
                        role === "instructor" ||
                        cls.availableSeats < 1
                      }
                      className="px-4 py-2 text-white duration-300 rounded disabled:bg-red-300 bg-secondary hover:bg-red-700"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Transition>
            </div>
            {/* details */}
            <div className="px-6 py-2">
              <h3 className="mb-1 font-semibold text-black dark:text-white">
                {cls.name}
              </h3>
              <p className="text-xs text-gray-500 ">
                Instructor: {cls.instructorName}
              </p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-gray-600 ">
                  AvailableSeats: {cls.availableSeats}
                </span>
                <span className="font-semibold text-green-500">
                LKR {cls.price}
                </span>
              </div>
              <Link to={`/class/${cls._id}`}>
                <button className="w-full px-4 py-2 mx-auto mt-4 mb-2 text-white duration-300 rounded disabled:bg-red-300 bg-secondary hover:bg-red-700">
                  View
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
