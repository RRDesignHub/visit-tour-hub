import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom"
import { LoadingSpinner } from "../Components/Shared/LoadingSpinner";
import axios from "axios";
import { format } from 'date-fns'
export const StoryDetails = () => {
  const {id} = useParams();
  const {data: story={}, isLoading} = useQuery({
    queryKey: ['stories'],
    queryFn: async() =>{
      const {data} = await axios.get(`${import.meta.env.VITE_SERVER_API}/story/${id}`);
      return data;
    }
  })
  if(isLoading){
    return <LoadingSpinner></LoadingSpinner>
  }
  return (
    <div className="container mx-auto px-6 lg:px-12 py-12">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          to="/community"
          className="px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-chocolate transition"
        >
          &larr; Back to Stories
        </Link>
      </div>

      {/* Story Header */}
      <div className="bg-white shadow-lg p-6 rounded-lg mb-8 border border-sand">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={story.userImage}
            alt={story.title}
            className="w-12 h-12 rounded-full border-2 border-chocolate"
          />
          <div>
            <h1 className="text-xl md:text-2xl font-nunito font-bold text-chocolate">
              {story.title}
            </h1>
            <p className="text-sm font-heebo text-neutral">
              By {story.userName} | {story?.addedAt && format(new Date(story?.addedAt), "MMMM dd, yyyy")}
            </p>
          </div>
        </div>
        <p className="text-base lg:text-lg font-heebo text-neutral">{story?.description}</p>
      </div>

      {/* Gallery Section */}
      <div className="bg-white shadow-lg md:p-6 rounded-lg md:border border-sand">
        <h2 className="text-2xl max-sm:text-center font-nunito font-bold text-chocolate mb-6">
          Gallery
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {story?.images && story?.images.map((image, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-lg">
              <img
                src={image}
                alt={`Story Image ${index + 1}`}
                className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
