import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { LoadingSpinner } from "../Components/Shared/LoadingSpinner";
import { Link } from "react-router-dom";

export const Community = () => {
  const {data: stories=[], isLoading} = useQuery({
    queryKey: ['stories'],
    queryFn: async() =>{
      const {data} = await axios.get(`${import.meta.env.VITE_SERVER_API}/stories`);
      return data;
    }
  })

 

  if(isLoading) {
    return <LoadingSpinner></LoadingSpinner>
  }
  return (
    <div className="container mx-auto px-6 lg:px-12 py-12">
      {/* Header Section */}
      <header className="text-center mb-4">
        <h1 className="text-4xl font-nunito font-bold text-chocolate">
          Welcome to the TourHub Community!
        </h1>
        <p className="text-lg font-heebo text-neutral mt-2">
          Discover amazing stories and experiences shared by our tourists.
        </p>
      </header>
      <div className="divider my-0"></div>
      {/* Filter and Sort Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        {/* Filter Dropdown */}
        <div>
          <label className="block text-sm font-heebo text-chocolate mb-2">
            Filter by Category
          </label>
          <select
            // value={filter}
            // onChange={(e) => setFilter(e.target.value)}
            className="w-full md:w-auto px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-terracotta"
          >
            <option value="All">All</option>
            <option value="Adventure">Adventure</option>
            <option value="Nature">Nature</option>
            <option value="Cultural">Cultural</option>
            <option value="Relaxation">Relaxation</option>
          </select>
        </div>

        {/* Sort Dropdown */}
        <div>
          <label className="block text-sm font-heebo text-chocolate mb-2">
            Sort by
          </label>
          <select
            // value={sort}
            // onChange={(e) => setSort(e.target.value)}
            className="w-full md:w-auto px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-terracotta"
          >
            <option value="newest">Newest</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story) => (
          <div key={story._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={story.images[0]} // Display the first image
              alt={story.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 min-h-max flex flex-col">
              <h2 className="text-xl font-nunito font-bold text-chocolate mb-2">
                {story.title}
              </h2>
              <p className="text-sm font-heebo text-neutral mb-4">
                {story.description.slice(0, 100)}...
              </p>
              <div className="flex items-center gap-2 mb-4">
                <img
                  src={story?.userImage || ""}
                  alt={story.userName}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full border-2 border-terracotta"
                />
                <p className="text-sm font-heebo text-chocolate">{story.userName}</p>
              </div>
              <div className="flex-grow"></div>
              <Link
                to={`/community/story/${story._id}`}
                className="block px-4 py-2 bg-terracotta text-white text-center rounded-lg hover:bg-chocolate transition"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
