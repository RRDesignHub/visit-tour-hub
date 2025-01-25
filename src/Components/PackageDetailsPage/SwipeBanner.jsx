import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

// import required modules
import { EffectCube, Pagination } from "swiper/modules";

export const SwipeBanner = ({ packageDetails }) => {
  const { images } = packageDetails;
  return (
    <>
      {images && (
        <Swiper
          effect={"cube"}
          grabCursor={true}
          cubeEffect={{
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.70,
          }}
          pagination={true}
          modules={[EffectCube, Pagination]}
          className="mySwiper"
        >
          {images.map((img, inx) => (
            <SwiperSlide key={inx}>
              <div className="h-[450px] w-full ">
                <img src={img} className="w-full h-full object-cover lg:object-contain " />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};
