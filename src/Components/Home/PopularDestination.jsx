import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";


export const PopularDestination = () => {
  const {data: popularPackages= [], isLoading} = useQuery({
    queryKey: ['popularPackages'],
    queryFn: async() =>{
      const {data} = await axios.get(`${import.meta.env.VITE_SERVER_API}/popular-packages`);
      return data;
    }
  })

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-4xl font-nunito font-bold text-chocolate text-center mb-8">
          Popular Destinations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          { popularPackages.map((destination) => (
            <div
              key={destination._id}
              className="bg-sand shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={destination.images[0]}
                alt={destination.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-nunito font-bold text-chocolate mb-2">
                  {destination.title}
                </h3>
                <p className="text-sm font-heebo text-neutral mb-4">
                  {destination.description}
                </p>
                <Link
                  to="/packages"
                  className="block px-4 py-2 bg-terracotta text-white text-center rounded-lg hover:bg-chocolate transition"
                >
                  View Packages
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

  )
}
