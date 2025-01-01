import { useEffect, useState } from 'react';
import { useTitle } from '../../../hooks/useTitle';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useUser } from '../../../hooks/useUser';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { MdDeleteSweep } from 'react-icons/md';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { Pagination, ThemeProvider, createTheme } from '@mui/material';
import { FadeLoader } from 'react-spinners';

const SelectedClass = () => {
    useTitle('Selected Class | Yoga Master Selected Class');
    const { currentUser } = useUser();
    const [loading, setLoading] = useState(true);
    const [classes, setClasses] = useState([]);
    const [paginatedData, setPaginatedData] = useState([]);
    const [page, setPage] = useState(1);
    const itemPerPage = 5;
    const totalPage = Math.ceil(classes.length / itemPerPage);
    const navigate = useNavigate();

    const axiosSecure = useAxiosSecure();

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

    useEffect(() => {
        axiosSecure.get(`/cart/${currentUser?.email}`)
            .then((res) => {
                setClasses(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }, [currentUser?.email])

    const handleChange = (event, value) => {
        setPage(value);
    }
    useEffect(() => {
        const lastIndex = page * itemPerPage;
        const firstIndex = lastIndex - itemPerPage;
        const currentItems = classes.slice(firstIndex, lastIndex);
        setPaginatedData(currentItems);
    }, [page, classes])
    const totalPrice = classes.reduce((acc, item) => acc + parseInt(item.price), 0);
    const totalTax = totalPrice * 0.01;
    const price = totalPrice + totalTax;

    const handlePay = (id) => {
        console.log(id, 'id from pay')
        const item = classes.find((item) => item._id === id);
        // console.log(item, 'item from pay')
        const price = item.price;
        navigate('/dashboard/user/payment', { state: { price: price, itemId: id } });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/delete-cart-item/${id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your selected class has been deleted.',
                                'success'
                            )
                            const newClasses = classes.filter((item) => item._id !== id);
                            setClasses(newClasses);
                        }
                    })
            }
        })
        // Handle the delete action here
    };
    
  if(loading){
    return <div className="flex items-center justify-center h-screen"><FadeLoader color="#F44336" size={50}/></div>
  }
    return (
        <div>
            <div className="my-6">
                <h1 className='text-4xl font-bold text-center'>My <span className='text-secondary'>Selected</span> Class</h1>
            </div>
            <div className="h-screen py-8">
                <div className="container px-4 mx-auto">
                    <h1 className="mb-4 text-2xl font-semibold">Shopping Cart</h1>
                    <div className="flex flex-col gap-4 md:flex-row">
                        <div className="md:w-3/4">
                            <div className="p-6 mb-4 bg-white rounded-lg shadow-md">
                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <th className="font-semibold text-left">#</th>
                                            <th className="font-semibold text-left">Product</th>
                                            <th className="font-semibold text-left">Price</th>
                                            <th className="font-semibold text-left">Date</th>
                                            <th className="font-semibold text-left">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            classes.length === 0 ? <tr><td colSpan='5' className='text-2xl font-bold text-center'>No Classes Found</td></tr> : // If there is no item in the cart
                                                paginatedData.map((item, idx) => {
                                                    const letIdx = (page - 1) * itemPerPage + idx + 1;
                                                    return <tr key={item._id}>
                                                        <td className="py-4">{letIdx}</td>
                                                        <td className="py-4">
                                                            <div className="flex items-center">
                                                                <img className="w-16 h-16 mr-4" src={item.Image} alt="Product image" />
                                                                <span className="font-semibold text-[16px] whitespace-pre-wrap">{item.name}</span>

                                                            </div>
                                                        </td>
                                                        <td className="py-4">LKR {item.price}</td>
                                                        <td className="py-4">
                                                            <p className='text-sm text-green-700'>{moment(item.submitted).format('MMMM Do YYYY')}</p>
                                                        </td>
                                                        <td className="flex gap-2 py-4 pt-8">
                                                            <motion.button
                                                                whileHover={{ scale: 1.1 }}
                                                                whileTap={{ scale: 0.9 }}
                                                                className='px-3 py-1 font-bold text-white bg-red-500 cursor-pointer rounded-3xl'
                                                                onClick={() => handleDelete(item._id)}
                                                            >
                                                                <MdDeleteSweep />
                                                            </motion.button>
                                                            <motion.button
                                                                whileHover={{ scale: 1.1 }}
                                                                whileTap={{ scale: 0.9 }}
                                                                className='flex items-center px-3 py-1 font-bold text-white bg-green-500 cursor-pointer rounded-3xl'
                                                                onClick={() => handlePay(item._id)}
                                                            >
                                                                
                                                                Pay
                                                            </motion.button>


                                                        </td>
                                                    </tr>
                                                })}
                                    </tbody>
                                </table>
                                <ThemeProvider theme={theme}>
                                    <Pagination onChange={handleChange} count={totalPage} color="primary" />
                                </ThemeProvider>
                            </div>
                        </div>
                        <div className="fixed md:w-1/5 right-3">
                            <div className="p-6 bg-white rounded-lg shadow-md">
                                <h2 className="mb-4 text-lg font-semibold">Summary</h2>
                                <div className="flex justify-between mb-2">
                                    <span>Subtotal</span>
                                    <span>LKR {totalPrice}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Taxes</span>
                                    <span>
                                    LKR {totalTax.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Extra Fees</span>
                                    <span>LKR 0</span>
                                </div>
                                <hr className="my-2" />
                                <div className="flex justify-between mb-2">
                                    <span className="font-semibold">Total</span>
                                    <span className="font-semibold">LKR {price.toFixed(2)}</span>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => navigate('/dashboard/user/payment', { state: { price: price, itemId: null } })}
                                    disabled={price <= 0}
                                    className="w-full px-4 py-2 mt-4 text-white rounded-lg bg-secondary"
                                >
                                    Checkout
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectedClass;
