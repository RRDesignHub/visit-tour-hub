import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useUser from "../../../Hooks/useUser";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import imageUpload from "../../../Api/Utils";
import { LoadingSpinner } from "../../../Components/Shared/LoadingSpinner";
import Swal from "sweetalert2";

export const TourGuideProfile = () => {
  const {updateUserProfile} = useAuth()
  const axiosSecure = useAxiosSecure();
  const [userData, userDataLoading] = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: tourGuide = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["guide", userData?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/tour-guide/${userData?.email}`
      );
      return data;
    },
  });
  const {
    _id,
    name,
    email,
    image,
    speciality,
    experience,
    reason,
    cvLink,
    joined,
  } = tourGuide;

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const speciality = form.speciality.value;
    const experience = parseInt(form.experience.value);
    const reason = form.reason.value;
    const cvLink = form.cvLink.value;
    const imageFile = form.imageFile.files[0];
    // image file upload to imageBB:
    const photoURL = await imageUpload(imageFile);

    try {
      const { data } = await axiosSecure.patch(
        `/tour-guide/update/${_id}`,
        {
          userId: userData._id,
          name,
          email: userData.email,
          image: photoURL,
          speciality,
          experience,
          reason,
          cvLink,
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
      console.log("Update tour guide profile error -->", err);
    }
  };

  if (userDataLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <>
      <div className="container mx-auto px-6 lg:px-12 py-12">
        {/* Guide Information */}
        <section className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
          <div className="flex flex-col justify-center items-center gap-2">
            {/* Welcome Section */}
            <div className="text-center ">
              <h1 className="text-3xl font-nunito font-bold text-chocolate">
                Welcome, <span className="text-terracotta">{name}!</span>
              </h1>
              <p className="text-lg font-heebo text-neutral ">
                Manage your profile and continue guiding with TourHub.
              </p>
            </div>
            <div className="divider my-0"></div>

            {/* Profile Image */}
            <img
              src={image}
              alt={name}
              className="w-32 h-32 rounded-full border-2 border-chocolate"
            />

            {/* Personal Info */}
            <div className="text-center">
              <h2 className="text-xl md:text-3xl font-nunito font-bold text-chocolate">
                {name}
              </h2>
              <p className="text-sm md:text-base font-heebo text-neutral">
                Email: {email}
              </p>
              <p className="text-sm  md:text-base font-heebo text-neutral">
                Role: Tour Guide
              </p>
            </div>

            {/* Professional Info */}
            <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 md:gap-x-20 gap-y-3">
              <div className="flex items-center  gap-2">
                <p className="text-lg font-nunito font-bold text-chocolate ">
                  Speciality:
                </p>
                <p className="text-sm md:text-base font-heebo text-neutral ">
                  {speciality || "Not specified"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-lg font-nunito font-bold text-chocolate">
                  Experience:
                </p>
                <p className="text-sm md:text-base font-heebo text-neutral">
                  {experience || 1} years
                </p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-lg font-nunito font-bold text-chocolate">
                  CV:
                </p>
                <a
                  href={cvLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm md:text-base font-heebo text-terracotta hover:underline"
                >
                  View CV
                </a>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-lg font-nunito font-bold text-chocolate">
                  Joined On:
                </p>
                <p className="text-sm md:text-base font-heebo text-neutral">
                  {new Date(joined).toLocaleDateString()}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-lg font-nunito font-bold text-chocolate ">
                  Reason for Joining:
                </p>
                <p className="text-sm md:text-base font-heebo text-neutral ">
                  {reason}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-[80%] mx-auto flex justify-end mt-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-chocolate transition"
            >
              Edit Profile
            </button>
          </div>
        </section>

        {/* Edit Profile Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-hidden">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-nunito font-bold text-chocolate mb-4">
                Edit Profile
              </h2>
              <form className="space-y-4" onSubmit={handleUpdateProfile}>
                {/* Name */}
                <div>
                  <label className="block text-sm font-heebo text-chocolate mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={name}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-terracotta"
                  />
                </div>

                {/* Update Image */}
                <div>
                  <label
                    className="block text-sm font-heebo text-chocolate mb-2"
                    htmlFor="image"
                  >
                    Update Image
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

                {/* Speciality */}
                {speciality ? (
                  <div className="mb-4 col-span-1">
                    <label className="block text-sm font-heebo text-chocolate mb-2">
                      Speciality
                    </label>
                    <select
                      name="speciality"
                      required
                      defaultValue={speciality}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-terracotta"
                    >
                      <option value="" disabled>
                        Choose specialiy...
                      </option>
                      <option value="Adventure Tours">Adventure Tours</option>
                      <option value="Cultural Tours">Cultural Tours</option>
                      <option value="Relaxation Tours">Relaxation Tours</option>
                      <option value="Nature Tours">Nature Tours</option>
                    </select>
                  </div>
                ) : (
                  <div className="mb-4 col-span-1">
                    <label className="block text-sm font-heebo text-chocolate mb-2">
                      Speciality
                    </label>
                    <select
                      name="speciality"
                      required
                      defaultValue=""
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-terracotta"
                    >
                      <option value="" disabled>
                        Choose specialiy...
                      </option>
                      <option value="Adventure Tours">Adventure Tours</option>
                      <option value="Cultural Tours">Cultural Tours</option>
                      <option value="Relaxation Tours">Relaxation Tours</option>
                      <option value="Nature Tours">Nature Tours</option>
                    </select>
                  </div>
                )}

                {/* Experience */}
                <div>
                  <label className="block text-sm font-heebo text-chocolate mb-2">
                    Experience (Years)
                  </label>
                  <input
                    required
                    type="number"
                    name="experience"
                    defaultValue={experience || 1}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-terracotta"
                  />
                </div>

                {/* Update Reason */}
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
                    defaultValue={reason}
                    placeholder="Explain your motivation to become a tour guide..."
                    required
                    rows="3"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-terracotta"
                  ></textarea>
                </div>

                {/* Update CV */}
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
                    name="cvLink"
                    placeholder="Paste your CV link (e.g., Google Drive, Dropbox)"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-terracotta"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-chocolate text-white rounded-lg hover:bg-gray-500 transition mr-2"
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
    </>
  );
};
