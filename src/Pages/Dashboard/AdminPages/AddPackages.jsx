import { useEffect, useState } from "react";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";
import imageUpload from "../../../Api/Utils";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";

const AddPackage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [tourPlan, setTourPlan] = useState([{ day: 1, description: "" }]);
  const [imageFile, setImageFile] = useState(null);
  const [imageURLs, setImageURLs] = useState([]);
  const [error, setError] = useState('');

  const handleAddDay = () => {
    setTourPlan([...tourPlan, { day: tourPlan.length + 1, description: "" }]);
  };

  const handleTourPlanChange = (index, value) => {
    const updatedPlan = [...tourPlan];
    updatedPlan[index].description = value;
    setTourPlan(updatedPlan);
  };

  const handleUploadImage = async () => {
    setError("")
    // image file upload to imageBB:
    const photoURL = await imageUpload(imageFile);
    setImageURLs([...imageURLs, photoURL]);
  };

  // remove Image:
  const handleImageRemove = (image) =>{ 
    setImageURLs(imageURLs.filter(img => image !== img)) 
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const packageData = {
      title: form.title.value,
      type: form.type.value,
      price: parseFloat(form.price.value),
      duration: form.duration.value,
      tourPlan: tourPlan,
      images: imageURLs,
      description: form.description.value,
      location: form.location.value,
      highlights: form.highlights.value.split(","),
      adminName: user?.displayName,
      adminEmail: user?.email,
    };

    // check the images add or not:
    if(imageURLs.length === 0){
      return setError("Please add package images.")
    }

    try {
      // Submit packageData to the backend
      const { data } = await axiosSecure.post(
        `/add-package`,
        packageData
      );
      if (data.insertedId) {
        setImageURLs(imageURLs.length = 0)
        setTourPlan(tourPlan.length = 0)
        form.reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${packageData.title}, package added successfully!!!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      console.log("Add package error-->",err);
    }
  };

  return (
    <section className="min-h-screen p-6">
      <div className="container mx-auto max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl text-center  font-nunito font-bold text-chocolate">
          Add a New Package
        </h2>
        <div className="divider my-2"></div>
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
          {/* Tour Title */}
          <div className="mb-4 col-span-3">
            <label className="block text-sm font-heebo text-chocolate mb-2">
              Package Title
            </label>
            <input
              type="text"
              name="title"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-terracotta"
              placeholder="Enter package title"
            />
          </div>


          {/* Tour Type */}
          <div className="mb-4 col-span-1">
            <label className="block  text-sm font-heebo text-chocolate mb-2">
              Tour Type
            </label>
            <select
              name="type"
              required
              defaultValue=""
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-terracotta"
            >
              <option value="" disabled>
                Choose Tour
              </option>
              <option value="Adventure">Adventure</option>
              <option value="Cultural">Cultural</option>
              <option value="Relaxation">Relaxation</option>
              <option value="Nature">Nature</option>
            </select>
          </div>

          {/* Price */}
          <div className="mb-4 col-span-1">
            <label className="block text-sm font-heebo text-chocolate mb-2">
              Price (USD)
            </label>
            <input
              type="number"
              name="price"
              required
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
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-terracotta"
              placeholder="E.g., 3 days, 5 days"
            />
          </div>

          {/* Tour Plan */}
          <div className="mb-6 col-span-3">
            <label className="block text-sm font-heebo text-chocolate mb-2">
              Tour Plan
            </label>
            {tourPlan?.length > 0 && tourPlan?.map((plan, index) => (
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
              Images (jpg, jpeg, png)
            </label>
            <input
              type="file"
              required
              name="imageFile"
              onChange={(e) => setImageFile(e.target.files[0])}
              accept="image/*"
              className="w-full mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-terracotta"
            />
            {
            error && <p className="py-4 text-red-500">{error}</p>
          }
          {imageURLs?.length > 0 && (
            <div className="mt-4 grid grid-cols-3  gap-2 items-center bg-sand p-2 rounded-md">
              {imageURLs?.map((img) => (
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
          <button
              type="button"
              onClick={handleUploadImage}
              className="mt-2 px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-chocolate transition"
            >
              Add Image
            </button>
          </div>

          {/* Description */}
          <div className="mb-6 col-span-3">
            <label className="block text-sm font-heebo text-chocolate mb-2">
              Description
            </label>
            <textarea
              name="description"
              required
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
              required
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
              required
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

export default AddPackage;
