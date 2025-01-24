import { useParams } from "react-router-dom"
import {loadStripe} from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js";
import { PaymentForm } from "./PaymentForm";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../../../Hooks/useAxiosSecure";
import { LoadingSpinner } from "../../../../Components/Shared/LoadingSpinner";
const stripePromise = loadStripe(`${import.meta.env.VITE_PAYMENT_PK}`);
export const Payment = () => {
  const axiosSecure = useAxiosSecure();
  const {id} = useParams();
  const {data: myTrip = {}, isLoading: tripLoading} = useQuery({
    queryKey: ['tript'],
    queryFn: async() =>{
      const {data} = await axiosSecure.get(`/booking/${id}`);
      return data;
    }
  })

  if(tripLoading){
    return <LoadingSpinner></LoadingSpinner>
  }
  return (
    <div className="container mx-auto px-6 lg:px-12 py-12">
      <h2 className="text-3xl font-nunito font-bold text-chocolate mb-2 text-center">Payment:</h2>
      <div className="divider mt-0"></div>
      <div>
        <Elements stripe={stripePromise}>
          <PaymentForm myTrip={myTrip}></PaymentForm>
        </Elements>
      </div>
    </div>
  )
}
