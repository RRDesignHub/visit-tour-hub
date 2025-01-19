import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";
import { LoadingSpinner } from "../../../Components/Shared/LoadingSpinner";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export const MyBookings = () => {
  const { user } = useAuth();
  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookngs", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/bookings/${user?.email}`
      );
      return data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  console.log(bookings);

  const handleCancelBooking = async (id) => {
    Swal.fire({
      title: `Are you sure?`,
      text: "You have to apply again for the booking!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3D405B",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axios.delete(
          `${import.meta.env.VITE_SERVER_API}/booking/${id}`
        );
        if (data.deletedCount) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Successfully delete your booking!`,
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
                      {new Date(booking.tourDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">{booking.guideName}</td>
                    <td className="px-4 py-2">${booking.price}</td>
                    <td
                      className={`px-4 py-2 ${
                        booking.status === "confirmed"
                          ? "text-green-600"
                          : booking.status === "rejected"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {booking.status === "confirmed"
                        ? "Confirmed"
                        : booking.status === "rejected"
                        ? "Rejected"
                        : "Pending"}
                    </td>
                    <td className="px-4 py-2 text-center space-x-2">
                      {booking.status === "confirmed" && (
                        <Link to={`/dashboard/payment/${booking._id}`}>
                          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                            Pay
                          </button>
                        </Link>
                      )}
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        onClick={() => handleCancelBooking(booking._id)}
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
