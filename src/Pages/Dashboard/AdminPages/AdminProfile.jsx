import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";

export const AdminProfile = () => {
  const {user} = useAuth();
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

  // get admin details from db:
  const {data: admin = {}, isLoading} = useQuery({
    queryKey: ["admin"],
    queryFn: async() =>{
      const {data} = await axiosSecure.get(`/user/${user?.email}`);
      return data;
    }
  })

  const adminInfo = {
    name: "John Doe",
    email: "admin@tourhub.com",
    image: "https://via.placeholder.com/150",
    role: "Admin",
  };
  return (
    <div className="container mx-auto px-6 lg:px-12 py-12">
      {/* Welcome Message */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-nunito font-bold text-chocolate">
          Welcome, <span className="text-terracotta">{adminInfo.name}</span>!
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
            src={admin.image}
            alt={admin.name}
            className="w-24 h-24 rounded-full border-2 border-chocolate"
          />
          <div className="text-center">
            <h2 className="text-xl font-nunito font-bold text-chocolate">
              {admin.name}
            </h2>
            <p className="text-sm font-heebo text-neutral">
              Email: {admin.email}
            </p>
            <p className="text-sm font-heebo text-neutral">
              Role: {admin.role}
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
            <form className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-heebo text-chocolate mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={adminInfo.name}
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
                  value={adminInfo.email}
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
                  value={adminInfo.role}
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
