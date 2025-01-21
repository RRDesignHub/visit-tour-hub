import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";
import { LoadingSpinner } from "../../../Components/Shared/LoadingSpinner";
import Swal from "sweetalert2";

export const MyAddedPackages = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: packages = [], isLoading, refetch } = useQuery({
    queryKey: ["packages", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/admin-packages/${user?.email}`);
      return data;
    },
  });



  if(isLoading) {
    return <LoadingSpinner></LoadingSpinner>
  }

  // update packages:
  const handleUpdate = async() =>{}

  // delete the package:
  const handleDelete = async(_id) =>{
    Swal.fire({
      title: `Are you sure?`,
      text: "You have to added the package again!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3D405B",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.delete(
          `/package/delete/${_id}`);
        if (data.deletedCount) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Successfully delete the package!`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      }
    });
  }
  return (
    <div className="min-h-screen bg-sand p-6">
      <div className="container mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-4xl text-center font-nunito font-bold text-chocolate mb-2">
          My Added Packages
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
              // value={searchTerm}
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

        {
          packages.length === 0 ? 
          <p className="text-center font-heebo">You are not added any packages yet.</p> :
          <table className="w-full border-collapse border border-neutral rounded-xl">
          <thead>
            <tr className="bg-chocolate text-white">
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Package Title</th>
              <th className="px-4 py-2 text-center">Type</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((item, index) => (
              <tr key={item._id} className="border-t">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{item.title.split(" ").slice(0,7).join(" ")}</td>
                <td className="px-4 py-2 text-center">{item.type}</td>
                <td className="px-4 py-2 text-right">${item.price}</td>
                
                <td className="px-4 py-2 text-center">
                <button
                      className="px-4 py-2 bg-chocolate text-white rounded-lg hover:bg-neutral transition"
                      onClick={() => handleUpdate()}
                      
                    >
                      Update
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition ml-2"
                      onClick={() => handleDelete(item._id)}
                     
                    >
                     Delete
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        }

      </div>
    </div>
  );
};
