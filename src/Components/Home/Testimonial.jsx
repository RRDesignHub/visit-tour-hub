import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "motion/react";
import { LoadingSpinner } from "../Shared/LoadingSpinner";
import { Link } from "react-router-dom";
export const Testimonial = () => {
  
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/reviews`
      );
      return data;
    },
  });

   if (isLoading) {
      return <LoadingSpinner></LoadingSpinner>;
    }

  return (
    <section className="py-6 md:py-10 lg:py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-2xl max-sm:mb-5 md:text-3xl lg:text-4xl font-nunito font-bold text-chocolate text-center mb-8">
          What Our Tourists Say
        </h2>
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((testimonial) => (
            <div
              key={testimonial._id}
              className="bg-sand shadow-lg rounded-lg p-6 text-center"
            >
              <img
              referrerPolicy="no-referrer"
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-terracotta"
              />
              <p className="text-sm font-heebo text-neutral mb-4">
                "{testimonial.feedback.slice(0, 120)}..."
              </p>
              <h3 className="text-lg font-nunito font-bold text-chocolate">
                {testimonial.name}
              </h3>
            </div>
          ))}
        </motion.div>
        <div className="mx-auto text-center mt-8">
          <Link className="px-6 py-3 bg-terracotta font-heebo text-white rounded-lg hover:bg-chocolate transition" to="/add-review">Share Your Experience</Link>
        </div>
      </div>
    </section>

  )
}
