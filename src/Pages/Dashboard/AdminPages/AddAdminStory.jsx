import { useState } from "react";
import useUser from "../../../Hooks/useUser";
import imageUpload from "../../../Api/Utils";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../../Components/Shared/LoadingSpinner";

export const AddAdminStory = () => {
  const navigate = useNavigate();
  const [userData, userDataLoading] = useUser();
  const axiosSecure = useAxiosSecure();
  const [imageFile, setImageFile] = useState(null);
  const [imageURLs, setImageURLs] = useState([]);
  const [error, setError] = useState("");
  const handleUploadImage = async () => {
    setError("")
    // image file upload to imageBB:
    const photoURL = await imageUpload(imageFile);
    setImageURLs([...imageURLs, photoURL]);
  };
  const handleAddStory = async (e) => {
    e.preventDefault();
    const form = e.target;
    if(imageURLs.length === 0){
      return setError("Please add the images!!!");
    }
    try {
      const { data } = await axiosSecure.post("/add-story", {
        title: form.title.value,
        description: form.description.value,
        images: imageURLs,
        userId: userData._id,
        userName: userData?.name,
        userImage: userData?.image,
        userEmail: userData?.email,
      });
      if (data.insertedId) {
        form.reset();
        setError("")
        setImageURLs([]);
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Your story added successfully!!!`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/manage-admin-stories")
      }
    } catch (err) {
      console.log("Add story by admin Error-->", err);
    }
  };

  if(userDataLoading){
    return <LoadingSpinner></LoadingSpinner>
  }
  return (
    <div className="container mx-auto px-3 lg:px-12 py-4 md:py-12">
      <h1 className="text-2xl md:text-3xl font-nunito font-bold text-chocolate mb-6 text-center">
        Add a New Story
      </h1>
      <form
        onSubmit={handleAddStory}
        className="bg-white shadow-lg p-3 md:p-6 rounded-lg max-w-2xl mx-auto"
      >
        <div className="mb-6">
          <label className="block text-sm font-heebo text-chocolate mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-terracotta"
            required
          />
        </div>

        {/* descriptions */}
        <div className="mb-6">
          <label className="block text-sm font-heebo text-chocolate mb-2">
            Content
          </label>
          <textarea
            name="description"
            rows="5"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-terracotta"
            required
          ></textarea>
        </div>

        {/* upload images */}
        <div className="mb-6">
          <label className="block text-sm font-heebo text-chocolate mb-2">
            Upload Images
          </label>
          <input
            type="file"
            name="imageFile"
            multiple
            required
            onChange={(e) => setImageFile(e.target.files[0])}
            className="block w-full text-sm text-gray-500"
          />
          {
            error && <p className="py-4 text-red-500">{error}</p>
          }
          {imageURLs.length !== 0 && (
            <div className="mt-4 grid grid-cols-3  gap-2 items-center bg-sand p-2 rounded-md">
              {imageURLs.map((img, i) => (
                <img src={img} key={i} className="w-full h-24 object-cover rounded-lg" />
              ))}
            </div>
          )}
          <button
            type="button"
            onClick={handleUploadImage}
            className="mt-2 px-4 btn btn-sm bg-terracotta text-white rounded-lg hover:bg-chocolate transition"
          >
            Add Image
          </button>
        </div>
        <div className="w-full text-right">
          <button
            type="submit"
            className="px-4 py-2 ms-auto bg-terracotta text-white rounded-lg hover:bg-chocolate transition"
          >
            Submit Story
          </button>
        </div>
      </form>
    </div>
  );
};
