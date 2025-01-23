import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom"
import { LoadingSpinner } from "../Components/Shared/LoadingSpinner";

export const GuideProfile = () => {
  const {id} = useParams();
  const {data: guideData= {}, isLoading: guideLoading} = useQuery({
    queryKey: ["guideData"],
    queryFn: async() =>{
      const {data} = await axios.get(`${import.meta.env.VITE_SERVER_API}/guide/${id}`);
      return data;
    }
  })

  // load all packages from db:
  const { data: portfolioTours = [], isLoading: packageLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/random-packages`
      );
      return data;
    },
  });

  if(guideLoading || packageLoading){
    return <LoadingSpinner></LoadingSpinner>
  }
  return (
    <div className="container mx-auto px-6 lg:px-12 py-12">
      {/* Profile Section */}
      <div className="bg-sand shadow-lg p-6 rounded-lg max-w-3xl mx-auto mb-12">
        <div className="flex flex-col items-center gap-6">
          <img
            src={guideData.image}
            alt={guideData.name}
            className="w-32 h-32 rounded-full border-4 border-terracotta"
          />
          <div className="text-center">
            <h2 className="text-3xl font-nunito font-bold text-chocolate">
              {guideData.name}
            </h2>
            <p className="text-md font-heebo text-neutral">
              <strong>Specialty:</strong> {guideData.speciality}
            </p>
            <p className="text-md font-heebo text-neutral">
              <strong>Experience:</strong> {guideData.experience} years
            </p>
            <p className="text-md font-heebo text-neutral italic">
              "{guideData.reason}"
            </p>
          </div>
        </div>
      </div>

      {/* Portfolio Section */}
      <div className="bg-white shadow-lg p-6 rounded-lg border border-sand">
        <h2 className="text-2xl font-nunito font-bold text-chocolate mb-2">
          Tours Led by <span className="text-terracotta">{guideData.name}</span>
        </h2>
        <div className="divider my-0 mb-2"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioTours.map((tour) => (
            <div
              key={tour._id}
              className="bg-sand shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={tour.images[0]}
                alt={tour.title}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-nunito font-bold text-chocolate mb-2">
                  {tour.title}
                </h3>
                <p className="text-sm font-heebo text-neutral mb-4">
                  {tour.description.slice(0, 180)}...
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
