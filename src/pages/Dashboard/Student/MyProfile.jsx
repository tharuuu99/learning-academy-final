import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useAuth } from "../../../hooks/useAuth";
import { useState } from "react";
import { useUser } from "../../../hooks/useUser";
import img from "../../../assets/dashboard/user.png";
const KEY = import.meta.env.VITE_IMG_TOKEN;

const MyProfile = () => {
  const API_URL = `https://api.imgbb.com/1/upload?key=${KEY}`;

  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();
  const [photoUrl, setPhoto] = useState(null);
  const { currentUser } = useUser();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // If a photo is uploaded, handle the upload to imgbb
    if (photoUrl) {
      const photoFormData = new FormData();
      photoFormData.append("image", photoUrl);

      try {
        const imgResponse = await fetch(API_URL, {
          method: "POST",
          body: photoFormData,
        });
        const imgData = await imgResponse.json();

        if (imgData.success) {
          // Append the uploaded image URL to form data
          formData.append("photoUrl", imgData.data.display_url);
        } else {
          alert("Image upload failed");
          return;
        }
      } catch (error) {
        console.error("Image upload error:", error);
        alert("Failed to upload the image");
        return;
      }
    }

    const updatedData = Object.fromEntries(formData);

    axiosSecure
      .put(`/update-profile/${currentUser?._id}`, updatedData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          alert("Updated successfully");
        }
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  return (
    <div>
      <h1 className="mt-5 text-4xl font-bold text-center">
        <span className="text-secondary">{user?.displayName}</span>
      </h1>

      <div>
        <img
          className="w-32 h-32 mx-auto rounded-full mt-7"
          src={currentUser?.photoUrl || `${img}`}
          alt=""
        />
      </div>

      <section className="">
        <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 lg:w-3/4 md:w-full xl:w-3/4">
          <div className="p-2 bg-white border rounded-lg shadow-lg lg:p-6 border-secondary">
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="pb-4 ml-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Your Name"
                    type="text"
                    required
                    defaultValue={currentUser?.name ? currentUser?.name : ""}
                    id="name"
                    name="name"
                  />
                </div>
                <div>
                  <label className="ml-2" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Phone Number"
                    required
                    type="tel"
                    id="phone"
                    defaultValue={currentUser?.phone ? currentUser?.phone : ""}
                    name="phone"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="ml-2" htmlFor="address">
                    Address
                  </label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Address"
                    required
                    defaultValue={currentUser?.address}
                    name="address"
                    type="text"
                  />
                </div>
                <div>
                  <label className="ml-2" htmlFor="photoUrl">
                    Upload Photo
                  </label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    name="photoUrl"
                    type="file"
                    required
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 ">
                <label htmlFor="gender" className="ml-2">
                  Gender
                </label>
                <div>
                  <select
                    required
                    defaultValue={currentUser?.gender}
                    name="gender"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  >
                    <option value="">Select Gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 ">
                <button
                  type="submit"
                  className="inline-block w-full px-5 py-3 font-medium text-white rounded-lg bg-secondary hover:bg-blue-800"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyProfile;
