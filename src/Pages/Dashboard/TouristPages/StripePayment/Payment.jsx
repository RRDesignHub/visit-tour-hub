import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { PaymentForm } from "./PaymentForm";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../../../Hooks/useAxiosSecure";
import { LoadingSpinner } from "../../../../Components/Shared/LoadingSpinner";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { SSLPayment } from "./SSLPayment";

const stripePromise = loadStripe(`${import.meta.env.VITE_PAYMENT_PK}`);

export const Payment = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  const { data: myTrip = {}, isLoading: tripLoading } = useQuery({
    queryKey: ["trip", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/booking/${id}`);
      return data;
    },
  });

  if (tripLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-6 lg:px-12 py-12">
      <h2 className="text-3xl font-nunito font-bold text-chocolate mb-2 text-center">
        Payment
      </h2>
      <div className="divider mt-0"></div>

      {/* Payment Method Tabs */}
      <Tabs>
        <TabList className="flex space-x-4 justify-center">
          <Tab className="px-6 py-2 bg-terracotta text-white rounded-lg cursor-pointer focus:outline-none">
            Pay with Stripe
          </Tab>
          <Tab className="px-6 py-2 bg-terracotta text-white rounded-lg cursor-pointer focus:outline-none">
            Pay with SSLCOMMERZ
          </Tab>
        </TabList>

        {/* Stripe Payment Tab */}
        <TabPanel>
          <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
            <Elements stripe={stripePromise}>
              <PaymentForm myTrip={myTrip} />
            </Elements>
          </div>
        </TabPanel>

        {/* SSLCOMMERZ Payment Tab */}
        <TabPanel>
          <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
            <SSLPayment myTrip={myTrip} />
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};
