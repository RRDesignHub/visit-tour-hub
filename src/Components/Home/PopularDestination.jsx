import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

export const PopularDestination = () => {
  const { data: popularPackages = [], isLoading } = useQuery({
    queryKey: ["popularPackages"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/popular-packages`
      );
      return data;
    },
  });

  return (
    <section className="py-6 md:py-10 lg:py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-2xl max-sm:mb-5 md:text-3xl lg:text-4xl font-nunito font-bold text-chocolate text-center mb-8">
          Popular Destinations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularPackages.map((destination) => (
            <div
              key={destination._id}
              className="card bg-sand shadow-md rounded-lg p-4"
            >
              <img
                src={destination.images[0]}
                alt={destination.title}
                className="w-full pb-5 object-cover rounded-md"
              />
                <h3 className="text-xl font-nunito font-bold text-chocolate mb-2">
                  {destination.title}
                </h3>
                <p className="text-sm font-heebo max-sm:text-justify text-neutral mb-4">
                  {destination.description.slice(0, 150)}...
                </p>
                <div className="flex-grow"></div>
                <Link
                to={`/package-details/${destination._id}`}
                className="block px-4 py-2 font-heebo bg-terracotta text-white text-center rounded-lg hover:bg-chocolate transition"
              >
                View Packages
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
