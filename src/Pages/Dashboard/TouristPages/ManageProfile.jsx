import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import imageUpload from "../../../Api/Utils";
import Swal from "sweetalert2";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";

export const ManageProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { data: tourist = {}, refetch } = useQuery({
    queryKey: ["tourist"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/${user?.email}`);
      return data;
    },
  });

  const handleUpdateTourist = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = tourist.email;
    const role = tourist.role;
    const imageFile = form.imageFile.files[0];
    // image file upload to imageBB:
    const photoURL = await imageUpload(imageFile);

    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_SERVER_API}/user/update/${user?.email}`,
        {
          name,
          image: photoURL,
        }
      );
      if (data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${name} successfully update your profile!`,
          showConfirmButton: false,
          timer: 1500,
        });
        await updateUserProfile(name, photoURL);
        setIsModalOpen(false);
      }
    } catch (err) {
      console.log("Update tourist profile error -->", err);
    }
  };
  return (
    <div className="container mx-auto px-6 lg:px-6 py-12">
      {/* Tourist Information */}
      <section className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
        <div className="flex flex-col justify-center items-center gap-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-nunito font-bold text-chocolate">
              Welcome, <span className="text-terracotta">{tourist?.name}!</span>
            </h1>
            <p className="text-lg font-heebo text-neutral mt-2">
              Manage your profile and explore your journey with TourHub.
            </p>
          </div>
          <img
            src={tourist?.image}
            alt={tourist?.name}
            className="w-24 h-24 rounded-full border-2 border-chocolate"
          />
          <div className="text-center ">
            <h2 className="text-xl font-nunito font-bold text-chocolate">
              {tourist?.name}
            </h2>
            <p className="text-sm font-heebo text-neutral">
              Email: {tourist?.email}
            </p>
            <p className="text-sm font-heebo text-neutral">
              Role: {tourist?.role === "tourist" && "Tourist"}
            </p>
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-chocolate transition"
          >
            Edit Profile
          </button>
          <Link to="/dashboard/join-as-guide">
            <button className="px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-chocolate transition">
              Apply for Tour Guide
            </button>
          </Link>
        </div>
      </section>

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-nunito font-bold text-chocolate mb-4">
              Edit Profile
            </h2>
            <form onSubmit={handleUpdateTourist} className="space-y-4">
              {/* Name */}
              <div>
                <label
                  className="block text-sm font-heebo text-chocolate mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={tourist?.name}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-terracotta"
                />
              </div>

              {/* Image URL */}
              <div>
                <label
                  className="block text-sm font-heebo text-chocolate mb-2"
                  htmlFor="image"
                >
                  Profile Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="imageFile"
                  accept="image/*"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-terracotta"
                />
              </div>

              {/* Email and Role (Read-Only) */}
              <div>
                <label className="block text-sm font-heebo text-chocolate mb-2">
                  Email (Read-Only)
                </label>
                <input
                  type="text"
                  name="email"
                  value={user.email}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-heebo text-chocolate mb-2">
                  Role (Read-Only)
                </label>
                <input
                  type="text"
                  name="role"
                  value={tourist?.role}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>

              {/* Save Changes */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-neutral text-white rounded-lg hover:bg-gray-300 transition mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-chocolate transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
