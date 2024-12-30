import { useEffect, useState } from "react";
import img from "../../assets/home/girl.jpg";
import useAxiosFetch from "../../hooks/useAxiosFetch";


const Instructors = () => {
  const [instructors, setInstructors] = useState([]);
  const axiosFetch= useAxiosFetch();

  useEffect(()=>{
    axiosFetch.get('/instructors').then((data)=>{
        setInstructors(data.data)
    }).catch((err) => {console.log(err)}) 
  },[])

  console.log(instructors)

  return (
    <div className='md:w-[80%] mx-auto my-36'>
      <div>
        <h1 className='text-5xl font-bold text-center dark:text-white text-secondary'> Teachers</h1>
        <div className='w-[40%] text-center mx-auto my-4'>
          
        </div>
      </div>
      
       {
        instructors ? <>
        <div className="grid gap-4 mx-auto mb-28 md:grid-cols-2 lg:grid-cols-3 w-[90%] mt-20">
            {
                instructors?.map((instructor, i) =>(
                    <div key={i} className="flex flex-col px-8 py-8 duration-200 border rounded-md shadow-md cursor-pointer dark:text-white hover:-translate-y-2 hover:border-gray-500">
                        <div className="flex flex-col gap-6 md:gap-8">
                            <img className="w-24 h-24 mx-auto border-4 border-gray-300 rounded-full" src={instructor.photoUrl  || `${img}` } alt="" />

                            <div className="flex flex-col text-center">
                                <p className="text-lg font-medium text-gray-800 dark:text-white">{instructor?.name}</p>
                                <p className="text-gray-500"> Instructor </p>
                                <p className="mb-4 text-gray-500 ">Address:{instructor?.address}</p>
                                <p className="mb-4 text-gray-500 ">Phone:{instructor?.phone}</p>
                                <p className="mb-4 text-gray-500 ">Email:{instructor?.email}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
        </> : <> <p>No instructor available</p></>
       }
      </div>
  );
};

export default Instructors;
