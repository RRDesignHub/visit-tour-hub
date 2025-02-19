import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LoadingSpinner } from "../Components/Shared/LoadingSpinner";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
export const Community = () => {
  const [search, setSearch] = useState("");
  const { data: stories = [], isLoading } = useQuery({
    queryKey: ["stories", search],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/stories?search=${search}`
      );
      return data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const data = e.target.search.value;
    setSearch(data);
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-6 lg:px-12 py-12"
    >
      {/* Header Section */}
      <header className="text-center mb-4">
        <h1 className="text-2xl md:text-4xl font-nunito font-bold text-chocolate">
          Welcome to the TourHub Community!
        </h1>
        <p className="max-sm:hidden text-base md:text-lg font-heebo text-neutral mt-2">
          Discover amazing stories and experiences shared by our tourists.
        </p>
      </header>
      <div className="divider my-0"></div>
      {/* Filter and Sort Section */}
      <div className="flex  justify-between items-center mb-8 gap-4">
        {/* Filter Dropdown */}
        <div>
          <form onSubmit={handleSearch}>
            <div className="flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
              <input
                className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
                type="text"
                name="search"
                defaultValue={search}
                placeholder="Search by title"
                aria-label="Search by title"
              />

              <button className="px-1 md:px-4 py-3 font-heebo text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories?.length > 0 &&
          stories?.map((story) => (
            <div
              key={story._id}
              className="card bg-sand shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={story.images[0]} // Display the first image
                alt={story.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col">
                <h2 className="text-xl font-nunito font-bold text-chocolate mb-2">
                  {story.title}
                </h2>
                <p className="text-sm font-heebo text-neutral ">
                  {story.description.slice(0, 100)}...
                </p>
              </div>
              <div className="flex-grow"></div>
              <div className="mx-4 flex items-center gap-2 mb-4">
                <img
                  src={story?.userImage || ""}
                  alt={story.userName}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full border-2 border-terracotta"
                />
                <p className="text-sm font-heebo text-chocolate">
                  {story.userName}
                </p>
              </div>
              <Link
                to={`/story/${story._id}`}
                className="mx-4 mb-2 block px-4 py-2 font-heebo bg-terracotta text-white text-center rounded-lg hover:bg-chocolate transition"
              >
                Read More
              </Link>
            </div>
          ))}
      </div>
    </motion.div>
  );
};
