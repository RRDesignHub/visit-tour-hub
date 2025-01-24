import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useAxiosSecure } from "../../../../Hooks/useAxiosSecure";
import useUser from "../../../../Hooks/useUser";
import Swal from "sweetalert2";

export const PaymentForm = ({ myTrip }) => {
  const [userData, userDataLoading] = useUser();
  const [error, setError] = useState();
  const stripe = useStripe();
  const elements = useElements();
  const {_id, packageId , touristId, guideId, price} = myTrip;
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState(null);
  useEffect(() => {
    const handlePaymentIntent = async () => {
      try {
        if (price > 0) {
          const { data } = await axiosSecure.post(
            "/create-payment-intent",
            {price}
          );
          setClientSecret(data?.clientSecret);
        }
      } catch (err) {
        console.log("Payment Intent Error-->", err);
      }
    };

    handlePaymentIntent();
  }, [axiosSecure, price]);
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true)
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    try{
      // use stripe card Element with Stripe.js APIs:
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      console.log("Stripe error-->", error);
    }
    if (paymentMethod) {
      setError(null);
      console.log("Payment Method-->", paymentMethod);
    }
    
    //confirm payment:
    const {paymentIntent, error: paymentConfirmError} = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: userData.name || "User",
          email: userData.email || "user@gmail.com",
        }
      }
    });

    if(paymentConfirmError){
      console.log("Payment confirm Error-->", paymentConfirmError);
    }else{
      setPaymentIntent(paymentIntent)
      if(paymentIntent?.status === "succeeded"){
        setTransactionId(paymentIntent.id);

        const paymentDetails = {
          bookingId: _id,
          packageId,
          touristId,
          guideId,
          transactionId : transactionId,
          paidAmount: price,
          currency: "usd",
          status: "paid"
        }
        try{
          const {data} = await axiosSecure.post('/payment', paymentDetails);
          if(data.insertedId){
            Swal.fire("Payment successfull.")
          }

        }catch(err){
          console.log("Payment details save db ERROR:", err);
        }

      }
      console.log("Payment intnt-->", paymentIntent);
    }
    }catch(err){
      setError("Something went wrong. Please try again.");
    }finally{
      setIsSubmitting(false);
    }
  };
  return (
    <div>
       <form onSubmit={handlePaymentSubmit} className="bg-white p-6 rounded-lg shadow-md grid gap-4">
        <div className="border rounded-lg p-4 shadow-sm">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#3D405B",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
        <button
          className={`btn w-fit bg-terracotta text-neutral mt-4 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={!stripe || !clientSecret || isSubmitting || paymentIntent}
        >
          {isSubmitting ? "Processing..." : "Pay"}
        </button>
        {error && (
          <p className="text-red-500 text-sm font-semibold bg-red-100 p-3 rounded-lg">
            {error}
          </p>
        )}
        {paymentIntent && transactionId && (
          <p className="text-green-500 font-semibold bg-green-100 p-3 rounded-lg flex flex-col gap-y-2">
            Payment Successful! Thank you for your payment.
            <span className="text-sm">Transaction Id: {transactionId}</span>
          </p>
        )}
      </form>
    </div>
  );
};
