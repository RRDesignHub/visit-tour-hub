import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";
import { LoadingSpinner } from "../../../Components/Shared/LoadingSpinner";
import imageUpload from "../../../Api/Utils";
import Swal from "sweetalert2";

export const UpdateGuideStory = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [existingImages, setExistingImages] = useState([]); //existing images after removing
  const [removedImages, setRemovedImages] = useState([]); //removed Images
  const [newImages, setNewImages] = useState([]); //images URL after uploaded image to imageBB

  const { data: story = {}, isLoading, refetch } = useQuery({
    queryKey: ["story", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/story/${id}`);
      return data;
    },
    
  });

  useEffect(() =>{
    setTitle(story.title);
    setContent(story.description);
    setExistingImages(story.images);
  },[story.title, story.description, story.images])

  
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

  // submit update story:
  const handleUpdateStory = async (e) => {
    e.preventDefault();

    const formTitle = e.target.title.value;
    const description = e.target.description.value;
    try {
      const { data } = await axiosSecure.patch(`/story/guide-story/update/${id}`, {
        title : formTitle,
        description,
        removedImages,
        newImages,
      });
      if (data.modifiedCount) {
        refetch()
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Your story updated successfully!!!`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/manage-guide-stories");
      }
    } catch (err) {
      console.log("Guide story editing error-->", err);
    }
  };
  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <div className="container mx-auto px-6 lg:px-12 py-12">
      <h1 className="text-3xl font-nunito font-bold text-chocolate mb-6 text-center">
        Update Story
      </h1>
      <form
        onSubmit={handleUpdateStory}
        className="bg-white shadow-lg p-6 rounded-lg max-w-2xl mx-auto"
      >
        {/* Title */}
        <div className="mb-6">
          <label className="block text-sm font-heebo text-chocolate mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
           defaultValue={story.title}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-terracotta"
            required
          />
        </div>

        {/* Content */}
        <div className="mb-6">
          <label className="block text-sm font-heebo text-chocolate mb-2">
            Content
          </label>
          <textarea
            defaultValue={story.description}
            name="description"
            rows="5"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-terracotta"
            required
          ></textarea>
        </div>

        {/* Existing Images */}
        <div className="mb-6">
          <label className="block text-sm font-heebo text-chocolate mb-2">
            Existing Images
          </label>
          <div className="grid grid-cols-3 gap-4">
            {existingImages?.map((img) => (
              <div key={img} className="relative">
                <img
                  src={img}
                  alt="Story"
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
        </div>

        {/* Upload New Images */}
        <div className="mb-6">
          <label className="block text-sm font-heebo text-chocolate mb-2">
            Add New Images
          </label>
          <input
            type="file"
            multiple
            onChange={(e) => handleNewImageUpload(e.target.files[0])}
            className="block w-full text-sm text-gray-500"
          />
          {newImages.length !== 0 && (
            <div className="mt-4 grid grid-cols-3 gap-2 items-center bg-sand p-2 rounded-md">
              {newImages.map((img, i) => (
                <img
                  src={img}
                  key={i}
                  className="w-full h-24 object-cover rounded-lg"
                />
              ))}
            </div>
          )}
          
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-chocolate transition"
        >
          Update Story
        </button>
      </form>
    </div>
  );
};
