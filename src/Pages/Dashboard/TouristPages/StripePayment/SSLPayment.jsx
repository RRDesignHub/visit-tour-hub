import { useAxiosSecure } from "../../../../Hooks/useAxiosSecure";

export const SSLPayment = ({myTrip}) => {
  const axiosSecure = useAxiosSecure();
  const {_id, packageId , touristId, guideId, price} = myTrip;
  const handleSSLPayment = async (e) =>{
    e.preventDefault();
    const paymentDetails = {
      bookingId: _id,
      packageId,
      touristId,
      guideId,
      transactionId :"",
      paidAmount: price,
      currency: "usd",
      status: "pending",
    }

    try{
      const {data} = await axiosSecure.post("/create-ssl-payment", paymentDetails);

      console.log(data);
    }catch(err){
      console.log("SSLCom payment Error:", err)
    }
  }
  return (
    <div className="text-center">
    <h3 className="text-lg font-heebo text-chocolate mb-4">
      Complete your payment via SSLCOMMERZ
    </h3>
    <button
      onClick={handleSSLPayment}
      className="px-6 py-3 bg-chocolate text-white rounded-lg hover:bg-terracotta transition"
    >
      Pay with SSLCOMMERZ
    </button>
  </div>
  )
}
