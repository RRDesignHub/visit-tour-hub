import useUser from "../../../Hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";
import axios from "axios";
import { LoadingSpinner } from "../../../Components/Shared/LoadingSpinner";
import Swal from "sweetalert2";

export const MyAssignedTour = () => {
  const [userData, userDataLoading] = useUser();
  const axiosSecure = useAxiosSecure();
  // get guide data fro data for guide name and id:
  const { data: tourGuide = {}, isLoading: guideLoading } = useQuery({
    queryKey: ["guide", userData?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/tour-guide/${userData?.email}`
      );
      return data;
    },
  });

  // get all assigned tour for this guide:
  const {
    data: assignedTours = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assignedTour", tourGuide._id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/assigned-tours/${tourGuide._id}`
      );
      return data;
    },
  });

  if (guideLoading || userDataLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  const handleAccept = async (id, packageId, touristId, guideId) => {
    Swal.fire({
      title: `Are you sure?`,
      text: "You accept the booking!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3D405B",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Accept!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.patch(
          `/assigned-tours/accept/${id}`, {
            status: "accepted", packageId, touristId, guideId
          }
        );
        if (data.modifiedCount) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Successfully accept the booking!`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      }
    });
  };

  const handleReject = async (id, packageId, touristId, guideId) => {
    Swal.fire({
      title: `Are you sure?`,
      text: "You reject the booking!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3D405B",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.patch(
          `/assigned-tours/reject/${id}`, {
            status: "rejected", packageId, touristId, guideId
          }
        );
        if (data.modifiedCount) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Successfully reject the booking!`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      }
    });
  };
  return (
    <div className="container mx-auto px-6 lg:px-12 py-12">
      <h1 className="text-2xl md:text-3xl text-center font-bold text-chocolate mb-6">
        My Assigned Tours
      </h1>
      <div className="overflow-x-auto bg-white p-6 rounded-lg">
        {assignedTours.length === 0 ? (
          <p className="text-center font-heebo">No assigned tours available.</p>
        ) : (
          <table className="table-auto w-full border-collapse border border-neutral">
            <thead>
              <tr className="bg-chocolate text-white">
                <th className="text-left ps-4 py-2">Package Name</th>
                <th className="text-center py-2">Tourist Name</th>
                <th className="text-center py-2">Tour Date</th>
                <th className="text-center py-2">Price</th>
                <th className="text-center py-2">Status</th>
                <th className="px-2 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignedTours.map((tour) => (
                <tr key={tour._id} className="border-t">
                  <td className="px-2 py-2">{tour.packageName}</td>
                  <td className="px-4 py-2">{tour.touristName}</td>
                  <td className="px-4 text-center py-2">
                    {new Date(tour.tourDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 text-center py-2">${tour.price}</td>
                  <td
                    className={`px-4 text-center py-2 ${
                      tour.status === "in-review"
                        ? "text-yellow-500"
                        : tour.status === "accepted"
                        ? "text-green-600" :
                        tour.status === "completed" ? "text-orange-500"
                        : "text-red-600"
                    }`}
                  >
                    {
                      tour.status === "in-review" ? "In review" :
                      tour.status === "accepted" ? "Accepted" :
                      tour.status === "rejected" ? "Rejected" :
                      tour.status === "completed" ? "Completed" : "Accepted"
                    }
                  </td>
                  <td className="px-4 py-2 text-center max-sm:space-y-1">
                    <button
                      className="btn-sm disabled:bg-gray-400 md:btn bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                      onClick={() => handleAccept(tour._id, tour.packageId, tour.touristId, tour.guideId)}
                      disabled={tour.status !== "in-review" || tour.status === "accepted"}
                    >
                      Accept
                    </button>
                    <button
                      className="btn-sm disabled:bg-gray-400 md:btn bg-red-500 text-white rounded-lg hover:bg-red-600 transition ml-2"
                      onClick={() => handleReject(tour._id, tour.packageId, tour.touristId, tour.guideId)}
                      disabled={tour.status === "rejected" || tour.status === "accepted" || tour.status === "cancelled"}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
