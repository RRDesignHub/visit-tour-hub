import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";
import useUser from "../../../Hooks/useUser";
import { LoadingSpinner } from "../../../Components/Shared/LoadingSpinner";
import imageUpload from "../../../Api/Utils";
import Swal from "sweetalert2";

export const AdminProfile = () => {
  const {updateUserProfile} = useAuth()
  const [userData, userDataLoading] = useUser();
  const axiosSecure = useAxiosSecure();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Dummy data for admin statistics
  const adminStats = {
    totalPayments: "$15,000",
    totalGuides: 25,
    totalPackages: 40,
    totalClients: 120,
    totalStories: 75,
  };

 
  const handleAdminUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const imageFile = form.imageFile.files[0];
    // image file upload to imageBB:
    const photoURL = await imageUpload(imageFile);

    try {
      const { data } = await axiosSecure.patch(
        `/admin/update/${userData?.email}`,
        {
          name,
          image: photoURL
        }
      );
      if (data.modifiedCount) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${name} successfully update your profile!`,
          showConfirmButton: false,
          timer: 1500,
        });
        await updateUserProfile(name, photoURL);
        
        refetch();
        setIsEditModalOpen(false);
      }
    } catch (err) {
      console.log("Update tour guide profile error -->", err);
    }
  };

  if(userDataLoading){
    return <LoadingSpinner></LoadingSpinner>
  }
  return (
    <div className="container mx-auto px-6 lg:px-12 py-12">
      {/* Welcome Message */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-nunito font-bold text-chocolate">
          Welcome, <span className="text-terracotta">{userData.name}</span>!
        </h1>
        <p className="text-lg font-heebo text-neutral mt-2">
          Manage your profile and track the platform's performance.
        </p>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {Object.entries(adminStats).map(([key, value]) => (
          <div
            key={key}
            className="bg-white shadow-lg rounded-lg p-6 text-center border-t-4 border-terracotta"
          >
            <h2 className="text-2xl font-nunito font-bold text-chocolate">
              {value}
            </h2>
            <p className="text-sm font-heebo text-neutral capitalize mt-2">
              {key.replace("total", "Total")}{" "}
              {/* Converts keys to readable format */}
            </p>
          </div>
        ))}
      </div>

      {/* Admin Info Section */}
      <section className="bg-white p-6 rounded-lg shadow-lg max-w-3xl border-l-4 border-r-4 border-terracotta mx-auto">
        <div className="flex flex-col items-center gap-6">
          <img
            src={userData.image}
            alt={userData.name}
            className="w-24 h-24 rounded-full border-2 border-chocolate"
          />
          <div className="text-center">
            <h2 className="text-xl font-nunito font-bold text-chocolate">
              {userData.name}
            </h2>
            <p className="text-sm font-heebo text-neutral">
              Email: {userData.email}
            </p>
            <p className="text-sm font-heebo text-neutral">
              Role: {userData.role === "admin" ? "Admin" : ""}
            </p>
          </div>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-chocolate transition"
          >
            Edit Profile
          </button>
        </div>
      </section>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-nunito font-bold text-chocolate mb-4">
              Edit Profile
            </h2>
            <form className="space-y-4" onSubmit={handleAdminUpdate}>
              {/* Name */}
              <div>
                <label className="block text-sm font-heebo text-chocolate mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={userData.name}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-terracotta"
                />
              </div>

              {/* Update Image */}
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-heebo text-chocolate mb-2"
                >
                  Update Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="imageFile"
                  accept="image/*"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-terracotta"
                />
              </div>

              {/* Email (Read-only) */}
              <div>
                <label className="block text-sm font-heebo text-chocolate mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>

              {/* Role (Read-only) */}
              <div>
                <label className="block text-sm font-heebo text-chocolate mb-2">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  value={userData.role}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>

              {/* Submit and Cancel Buttons */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 transition mr-2"
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
