import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
export const Booking = ({ packageData }) => {
  const [tourDate, setTourDate] = useState(new Date());
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleBooking = async (e) => {
    e.preventDefault();
    if(!user){
      return  navigate("/login")
    }
    console.log("jjj");
  };
  return (
    <>
      {/* Booking Form Section */}
      <section>
        <h2 className="text-2xl font-nunito font-bold text-chocolate mb-4">
          Book This Tour
        </h2>
        <form
          onSubmit={handleBooking}
          className="space-y-4 bg-sand p-6 rounded-lg shadow-md"
        >
          {/* Package Name */}
          <div>
            <label className="block text-sm font-heebo text-chocolate mb-2">
              Package Name
            </label>
            <input
              type="text"
              value={packageData.title}
              readOnly
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            />
          </div>

          {/* Tourist Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-heebo text-chocolate mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-heebo text-chocolate mb-2">
                Your Email
              </label>
              <input
                type="text"
                value={user?.email || ""}
                readOnly
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-heebo text-chocolate mb-2">
                Your Photo
              </label>
              <img
                src={user?.photoURL || ""}
                alt="Tourist"
                className="w-16 h-16 rounded-full border"
              />
            </div>
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
              onChange={(date) => setTourDate(date)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            />
          </div>

          {/* Tour Guide */}
          {/* <div>
       <label className="block text-sm font-heebo text-chocolate mb-2">
         Tour Guide
       </label>
       <select
         required
         value={selectedGuide}
         onChange={(e) => setSelectedGuide(e.target.value)}
         className="w-full px-4 py-2 border rounded-lg focus:outline-none"
       >
         <option value="" disabled>
           Select a Tour Guide
         </option>
         {guides.map((guide) => (
           <option key={guide.id} value={guide.name}>
             {guide.name}
           </option>
         ))}
       </select>
     </div> */}

          {/* Book Now Button */}
          {
            <button
              type="submit"
              className="w-fit px-6 py-3 bg-terracotta text-white rounded-lg hover:bg-chocolate transition"
            >
              Book Now
            </button>
          }
        </form>
      </section>
    </>
  );
};
