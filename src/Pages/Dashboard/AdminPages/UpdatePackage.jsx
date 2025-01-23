import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useUser from "../../../Hooks/useUser";
import { LoadingSpinner } from "../../../Components/Shared/LoadingSpinner";
import imageUpload from "../../../Api/Utils";
import { useEffect, useState } from "react";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

export const UpdatePackage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [userData, userDataLoading] = useUser();
  const [tourPlan, setTourPlan] = useState([{ day: 1, description: "" }]);
  const [existingImages, setExistingImages] = useState([]); //existing images after removing
  const [removedImages, setRemovedImages] = useState([]); //removed Images
  const [newImages, setNewImages] = useState([]); //images URL after uploaded image to imageBB
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // get pacake data feom db:
  const {
    data: packageDetails = {},
    isLoading: packageLoading,
    refetch,
  } = useQuery({
    queryKey: ["package", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/packages/${id}`
      );
      return data;
    },
  });

  useEffect(() => {
    setExistingImages(packageDetails.images);
  }, [packageDetails.images]);

  const handleAddDay = () => {
    setTourPlan([...tourPlan, { day: tourPlan.length + 1, description: "" }]);
  };

  const handleTourPlanChange = (index, value) => {
    const updatedPlan = [...tourPlan];
    updatedPlan[index].description = value;
    setTourPlan(updatedPlan);
  };

  // remove image from the image state:
  const handleImageRemove = (imgUrl) => {
    setExistingImages(existingImages.filter((img) => img !== imgUrl));
    setRemovedImages([...removedImages, imgUrl]);
  };

  // upload new image:
  const handleNewImageUpload = async (imageFile) => {
    // image file upload to imageBB:
    const photoURL = await imageUpload(imageFile);
    setNewImages([...newImages, photoURL]);
  };

  //update package data:
  const handleUpdatePackage = async (e) => {
    e.preventDefault();
    const form = e.target;
    const packageData = {
      title: form.title.value,
      isPopular: form.isPopular.value,
      type: form.type.value,
      price: parseFloat(form.price.value),
      duration: form.duration.value,
      tourPlan: tourPlan,
      description: form.description.value,
      location: form.location.value,
      highlights: form.highlights.value.split(","),
      removedImages,
      newImages,
    };
    try {
      const { data } = await axiosSecure.patch(
        `/package/update/${id}`,
        packageData
      );
      if (data.modifiedCount) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Your package updated successfully!!!`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
        navigate("/dashboard/added-packages");
      }
    } catch (err) {
      console.log("Package update error-->", err);
    }
  };

  if (userDataLoading || packageLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <section className="min-h-screen p-6">
      <div className="container mx-auto max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl text-center  font-nunito font-bold text-chocolate">
          Update Package
        </h2>
        <div className="divider my-2"></div>
        <form onSubmit={handleUpdatePackage} className="grid grid-cols-3 gap-4">
          {/* Tour Title */}
          <div className="mb-4 col-span-2">
            <label className="block text-sm font-heebo text-chocolate mb-2">
              Package Title
            </label>
            <input
              type="text"
              name="title"
              defaultValue={packageDetails?.title}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-terracotta"
              placeholder="Enter package title"
            />
          </div>

          {/*is Popular*/}
          <div className="mb-4 col-span-1">
            <label className="block text-sm font-heebo text-chocolate mb-2">
              Mark as Popular
            </label>
            <select
              name="isPopular"
              defaultValue=""
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-terracotta"
            >
              <option value="" disabled>Is popular?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Tour Type */}
          {packageDetails?.type && (
            <div className="mb-4 col-span-1">
              <label className="block  text-sm font-heebo text-chocolate mb-2">
                Tour Type
              </label>
              <select
                name="type"
                defaultValue={packageDetails.type}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-terracotta"
              >
                <option value="Adventure">Adventure</option>
                <option value="Cultural">Cultural</option>
                <option value="Relaxation">Relaxation</option>
                <option value="Nature">Nature</option>
              </select>
            </div>
          )}

          {/* Price */}
          <div className="mb-4 col-span-1">
            <label className="block text-sm font-heebo text-chocolate mb-2">
              Price (USD)
            </label>
            <input
              type="number"
              name="price"
              defaultValue={packageDetails?.price}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-terracotta"
              placeholder="Enter package price"
            />
          </div>

          {/*tour Duration */}
          <div className="mb-4 col-span-1">
            <label className="block text-sm font-heebo text-chocolate mb-2">
              Duration
            </label>
            <input
              type="text"
              name="duration"
              defaultValue={packageDetails?.duration}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-terracotta"
              placeholder="E.g., 3 days, 5 days"
            />
          </div>

          {/* Tour Plan */}
          <div className="mb-6 col-span-3">
            <label className="block text-sm font-heebo text-chocolate mb-2">
              Tour Plan
            </label>
            {tourPlan.map((plan, index) => (
              <div key={index} className="flex gap-4 items-center mb-2">
                <span className="text-sm text-white font-bold bg-chocolate p-3 rounded-lg">{`Day ${plan.day}`}</span>
                <textarea
                  type="text"
                  required
                  rows="2"
                  value={plan.description}
                  onChange={(e) => handleTourPlanChange(index, e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-terracotta"
                  placeholder={`Day ${plan.day} description`}
                >
                  {" "}
                </textarea>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddDay}
              className="mt-2 px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-chocolate transition"
            >
              Add Another Day
            </button>
          </div>

          {/* Images */}
          <div className="mb-6 col-span-3">
            <label className="block text-sm font-heebo text-chocolate mb-2">
              Add Images (jpg, jpeg, png)
            </label>
            <input
              type="file"
              name="imageFile"
              onChange={(e) => handleNewImageUpload(e.target.files[0])}
              accept="image/*"
              className="w-full mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-terracotta"
            />
            {error && <p className="py-4 text-red-500">{error}</p>}
            {newImages?.length > 0 && (
              <div className="mt-4 grid grid-cols-3  gap-2 items-center bg-sand p-2 rounded-md">
                <p className="text-sm col-span-3">New images:</p>
                {newImages?.map((img) => (
                  <div key={img} className="relative">
                    <img
                      src={img}
                      alt="Packages"
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}
            {existingImages?.length > 0 && (
              <div className="mt-4 grid grid-cols-3  gap-2 items-center bg-sand p-2 rounded-md">
                <p className="text-sm col-span-3">Existing images:</p>
                {existingImages?.map((img) => (
                  <div key={img} className="relative">
                    <img
                      src={img}
                      alt="Packages"
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleImageRemove(img)}
                      className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-6 col-span-3">
            <label className="block text-sm font-heebo text-chocolate mb-2">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={packageDetails?.description}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-terracotta"
              rows="4"
              placeholder="Enter a detailed description"
            ></textarea>
          </div>

          {/* Location */}
          <div className="mb-4 col-span-1">
            <label className="block text-sm font-heebo text-chocolate mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              defaultValue={packageDetails?.location}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-terracotta"
              placeholder="Enter location"
            />
          </div>

          {/* Highlights */}
          <div className="mb-6 col-span-2">
            <label className="block text-sm font-heebo text-chocolate mb-2">
              Highlights (Comma Separated)
            </label>
            <input
              type="text"
              name="highlights"
              defaultValue={packageDetails?.highlights.map(
                (text, index) => text
              )}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-terracotta"
              placeholder="E.g: Boating, Wildlife Safari, Beach"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-fit col-span-3 ms-auto px-6 py-3 bg-terracotta text-white rounded-lg hover:bg-chocolate transition"
          >
            Add Package
          </button>
        </form>
      </div>
    </section>
  );
};
