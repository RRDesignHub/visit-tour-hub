import { useQuery } from "@tanstack/react-query";
import useUser from "../../../Hooks/useUser";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../../../Components/Shared/LoadingSpinner";
import Swal from "sweetalert2";

export const ManageGuideStories = () => {
  const [userData, userDataLoading] = useUser();
  const axiosSecure = useAxiosSecure();
  const {
    data: stories = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["stories", userData?._id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/stories/guide/${userData?._id}`
      );
      return data;
    },
  });

  

  // delete story:
  const handleDeleteStory = async (id) => {
    Swal.fire({
      title: `Are you sure?`,
      text: "The story is no longer exist!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3D405B",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.delete(`/guide/delete-story/${id}`);
        if (data.deletedCount) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Your story deleted successfully!!!`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      }
    });
  };

  if (userDataLoading || isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <div className="container mx-auto px-6 lg:px-12 py-12">
      <h1 className="text-3xl font-nunito font-bold text-chocolate mb-2 text-center">
        Manage Your Stories
      </h1>
      <div className="divider my-0"></div>
      <div className=" bg-white p-4 rounded-xl">
        {stories.length === 0 ? (
          <p className=" text-center text-chocolate font-nunito text-xl py-5">
            You are no story added yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story) => (
              <div
                key={story._id}
                className="bg-sand shadow-lg p-4 rounded-lg"
              >
                <h2 className="text-xl font-nunito font-bold text-chocolate mb-4">
                  {story.title}
                </h2>
                <p className="text-sm font-heebo text-neutral mb-4">
                  {story.description.slice(0, 150)}...
                </p>
                <div className="flex justify-between">
                  <Link
                    to={`/dashboard/update-guide-story/${story._id}`}
                    className="px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-chocolate transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteStory(story._id)}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
