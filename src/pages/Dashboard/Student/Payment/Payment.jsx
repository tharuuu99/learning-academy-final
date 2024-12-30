import { loadStripe } from "@stripe/stripe-js";
import { Navigate, useLocation } from "react-router-dom";
import './Payment.css'
//import Payment from "./Payment";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";



const Payment = () => {
  
const key = import.meta.env.VITE_STRIPE;

  const location = useLocation();
  console.log(location);
  const price = location?.state?.price;
  const cartItm = location.state?.itemId;
  if(!price){
    return <Navigate to="/dashboard/my-selected"/>
  }

  const stripePromise = loadStripe(key);
  return (
    <div className="my-40 stripe-custom-class">
      <Elements stripe={stripePromise}>
        <CheckoutPage price={price} cartItm={cartItm}/>
      </Elements>
    </div>
  );
}

export default Payment;
