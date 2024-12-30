import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import { FcDeleteDatabase } from 'react-icons/fc';
import { GrUpdate } from 'react-icons/gr';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Pagination, ThemeProvider, createTheme } from '@mui/material';

const ManageClasses = () => {
    const navigate = useNavigate();
    const axiosFetch = useAxiosFetch();
    const axiosSecure = useAxiosSecure();
    const [classes, setClasses] = useState([]); 
    const [page, setPage] = useState(1);
    const [paginatedData, setPaginatedData] = useState([]);
    const itemPerPage = 5;
    const totalPage = Math.ceil(classes.length / 5);


    useEffect(() => {
        axiosFetch.get('/classes-manage')
            .then(res => setClasses(res.data))
            .catch(err => console.log(err))
    }, [])

    useEffect(()=>{
        let lastIndex = page * itemPerPage;
        const firstIndex = lastIndex - itemPerPage;
        if (lastIndex > classes.length) {
            lastIndex = classes.length;
        }
        const currentData = classes.slice(firstIndex, lastIndex);
        setPaginatedData(currentData);
    },[page,totalPage])


    const theme = createTheme({
        palette: {
            primary: {
                main: '#ff0000', // Set the primary color
            },
            secondary: {
                main: '#00ff00', // Set the secondary color
            },
        },
    });


    const handleApprove = (id) => {
        axiosSecure.put(`/change-status/${id}`, { status: 'approved' })
            .then(res => {
                console.log(res.data)
                alert("Course Approved successfully!")
                const approveClass = classes.map(cls => cls._id == id ? { ...cls, status: 'approved' } : cls)
                setClasses(approveClass)
            })
            .catch(err => console.log(err))
    }
    const handleReject = (id) => {
        Swal.fire({
            title: 'Reason for reject',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Reject',
            showLoaderOnConfirm: true,
            preConfirm: async (text) => {
                try {
                    const res = await axiosSecure.put(`/change-status/${id}`, { status: 'rejected', reason: text })
                    if (res.data.modifiedCount > 0) {
                      const rejectClass =  classes.map(cls => cls._id == id ? { ...cls, status: 'rejected' } : cls) 
                      setClasses(rejectClass)
                    }
                    return res.data
                } catch (error) {
                    Swal.showValidationMessage(
                        `Request failed: ${error}`
                    )
                }

            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Changed..!',
                    'You reject this class.',
                    'success'
                )
            }
        })
    }

    const handleFeedback = (id) => {
      Swal.fire({
          title: 'Feedback',
          input: 'text',
          inputAttributes: {
              autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'Send',
          showLoaderOnConfirm: true,
          preConfirm: async (text) => {
              try {
                  // Send only the reason without modifying the status
                  const res = await axiosSecure.put(`/change-reason/${id}`, { reason: text });
                  if (res.data.modifiedCount > 0) {
                      // Update the reason in the frontend state
                      const updatedClasses = classes.map(cls => 
                          cls._id === id ? { ...cls, reason: text } : cls
                      );
                      setClasses(updatedClasses);
                  }
                  return res.data;
              } catch (error) {
                  Swal.showValidationMessage(
                      `Request failed: ${error}`
                  );
              }
          },
          allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
          if (result.isConfirmed) {
              Swal.fire(
                  'Updated!',
                  'Feedback has been submitted successfully.',
                  'success'
              );
          }
      });
  };
  

    
    const handleChange = (event, value) => setPage(value);
    return (
        <div>
            <h1 className='my-10 text-4xl font-bold text-center text-black'>Manage Classes</h1>


            <div className="">

                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-sm font-light text-left">
                                    <thead className="font-medium border-b dark:border-neutral-500">
                                        <tr>
                                            <th scope="col" className="px-6 py-4">PHOTO</th>
                                            <th scope="col" className="px-6 py-4">COURSE NAME</th>
                                            <th scope="col" className="px-6 py-4">INSTRUCTOR NAME</th>
                                            <th scope="col" className="px-6 py-4">STATUS</th>
                                            <th scope="col" className="px-6 py-4">DETAILS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            classes.length == 0 ? <tr><td colSpan='6' className='text-2xl font-bold text-center'>No Classes Found</td></tr> :
                                                paginatedData.map((cls, idx) => <tr
                                                    key={cls._id}
                                                    className="transition duration-300 ease-in-out border-b hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <img src={cls.Image} className='h-[35px] w-[35px]' alt="" />
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-pre-wrap">{cls.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{cls.instructorName}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`font-bold ${cls.status === 'pending' ? 'bg-orange-400' : cls.status === 'checking' ? 'bg-yellow-500' : cls.status === 'approved' ? 'bg-green-600' : 'bg-red-600'} px-2 py-1 uppercase text-white rounded-xl`}>{cls.status}</span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex gap-2">
                                                            {
                                                                <button
                                                                    onClick={() => handleApprove(cls._id)}
                                                                    className='text-[12px]  cursor-auto disabled:bg-green-700 bg-green-500 py-1 rounded-md px-2 text-white'>
                                                                    Approve
                                                                </button>
                                                            }
                                                            {

                                                                <button
                                                                    disabled={cls.status === 'rejected' || cls.status === 'checking'}
                                                                    onClick={() => handleReject(cls._id)}
                                                                    className='px-2 py-1 text-white bg-red-600 rounded-md cursor-pointer disabled:bg-red-800'>
                                                                    Deny
                                                                </button>
                                                            }
                                                            {

                                                                <button
                                                                    disabled={cls.status === 'rejected' || cls.status === 'checking'}
                                                                    onClick={() => handleFeedback(cls._id)}
                                                                    className='px-2 py-1 text-white rounded-md cursor-pointer bg-secondary '>
                                                                    Feedback
                                                                </button>
                                                            }


                                                        </div>
                                                    </td>

                                                </tr>)
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <ThemeProvider theme={theme}>
                    <div className="flex items-center justify-center w-full h-full my-10">
                        <Pagination onChange={handleChange} count={totalPage} color="primary" />
                    </div>
                </ThemeProvider>
            </div>
        </div>
    );
};

export default ManageClasses;