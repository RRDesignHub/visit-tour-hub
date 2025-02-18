import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LoadingSpinner } from "../Shared/LoadingSpinner";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "motion/react";
const OurGuide = () => {
  const navigate = useNavigate();

  // load all guide from db:
  const { data: guides = [], isLoading: guideLoading } = useQuery({
    queryKey: ["guides"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/random-tour-guide`
      );
      return data;
    },
  });

  if (guideLoading ) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <section className="py-6 md:py-10 lg:py-16 bg-sand">
      <div id="guides">
        <h2 className="text-2xl max-sm:mb-5 md:text-3xl lg:text-4xl font-nunito font-bold text-chocolate text-center mb-8">
          Our Guides
        </h2>
      </div>
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {guides.map((guide) => (
            <div
              key={guide._id}
              className="p-4 bg-white shadow-md rounded-lg text-center"
            >
              <img
                src={guide.image}
                alt={guide.name}
                className="w-24 h-24 mx-auto rounded-full mb-4 border-2 border-chocolate"
              />
              <h3 className="text-xl font-nunito font-bold text-chocolate">
                {guide.name}
              </h3>
              <p className="text-sm font-heebo text-neutral">
                {guide?.speciality || "General Tours"}
              </p>
              <p className="text-sm font-heebo text-neutral">
                Experience: {guide?.experience} years
              </p>
              <Link to={`/guide-details/${guide._id}`}>
                <button className="mt-4 px-4 py-2 font-heebo bg-terracotta text-white rounded-lg hover:bg-chocolate">
                  View Profile
                </button>
              </Link>
            </div>
          ))}
        </motion.div>
       
      </div>
    </section>
  );
};

export default OurGuide;
