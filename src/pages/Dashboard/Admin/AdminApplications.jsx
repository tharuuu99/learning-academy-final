import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import { FcDeleteDatabase } from "react-icons/fc";
import { GrUpdate } from "react-icons/gr";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Pagination, ThemeProvider, createTheme } from "@mui/material";

const AdminApplications = () => {
  const navigate = useNavigate();
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const [classes, setClasses] = useState([]);
  const [page, setPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const itemPerPage = 5;

  useEffect(() => {
    axiosFetch
      .get("/applied-instructors")
      .then((res) => {
        console.log(res.data); // Verify the response
        setClasses(res.data);
      })
      .catch((err) => console.log(err));
  }, []); // Fetch only once when the component mounts

  useEffect(() => {
    if (classes.length > 0) {
      let lastIndex = page * itemPerPage;
      const firstIndex = lastIndex - itemPerPage;
      if (lastIndex > classes.length) {
        lastIndex = classes.length;
      }
      const currentData = classes.slice(firstIndex, lastIndex);
      setPaginatedData(currentData);
    }
  }, [page, classes]); // Ensure `classes` is updated before pagination

  const totalPage = Math.ceil(classes.length / itemPerPage); // Dynamically calculate total pages based on the length of classes

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

  const handleChange = (event, value) => setPage(value);

  const handleUpdate = async (email, id) => {
    try {
        const updatedRole = 'instructor'; // Set the role to 'instructor'

        // Send a PUT request to update the user's role in the 'users' collection
        const response = await axiosSecure.put(`/change-role/${email}`, {
            role: updatedRole,
        });

        if (response.data.success) {
            // Success message
            alert("The user has been updated to instructor.");

            // Update the frontend state to reflect the new role
            setClasses(
                classes.map((cls) =>
                    cls.email === email ? { ...cls, role: updatedRole } : cls
                )
            );

            // Send DELETE request to remove the data from the applied collection
            const deleteResponse = await axiosSecure.delete(`/delete-application/${id}`);

            if (deleteResponse.data.success) {
                // Successfully deleted the application
                setClasses(classes.filter((cls) => cls._id !== id));
                //alert("The application has been deleted.");
            } else {
                // Handle the error if delete fails
                //alert("Failed to delete the application.");
            }
        }
    } catch (error) {
        console.error("Error updating role:", error);
        alert("Failed to update the role.");
    }
};



  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Send DELETE request to remove the data from the applied collection
          const response = await axiosSecure.delete(
            `/delete-application/${id}`
          );

          if (response.data.success) {
            // Show success alert after successful deletion
            Swal.fire({
              title: "Deleted!",
              text: "The application has been deleted.",
              icon: "success",
            });

            // Remove the deleted item from the frontend state
            setClasses(classes.filter((cls) => cls._id !== id));
          } else {
            // Show error alert if deletion fails
            Swal.fire({
              title: "Error!",
              text: "There was an issue deleting the application.",
              icon: "error",
            });
          }
        } catch (error) {
          console.error("Error deleting application:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the application.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div>
      <h1 className="my-10 text-4xl font-bold text-center text-black">
        Applications
      </h1>

      <div className="">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-sm font-light text-left">
                  <thead className="font-medium border-b dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        NAME
                      </th>
                      <th scope="col" className="px-6 py-4">
                        EMAIL
                      </th>
                      <th scope="col" className="px-6 py-4">
                        EXPERIENCE
                      </th>
                      <th scope="col" className="px-6 py-4">
                        UPDATE
                      </th>
                      <th scope="col" className="px-6 py-4">
                        DELETE
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes.length === 0 ? (
                      <tr>
                        <td
                          colSpan="6"
                          className="text-2xl font-bold text-center"
                        >
                          No Applications Found
                        </td>
                      </tr>
                    ) : (
                      paginatedData.map((cls) => (
                        <tr
                          key={cls._id}
                          className="transition duration-300 ease-in-out border-b hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                        >
                          <td className="px-6 py-4 whitespace-pre-wrap">
                            {cls.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {cls.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {cls.experience}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              onClick={() => handleUpdate(cls.email,cls._id)} // Pass cls.email instead of cls._id
                              className="inline-flex items-center gap-2 px-2 py-1 text-white bg-green-500 rounded-md cursor-pointer"
                            >
                              Update <GrUpdate className="text-white" />
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              onClick={() => handleDelete(cls._id)}
                              className="inline-flex items-center gap-2 px-2 py-1 text-white bg-red-600 rounded-md cursor-pointer"
                            >
                              Delete <FcDeleteDatabase />
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
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
      </div>
    </div>
  );
};

export default AdminApplications;
