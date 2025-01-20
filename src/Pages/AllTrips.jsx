import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { LoadingSpinner } from "../Components/Shared/LoadingSpinner";
import { Link } from "react-router-dom";

export const AllTrips = () => {
  const {data : packages = [], isLoading} = useQuery({
    queryKey: ["packages"],
    queryFn: async() =>{
      const {data} = await axios.get(`${import.meta.env.VITE_SERVER_API}/packages`)
      return data;
    }
  })

  if (isLoading) {
    return (
      <LoadingSpinner></LoadingSpinner>
    );
  }
  return (
    
    <>
      <div className="container mx-auto px-6 lg:px-12 py-12">
        <h1 className="text-3xl lg:text-4xl font-nunito font-bold text-chocolate text-center">
          All Trips
        </h1>
        <div className="divider mt-0"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((trip) => (
            <div
              key={trip._id}
              className="bg-sand border rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={trip.images[0]}
                alt={trip.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-nunito font-bold text-chocolate">
                  {trip.title}
                </h2>
                <p className="text-sm font-heebo text-gray-600 mt-2">
                  {trip.description.slice(0, 100)}...
                </p>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-lg font-heebo font-bold text-terracotta">
                    ${trip.price}
                  </p>
                  <Link to={`/package-details/${trip._id}`}>
                    <button className="px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-chocolate transition">
                      Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
