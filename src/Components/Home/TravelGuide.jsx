import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LoadingSpinner } from "../Shared/LoadingSpinner";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "motion/react";
const TravelGuide = () => {
  const navigate = useNavigate();

  // load all packages from db:
  const { data: packages = [], isLoading: packageLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/random-packages`
      );
      return data;
    },
  });

 

  if (packageLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <section className="py-6 md:py-10 lg:py-16 bg-white">
      <div 
      id="guides"
      >
        <h2 className="text-2xl max-sm:mb-5 md:text-3xl lg:text-4xl font-nunito font-bold text-chocolate text-center mb-8">
          Glimps Of Our Packages
        </h2>
      </div>
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.3 }}
            id="book-now"
              className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages &&
                packages?.map((pkg) => (
                  <div
                    key={pkg._id}
                    className="card bg-sand shadow-md rounded-lg p-4"
                  >
                    <img
                      src={pkg?.images[0]}
                      alt={pkg?.title}
                      className="rounded-md mb-4 h-[195px] w-full object-cover"
                    />
                    <h3 className="text-xl font-nunito font-bold text-chocolate">
                      {pkg?.title}
                    </h3>
                    <p className="text-sm text-neutral">Type: {pkg?.type}</p>
                    <p className="text-sm text-neutral">Price: ${pkg?.price}</p>
                    <div className="flex-grow"></div>
                    <button
                      onClick={() => navigate(`/package-details/${pkg._id}`)}
                      className="mt-4 px-4 py-2 font-heebo bg-terracotta text-white rounded-lg hover:bg-chocolate"
                    >
                      View Details
                    </button>
                  </div>
                ))}
        </motion.div>
       
      </div>
    </section>
  );
};

export default TravelGuide;
