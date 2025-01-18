import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LoadingSpinner } from "../../../Components/Shared/LoadingSpinner";
import Swal from "sweetalert2";

export const ManageCandidates = () => {
  const {
    data: candidates = [],
    isLoading: candidateLoading,
    refetch,
  } = useQuery({
    queryKey: ["candidates"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/guides-applications`
      );
      return data;
    },
  });

// accept the candidates applications:
  const handleAccept = async (_id, candidate) => {
    try {
      Swal.fire({
        title: "Are you accept the application?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3D405B",
        cancelButtonColor: "#d33",
        confirmButtonText: "Accept!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await axios.post(
            `${import.meta.env.VITE_SERVER_API}/tour-guide/${_id}`,
            {
              userId: candidate.userId,
              name: candidate.name,
              email: candidate.email,
              image: candidate.image,
              speciality: candidate.title,
              experience: 0,
              reason: candidate.reason,
              cvLink: candidate.cvLink,
            }
          );
          if (data.acceptedApplication) {
            Swal.fire({
              title: "Accepted!",
              text: "The candidate appoined as Tour Guide",
              icon: "success",
            });
            refetch();
          }
        }
      });
    } catch (err) {
      console.log("Role updating error -->", err);
    }
  };

  // reject the candidates applications:
  const handleReject = async (_id) => {
    try {
      Swal.fire({
        title: "Are you reject the application?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3D405B",
        cancelButtonColor: "#d33",
        confirmButtonText: "Reject!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await axios.delete(
            `${import.meta.env.VITE_SERVER_API}/guides-applications/${_id}`
          );
          if (data.deletedCount) {
            Swal.fire({
              title: "Rejected!",
              text: "Reject the application.",
              icon: "success",
            });
            refetch();
          }
        }
      });
    } catch (err) {
      console.log("Role updating error -->", err);
    }
  };

  if (candidateLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <>
      <div className="min-h-screen bg-sand p-6">
        <div className="container mx-auto bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-4xl text-center font-nunito font-bold text-chocolate mb-2">
            Manage Candidates
          </h2>
          <div className="divider mt-0"></div>

          {/* Candidates Table */}
          <table className="w-full border-collapse border border-neutral rounded-xl">
            <thead>
              <tr className="bg-chocolate text-white">
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate, index) => (
                <tr key={candidate._id} className="border-t">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2 font-semibold">{candidate.name}</td>
                  <td className="px-4 py-2">{candidate.email}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleAccept(candidate._id, candidate)}
                      className="px-4 py-2 bg-terracotta text-white rounded-lg mr-2 hover:bg-chocolate transition"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(candidate._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Reject
                    </button>
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
