import axios from "axios";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const JoinAsGuide = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleJoinAsGuide = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const reason = form.reason.value;
    const cv = form.cv.value;

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_API}/tour-guides/${user?.email}`,
        {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
          title,
          reason,
          cv,
          status:"Pending",
        }
      );
      if(data?.message == "Already submitted for guide!!!"){
        return Swal.fire({
          title: "Pending!!!",
          text: "Your application for join as guid is pendng!",
          icon: "info"
        });
      }
      if (data.insertedId) {
        Swal.fire({
          title: "Application Submitted!",
          text: "Thank you for your application. We will review your profile andget back to you shortly.",
          icon: "success"
        });
        form.reset();
      }
    } catch (err) {
      console.log("Join as guide error -->", err);
    }
  };
  return (
    <>
      <div className="mt-5 container mx-auto max-w-lg bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-nunito font-bold text-chocolate mb-6 text-center">
          Join as a Tour Guide
        </h2>
        <form onSubmit={handleJoinAsGuide} className="space-y-6">
          {/* Application Title */}
          <div className="mb-4 col-span-1">
            <label className="block  text-sm font-heebo text-chocolate mb-2">
              Application Title
            </label>
            <select
              name="title"
              required
              defaultValue=""
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-terracotta"
            >
              <option value="" disabled>
                Choose Tour Tyep...
              </option>
              <option value="Adventure">Adventure</option>
              <option value="Cultural">Cultural</option>
              <option value="Relaxation">Relaxation</option>
              <option value="Nature">Nature</option>
            </select>
          </div>

          {/* Why Want to Be a Tour Guide */}
          <div>
            <label
              htmlFor="reason"
              className="block text-sm font-heebo text-chocolate mb-2"
            >
              Why do you want to be a Tour Guide?
            </label>
            <textarea
              id="reason"
              name="reason"
              placeholder="Explain your motivation to become a tour guide..."
              required
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-terracotta"
            ></textarea>
          </div>

          {/* CV Link */}
          <div>
            <label
              htmlFor="cv"
              className="block text-sm font-heebo text-chocolate mb-2"
            >
              CV Link
            </label>
            <input
              type="url"
              id="cv"
              name="cv"
              placeholder="Paste your CV link (e.g., Google Drive, Dropbox)"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-terracotta"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-between items-center">
            <Link to='/dashboard/tourist-profile' className="w-fit px-6 py-3 bg-terracotta text-white rounded-lg hover:bg-chocolate transition">My Profile</Link>
            <button
              type="submit"
              className="w-fit px-6 py-3 bg-terracotta text-white rounded-lg hover:bg-chocolate transition"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
