import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CgProfile } from "react-icons/cg";
import { LoadingSpinner } from "../Shared/LoadingSpinner";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
export const Booking = ({ packageData, guides }) => {
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();
  const [tourDate, setTourDate] = useState(new Date());
  const [selectedGuide, setSelectedGuide] = useState({});
  const navigate = useNavigate();
 
  const {data: userData= {}, isloading} = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async() =>{
      const {data} = await axios.get(`${import.meta.env.VITE_SERVER_API}/guest-user/${user?.email}`);
      return data;
    }
  })
  

  // distructure package data:
  const { _id, title } = packageData || {};

  // bookin submiting into db :
  const handleBooking = async (e) => {
    e.preventDefault();
    if (!userData) {
      return Swal.fire({
        title: "You need to Login/Register first!!!",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonColor: "#4F4F4F",
        cancelButtonColor: "#E07A5F",
        denyButtonColor: "#4F4F4F",
        confirmButtonText: "Login",
        denyButtonText: `Register`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          navigate("/login");
        } else if (result.isDenied) {
          navigate("/registration");
        }
      });
    }

    const form = e.terget;
    const packageName = title;
    const packageId = _id;
    const touristName = userData.name;
    const touristEmail = userData.email;
    const touristImage = userData.image;
    const touristId = userData._id;
    const price = parseFloat(packageData.price);
    const guideName = selectedGuide.guideName;
    const guideId = selectedGuide.guideId;

    const { data } = await axiosSecure.post(
      `/bookings/${packageId}`,
      {
        packageName,
        packageId,
        touristName,
        touristEmail,
        touristImage,
        touristId,
        price,
        tourDate,
        guideName,
        guideId
      }
    );

    // check if already booked:
    if (data.message === "Already booked!!!") {
      return Swal.fire({
        title: "You already booked the package.",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonColor: "#4F4F4F",
        cancelButtonColor: "#E07A5F",
        denyButtonColor: "#4F4F4F",
        confirmButtonText: "Confirm Booking",
        denyButtonText: `My Bookings`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          navigate("/dashboard/confirm-booking");
        } else if (result.isDenied) {
          navigate("/dashboard/my-bookings");
        }
      });
    }

    // booking success modal:
    if (data.insertedId) {
      Swal.fire({
        title: "Congrates! Your booking is in pending.",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonColor: "#4F4F4F",
        cancelButtonColor: "#E07A5F",
        denyButtonColor: "#4F4F4F",
        confirmButtonText: "Confirm Booking",
        denyButtonText: `My Bookings`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          navigate("/dashboard");
        } else if (result.isDenied) {
          navigate("/dashboard/my-bookings");
        }
      });
    }
  };
  //if data loading??
  if (isloading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <>
      {/* Booking Form Section */}
      <section>
        <h2 className="text-4xl text-center font-nunito font-bold text-chocolate mb-2">
          Book This Tour
        </h2>
        <div className="divider my-0"></div>
        <form
          onSubmit={handleBooking}
          className="space-y-4 bg-sand p-6 rounded-lg shadow-md"
        >
          {/* profile */}
          <div className="mx-auto flex flex-col justify-center items-center">
            <label className="block text-sm font-heebo text-chocolate mb-2">
              Your Photo
            </label>

            {userData ? (
              <img
                src={userData.image}
                alt={userData.name || "User"}
                className="w-16 h-16 rounded-full border-2 border-terracotta"
              />
            ) : (
              <CgProfile className="text-terracotta h-14 w-14" />
            )}
          </div>

          {/* Tourist Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Package Name */}
            <div>
              <label className="block text-sm font-heebo text-chocolate mb-2">
                Package Name
              </label>
              <input
                type="text"
                value={title}
                readOnly
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
            </div>

            {/* your name */}
            <div>
              <label className="block text-sm font-heebo text-chocolate mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={userData?.name || "Guest"}
                readOnly
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
            </div>

            {/* your email */}
            <div>
              <label className="block text-sm font-heebo text-chocolate mb-2">
                Your Email
              </label>
              <input
                type="text"
                value={userData?.email || ""}
                readOnly
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-heebo text-chocolate mb-2">
                Price
              </label>
              <input
                type="text"
                value={`$${packageData.price}`}
                readOnly
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
            </div>

            {/* Tour Date */}
            <div>
              <label className="block text-sm font-heebo text-chocolate mb-2">
                Tour Date
              </label>
              <DatePicker
                selected={tourDate}
                required
                onChange={(date) => setTourDate(date)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
            </div>

            {/* Tour Guide */}
            {guides && (
              <div>
                <label className="block text-sm font-heebo text-chocolate mb-2">
                  Tour Guide
                </label>
                <select
                  required
                  defaultValue=""
                  onChange={(e) => {
                    const selectedGuide = guides.find(
                      (guide) => guide._id === e.target.value
                    );
                    setSelectedGuide({
                      guideId: selectedGuide._id,
                      guideName: selectedGuide.name,
                    });
                  }}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                >
                  <option value="" disabled>
                    Select a Tour Guide
                  </option>
                  {guides.map((guide) => (
                    <option key={guide._id} value={guide._id}>
                      {guide.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Book Now Button */}
            <button
              type="submit"
              className="col-span-3 w-fit ms-auto px-6 py-3 bg-terracotta text-white rounded-lg hover:bg-chocolate transition"
            >
              Book Now
            </button>
          </div>
        </form>
      </section>
    </>
  );
};
