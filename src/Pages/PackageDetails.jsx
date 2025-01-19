import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../Components/Shared/LoadingSpinner";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { AboutTour } from "../Components/PackageDetailsPage/AboutTour";
import { TourPlan } from "../Components/PackageDetailsPage/TourPlan";
import { OurGuide } from "../Components/PackageDetailsPage/OurGuide";
import { Booking } from "../Components/PackageDetailsPage/Booking";
import { SwipeBanner } from "../Components/PackageDetailsPage/SwipeBanner";

export const PackageDetails = () => {
  const { id } = useParams();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { data: packageDetails = {}, isLoading: packageLoading } = useQuery({
    queryKey: ["package", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/packages/${id}`
      );
      return data;
    },
  });

  // load all guide from db:
  const { data: guides = [], isLoading: guideLoading } = useQuery({
    queryKey: ["guides"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/tour-guide`
      );
      return data;
    },
  });
  if (packageLoading || guideLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <>
      {/* slider images */}
      <div className="mx-auto bg-sand py-5">
        <SwipeBanner packageDetails={packageDetails}></SwipeBanner>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-12">
        {/* About the Tour Section */}
        <AboutTour packageData={packageDetails}></AboutTour>

        {/* Tour Plan Section */}
        <TourPlan packageData={packageDetails}></TourPlan>

        {/* meet guide */}
        <OurGuide guides={guides}></OurGuide>

        {/* booking */}
        <Booking packageData={packageDetails} guides={guides}></Booking>
      </div>
    </>
  );
};
