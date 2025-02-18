import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { LoadingSpinner } from "../Shared/LoadingSpinner";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export const TouristStories = () => {
  const {data: stories = [], isLoading} = useQuery({
    queryKey: ["stories"],
    queryFn: async() =>{
      const {data} = await axios.get(`${import.meta.env.VITE_SERVER_API}/tourist-stories`);
      return data;
    }
  })

  if(isLoading){
    return <LoadingSpinner></LoadingSpinner>
  }
  return (
    <section className="py-6 md:py-10 lg:py-16 bg-sand">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-3xl md:text-4xl font-nunito font-bold text-chocolate text-center mb-8">
          Tourist Stories
        </h2>
        <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {stories.length > 0 && stories?.map((story) => (
            <div
              key={story._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="p-4">
                <h3 className="text-xl font-nunito font-bold text-chocolate mb-2">
                  {story.title}
                </h3>
                <p className="text-sm font-heebo text-neutral mb-4">
                  {story.description.slice(0, 100)}...
                </p>
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={story.userImage}
                    alt={story.userName}
                    className="w-8 h-8 rounded-full border"
                  />
                  <p className="text-sm font-heebo text-chocolate">
                    By {story.userName}
                  </p>
                </div>
                <Link
                  to={`/story/${story._id}`}
                  className="block px-4 py-2 bg-terracotta font-heebo text-white text-center rounded-lg hover:bg-chocolate transition"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </motion.div>
        <div className="text-center mt-8">
          <Link
            to="/community"
            className="px-6 py-3 bg-terracotta font-heebo text-white rounded-lg hover:bg-chocolate transition"
          >
            View All Stories
          </Link>
        </div>
      </div>
    </section>

  )
}
