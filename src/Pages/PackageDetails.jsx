import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
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

export const PackageDetails = () => {
  const { id } = useParams();
  const [packageDetails, setPackageDetails] = useState({});
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [guides, setGuides] = useState([]);
  useEffect(() => {
    const handlePackageLoad = async () => {
      // Fetch random packages
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/packages/${id}`
      );
      setPackageDetails(data);

      const handleGuideLoad = async() =>{
        // Fetch random packages
      const {data} = await axios.get("Guides.json");
      setGuides(data);

      }
      handleGuideLoad();
    };

    handlePackageLoad();
  }, []);
  return (
    <>
      {packageDetails?.images && (
        <>
          <Swiper
          key={packageDetails?.images.map((img,i) => i)}
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2 mb-3 bg-sand"
          >
            {packageDetails?.images &&
              packageDetails?.images.map((img, inx) => (
                <SwiperSlide>
                  <div className="h-[500px] md:h-[450px] lg:h-[400px] w-full">
                    <img
                      key={inx}
                      src={img}
                      className="w-full h-full object-contain "
                    />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper mb-10"
          >
            {packageDetails?.images &&
              packageDetails?.images.map((img, inx) => (
                <SwiperSlide>
                  <img
                    key={inx}
                    src={img}
                    className="h-[60px] w-full object-contain"
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </>
      )}

      <div className="container mx-auto px-6 lg:px-12 py-12">
        {/* About the Tour Section */}
        <AboutTour packageData={packageDetails}></AboutTour>

        {/* Tour Plan Section */}
        <TourPlan packageData={packageDetails}></TourPlan>

        {/* meet guide */}
        <OurGuide guides={guides}></OurGuide>

        {/* booking */}
        <Booking packageData={packageDetails}></Booking>
      </div>
    </>
  );
};
