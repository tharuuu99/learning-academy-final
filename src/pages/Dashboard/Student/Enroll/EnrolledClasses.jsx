import { Pagination, ThemeProvider, createTheme } from "@mui/material";

import {FadeLoader} from "react-spinners"
import { useUser } from "../../../../hooks/useUser";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 } from 'uuid';

function EnrolledClasses() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useUser();
  let itemPerPage = 2;
  const totalPage = Math.ceil(data.length / itemPerPage);
  const axiosSecure = useAxiosSecure();
  const theme = createTheme({
    palette: {
      primary: {
        main: "#ff0000", // Set the primary color
      },
      secondary: {
        main: "#00ff00", // Set the secondary color
      },
    },
  });

  useEffect(() => {
    axiosSecure
      .get(`/enrolled-classes/${currentUser.email}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  // Pagination
  useEffect(() => {
    let lastIndex = page * itemPerPage;
    let firstIndex = lastIndex - itemPerPage;

    // Adjust lastIndex if it exceeds the total number of items
    if (lastIndex > data.length) {
      lastIndex = data.length;
    }

    const currentData = data.slice(firstIndex, lastIndex);
    setPaginatedData(currentData);
  }, [page, totalPage]);

  const handleChange = (event, value) => setPage(value);
  if(loading){
    return <div className="flex items-center justify-center h-screen"><FadeLoader color="#F44336" size={50}/></div>
  }

  return (
    <div>
      <div className="my-10 text-center">
        <h1 className="text-2xl font-bold text-gray-700">Enrolled Classes</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {paginatedData.map((item) => (
          <div
            key={item.classes._id + v4()}
            className="flex flex-col items-center justify-around mx-3 overflow-hidden bg-white shadow-md h-96 rounded-3xl sm:flex-row sm:h-52 sm:w-3/5 md:w-96"
          >
            <img
              className="object-cover w-full h-1/2 sm:h-full sm:w-1/2"
              src={item.classes.Image}
              alt="image"
            />

            <div className="flex flex-col items-baseline justify-around flex-1 w-full pl-6 h-1/2 sm:h-full sm:items-baseline sm:w-1/2 ">
              <div className="flex flex-col items-baseline justify-start">
                <h1
                  title={item.classes.name}
                  className="mb-0 font-sans text-lg font-normal text-gray-600"
                >
                  {item.classes.name.length > 20
                    ? item.classes.name.slice(0, 20) + "..."
                    : item.classes.name}
                </h1>
                <span className="mt-0 text-xs text-indigo-300">
                  by{" "}
                  <span className="text-black">
                    {item.classes.instructorName}
                  </span>
                </span>
              </div>
              <p className="w-4/5 text-xs text-gray-500">
                {item.classes.description?.length > 100
                  ? item.classes.description.slice(0, 100) + "..."
                  : item.classes.description}
              </p>
              <div className="flex items-center justify-between w-full">
                <h1 className="font-bold text-gray-500">
                  LKR {item.classes.price}
                </h1>
                <Link to={`/class/${item.classes._id}`}>
                <button className="px-3 py-1 mr-5 font-bold text-white shadow-md bg-secondary rounded-xl">
                  View
                </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ThemeProvider theme={theme}>
        <div className="flex items-center justify-center w-full h-full my-10">
          <Pagination
            onChange={handleChange}
            count={totalPage}
            color="primary"
          />
        </div>
      </ThemeProvider>
      <div className="">
        <p className="text-center">
          Showing result{" "}
          <span className="font-bold text-secondary">
            {page} <span className="font-medium text-black">of</span>{" "}
            {totalPage}
          </span>
        </p>
      </div>
    </div>
  );
}

export default EnrolledClasses;
