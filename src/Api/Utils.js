import axios from "axios";

// upload image file to imageBB and get the photoURL:
const imageUpload = async imageFile =>{
  const formData = new FormData();
    formData.append("image", imageFile);
    const {data} = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_KEY}`, formData);
    return data.data.display_url;
}
export default imageUpload;