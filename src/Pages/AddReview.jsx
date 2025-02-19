import { useState } from "react";
import useUser from "../Hooks/useUser";
import { LoadingSpinner } from "../Components/Shared/LoadingSpinner";
import { useAxiosSecure } from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

export default function AddReview() {
  const axiosSecure = useAxiosSecure();
  const [userData, userDataLoading] = useUser();
  const [reviewData, setReviewData] = useState({
    name: userData?.name,
    email: userData?.email,
    image: userData?.image,
    rating: 1,
    feedback: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // if user is a tourGuide or Admin prevent the review:
        if (userData.role === "tour-guide" || userData.role === "admin") {
          return Swal.fire({
            title: "Admin or Guide cannot put reviews!",
            icon: "error",
          });
        }
    
    try {
      // Submit packageData to the backend
      const { data } = await axiosSecure.post(`/add-review`, reviewData);
      if (data.insertedId) {
        e.target.reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Review added successfully!!!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      console.log("Add review error-->", err);
    }
  };

  if (userDataLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="py-8  bg-sand flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl lg:text-4xl font-nunito font-bold text-chocolate text-center">
          Add Your Review
        </h1>
        <p className="max-sm:hidden text-base md:text-lg font-heebo text-neutral mt-2 text-center">
          We'd love to hear your thoughts! Please share your experience with us.
        </p>
        <div className="divider my-0"></div>
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-3">
          <div className="col-span-3">
            <label
              htmlFor="rating"
              className="block text-sm font-heebo text-chocolate mb-2"
            >
              Rating
            </label>
            <select
              id="rating"
              name="rating"
              value={reviewData.rating}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta"
            >
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>

          <div className="col-span-3">
            <label
              htmlFor="feedback"
              className="block text-sm font-heebo text-chocolate mb-2"
            >
              Your Review
            </label>
            <textarea
              id="feedback"
              name="feedback"
              value={reviewData.feedback}
              onChange={handleChange}
              rows="4"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta"
            ></textarea>
          </div>

          <div className="col-span-3 w-fit mx-auto">
            <button
              type="submit"
              className="px-6 py-3 font-heebo bg-terracotta text-white text-lg rounded-lg hover:bg-[#D96A4B] transition duration-300"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
