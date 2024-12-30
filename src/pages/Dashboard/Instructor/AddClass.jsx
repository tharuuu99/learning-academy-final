
import { useUser } from '../../../hooks/useUser';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useState } from 'react';

const KEY = import.meta.env.VITE_IMG_TOKEN;

const AddClass = ()  => {
  const API_URL = `https://api.imgbb.com/1/upload?key=${KEY}`;
 

  const axiosSecure = useAxiosSecure();
  const { currentUser, isLoading } = useUser();
  const [Image, setImage] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    //console.log(formData);
    const newData = Object.fromEntries(formData);
    formData.append('image', Image);
    //console.log(newData);

    fetch(API_URL,{
      method: "POST",
      body: formData
    }).then((res) => res.json()).then((data) => {
      console.log(data);
      if(data.success === true){
        console.log(data.data.display_url);
        newData.Image = data.data.display_url;
        newData.instructorName = currentUser?.name;
        newData.instructorEmail = currentUser?.email;
        newData.status = 'pending';
        newData.submitted = new Date(); 
        newData.totalEnrolled = 0;
        axiosSecure.post(`/new-class`,newData).then(res=>{
          alert("Successfully added class!");
          console.log(res.data);
        })
      }
    });
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImage(file);
  };
  


  if(isLoading){
    return <div> Loading....</div>
  }
  
  return (
    <div className="">
        <div className="my-10">
            <h1 className='text-3xl font-bold text-center'>Add Your Class</h1>
        </div>


        <form onSubmit={handleFormSubmit} className="p-6 mx-auto bg-white rounded shadow ">
            <div className="grid w-full grid-cols-2 gap-3">
                <div className="mb-6">
                    <label className="block mb-2 font-bold text-gray-700" htmlFor="name">
                        Class name
                    </label>
                    <input
                        className="w-full px-4 py-2 border rounded-md border-secondary focus:outline-none focus:ring-blue-500"
                        type="text"
                        required
                        placeholder='Your Class Name'
                        name='name'
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="Image" className="font-bold">Thumbnail Photo</label>
                    <input
                        type="file"
                        required
                        onChange={handleImageChange}
                        name="Image"
                        className="block mt-[5px] w-full border border-secondary shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500    file:border-0 file:bg-secondary file:text-white file:mr-4 file:py-3 file:px-4 " />
                </div>
            </div>
            <div className="">
                <h1 className='text-[12px] my-2 ml-2 text-secondary'>You can not change your name or email</h1>
                <div className="grid grid-cols-2 gap-3">
                    <div className="mb-6">
                        <label className="block mb-2 font-bold text-gray-700" htmlFor="instructorName">
                            Instructor name
                        </label>
                        <input
                            className="w-full px-4 py-2 border rounded-md border-secondary focus:outline-none focus:ring-blue-500"
                            type="text"
                            value={currentUser?.name}
                            readOnly
                            disabled
                            placeholder='Instructor Name'
                            name='instructorName'
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 font-bold text-gray-700" htmlFor="instructorEmail">
                            Instructor email
                        </label>
                        <input
                            title='You can not update your email'
                            className="w-full px-4 py-2 border rounded-md border-secondary focus:outline-none focus:ring-blue-500"
                            type="email"
                            value={currentUser?.email}
                            disabled
                            readOnly
                            name='instructorEmail'
                        />
                    </div>
                </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
                <div className="mb-6">
                    <label className="block mb-2 font-bold text-gray-700" htmlFor="availableSeats">
                        Available seats
                    </label>
                    <input
                        className="w-full px-4 py-2 border rounded-md border-secondary focus:outline-none focus:ring-blue-500"
                        type="number"
                        required
                        placeholder='How many seats are available?'
                        name='availableSeats'
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 font-bold text-gray-700" htmlFor="price">
                        Price
                    </label>
                    <input
                        className="w-full px-4 py-2 border rounded-md border-secondary focus:outline-none focus:ring-blue-500"
                        type="number"
                        required
                        placeholder='How much does it cost?'
                        name='price'
                    />
                </div>
            </div>
            <div className="mb-6">
                <label className="block mb-2 font-bold text-gray-700" htmlFor="price">
                    Youtube Link
                </label>
                <p className='text-[12px] my-2 mt-2 text-secondary'>Only youtube videos are support</p>
                <input
                    required
                    className="w-full px-4 py-2 border rounded-md border-secondary focus:outline-none focus:ring-blue-500"
                    type="text"
                    placeholder='Your course intro video link'
                    name='videoLink'
                />
            </div>
            <div className="mb-6">
                <label className="block mb-2 font-bold text-gray-700" htmlFor="price">
                    Description About your course 
                </label>
                <textarea placeholder='Description about your course' name="description" className='w-full p-2 border rounded-lg outline-none resize-none border-secondary' rows="4"></textarea>
            </div>
            <div className="w-full text-center">
                <button
                    className="w-full px-4 py-2 font-bold text-white duration-200 rounded bg-secondary hover:bg-red-400"
                    type="submit"
                >
                    Add
                </button>
            </div>
        </form>
    </div>
);
}

export default AddClass
