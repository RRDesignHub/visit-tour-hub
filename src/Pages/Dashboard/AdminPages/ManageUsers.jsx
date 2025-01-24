import { useQuery } from "@tanstack/react-query";
import useUser from "../../../Hooks/useUser";
import axios from "axios";
import { useState } from "react";
import { LoadingSpinner } from "../../../Components/Shared/LoadingSpinner";
import Swal from "sweetalert2";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";

export const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [userData, userDataLoading] = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  // get all user accept the logged in user data from db:
  const {
    data: users = [],
    isLoading: userLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", userData?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`users/${userData?.email}`);
      return data;
    },
  });

  const handleUpdateRole = async (_id, currentRole, role) => {
    if(currentRole === role){
      return Swal.fire(`The user is already ${role}`)
    }
    try {
      Swal.fire({
        title: `Are you want to change the role to ${role}?`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3D405B",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Change!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await axiosSecure.patch(`/user/role-update/${_id}`, {
            role,
          });
          if (data.message === "Already Tour Guide!!!") {
            return Swal.fire({
              position: "center",
              icon: "error",
              title: `User already a Tour Guide`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
          if (data.modifiedCount) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: `Successfully update Role!`,
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          }
        }
      });
    } catch (err) {
      console.log("Role updating error -->", err);
    }
  };

  if (userLoading || userDataLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <>
      <div className="min-h-screen bg-sand p-6">
        <div className="container mx-auto bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-4xl text-center font-nunito font-bold text-chocolate mb-2">
            Manage Users
          </h2>
          <div className="divider mt-0"></div>
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="w-1/2">
              <label className="block  text-sm font-heebo text-chocolate mb-2">
                Search by Name or Email
              </label>
              <input
                type="text"
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-terracotta"
              />
            </div>

            {/* Filter */}
            <div className="w-1/2">
              <label className="block  text-sm font-heebo text-chocolate mb-2">
                Filter by Role
              </label>
              <select
                name="type"
                required
                defaultValue=""
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-terracotta"
              >
                <option value="">All Roles</option>
                <option value="tourist">Tourist</option>
                <option value="tour-guide">Tour Guide</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          {/* Users Table */}
          <table className="w-full border-collapse border border-neutral rounded-xl">
            <thead>
              <tr className="bg-chocolate text-white">
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Profile</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="border-t">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    <img
                      referrerPolicy="no-referrer"
                      src={user.image}
                      alt={user.name}
                      className="h-10 w-10 border-2 border-terracotta rounded-full"
                    />
                  </td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    {user.role === "tourist"
                      ? "Tourist"
                      : user.role === "tour-guide"
                      ? "Tour Guide"
                      : user.role === "admin"
                      ? "Admin"
                      : ""}
                  </td>
                  <td className="px-4 py-2">
                    {user?.role && (
                      <select
                        name="type"
                        defaultValue={user.role}
                        onChange={(e) => {
                          handleUpdateRole(user._id, user.role, e.target.value);
                        }}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-terracotta"
                      >
                        <option value="tourist">Tourist</option>
                        <option value="tour-guide">Tour Guide</option>
                        <option value="admin">Admin</option>
                      </select>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
