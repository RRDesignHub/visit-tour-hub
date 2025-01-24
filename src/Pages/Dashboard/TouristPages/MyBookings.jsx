import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LoadingSpinner } from "../../../Components/Shared/LoadingSpinner";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useUser from "../../../Hooks/useUser";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";
import { format } from 'date-fns';
export const MyBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [userData, userDataLoading] = useUser();
  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookngs", userData?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/bookings/${userData?.email}`
      );
      return data;
    },
  });

  if (isLoading || userDataLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  const handleCancelBooking = async (id, packageId, touristId, guideId) => {
    Swal.fire({
      title: `Are you sure?`,
      text: "You have to apply again for the booking!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3D405B",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.delete(
          `/booking/cancel-booking/${id}?packageId=${packageId}&touristId=${touristId}&guideId=${guideId}`
        );
        if (data.deletedCount) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Successfully cancelled your booking!`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      }
    });
  };
  return (
    <>
      <div className="container  mx-auto px-6 lg:px-12 py-12">
        <h1 className="text-3xl text-center font-nunito font-bold text-chocolate mb-6">
          My Bookings
        </h1>
        <div className="overflow-x-auto bg-white p-4 rounded-lg">
          {bookings.length === 0 ? (
            <div className="container mx-auto px-6 lg:px-12 py-12">
              <p className="text-center text-chocolate font-nunito text-xl">
                You have no bookings yet.
              </p>
            </div>
          ) : (
            <table className="table-auto w-full border-collapse border border-neutral">
              <thead>
                <tr className="bg-chocolate text-white">
                  <th className="px-4 py-2 text-left">Package Name</th>
                  <th className="px-4 py-2 text-left">Tour Date</th>
                  <th className="px-4 py-2 text-left">Guide Name</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings?.map((booking) => (
                  <tr key={booking._id} className="border-t">
                    <td className="px-4 py-2">{booking.packageName}</td>
                    <td className="px-4 py-2">
                      {format(new Date(booking.tourDate), "MMMM dd, yyyy")}
                    </td>
                    <td className="px-4 py-2">{booking.guideName}</td>
                    <td className="px-4 py-2">${booking.price}</td>
                    <td
                      className={`px-4 py-2 ${
                        booking.status === "pending" || booking.status === "accepted"
                        ? "text-yellow-500" :
                        booking.status === "paid"
                        ? "text-green-600"
                        : booking.status === "rejected"
                        ? "text-red-500"
                        : "text-orange-500"
                      }`}
                    >
                      {booking.status === "pending"
                        ? "Pending"
                        : booking.status === "rejected"
                        ? "Rejected"
                        : booking.status === "accepted"
                        ? "Accepted"
                        : booking.status === "paid"
                        ? "Paid"
                        : booking.status === "completed"
                        ? "Completed"
                        : ""}
                    </td>
                    <td className="px-4 py-2 text-center space-x-2">
                      {booking.status === "accepted" && (
                        <Link to={`/dashboard/payment/${booking._id}`}>
                          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                            Pay
                          </button>
                        </Link>
                      )}
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        onClick={() =>
                          handleCancelBooking(
                            booking._id,
                            booking.packageId,
                            booking.touristId,
                            booking.guideId
                          )
                        }
                        disabled={
                          booking.status === "paid" ||
                          booking.status === "completed"
                        }
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
