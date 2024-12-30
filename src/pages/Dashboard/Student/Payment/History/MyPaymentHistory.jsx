import { useEffect, useState } from "react";
import useAxiosFetch from "../../../../../hooks/useAxiosFetch";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import { useUser } from "../../../../../hooks/useUser";
import {FadeLoader} from "react-spinners"
import moment from "moment";
import { ThemeProvider, createTheme } from '@mui/material';
import Pagination from '@mui/material/Pagination';


const MyPaymentHistory = () => {
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const {currentUser} = useUser();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginatedPayments, setPaginatedPayments] = useState([]);
  const totalItem = payments.length;
  const [page, setPage] = useState(1);
  let totalPage = Math.ceil(totalItem / 5);
   let itemsPerPage = 5;
   const handleChange = (event, value) => {
    setPage(value);
   }

   useEffect(() => {
    const lastIndex = page * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentItems = payments.slice(firstIndex, lastIndex);
    setPaginatedPayments(currentItems)
   },[page, payments])

   useEffect(() => {
    axiosFetch.get(`/payment-history/${currentUser.email}`)
    .then(res => {
      setPayments(res.data)
      setLoading(false)
    }).catch(err => console.log(err))
   }, [currentUser.email]);


   const theme = createTheme({
    palette: {
        primary: {
            main: '#FF1949', // Set the primary color
        },
        secondary: {
            main: '#FF1949', // Set the secondary color
        },
    },
});
   
   const totalPaidAmount = payments.reduce((acc, curr) => acc + curr.amount, 0);

   if(loading){
    return <div className="flex items-center justify-center h-screen"><FadeLoader color="#F44336" size={50}/></div>
  }

  return (
    <div>
        <div className="mt-6 mb-16 text-center">
            <p className='text-gray-400'>Hey, <span className='font-bold text-secondary'>{currentUser.name}</span> Welcome...!</p>
            <h1 className='text-4xl font-bold text-black'>My Payment History</h1>
            <p className='my-3 text-sm text-gray-500'>You can see your payment history here </p>
        </div>



        <div className="">
            <div className="">
                <h1 className='font-bold'>Total Payments : {payments.length}</h1>
                <h1 className='font-bold'>Total Paid : LKR {totalPaidAmount}</h1>
            </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-sm font-light text-left">
                                <thead className="font-medium border-b dark:border-neutral-500">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">#</th>
                                        <th scope="col" className="px-6 py-4">Amount</th>
                                        <th scope="col" className="px-6 py-4">Total Item</th>
                                        <th scope="col" className="px-6 py-4">Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        paginatedPayments.map((payment, idx) => (
                                            <tr
                                                key={payment._id}
                                                className="transition duration-300 ease-in-out border-b hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                                            >
                                                <td className="px-6 py-4 font-medium whitespace-nowrap">{(page - 1) * itemsPerPage + idx + 1}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">LKR {payment.amount}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{payment.classesId.length}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {moment(payment.date).format('MMMM Do YYYY, h:mm a')}
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                            <div className="mt-5">
                                <ThemeProvider theme={theme}>
                                    <Pagination onChange={handleChange} count={totalPage} color="secondary" />
                                </ThemeProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
);
}

export default MyPaymentHistory;
