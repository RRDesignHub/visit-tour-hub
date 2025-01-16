import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
const Banner = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
      
      
        <SwiperSlide>
          <div className="h-[500px] md:h-[700px] lg:h-[550px] relative">
            <div className="absolute h-full w-full bg-[rgba(0,18,26,0.7)] "></div>
            <img
              src="https://i.ibb.co.com/NrzgHSP/Saint-martin.jpg"
              className="h-full w-full max-sm:object-cover object-center "
            />
            <div className="absolute w-11/12 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-blue-50 flex flex-col lg:flex-row justify-center gap-5 items-center my-10">
              <div className="flex flex-col justify-center  items-center">
                <h1 className="text-center text-3xl md:text-5xl lg:text-6xl font-extrabold font-nunito text-white flex flex-col">
                  Discover the Serenity of <span className="text-terracotta">Saint Martin's Island</span>
                </h1>
                <p className=" font-heebo text-center text-[rgba(255,246,246)] py-4">
                  Explore the pristine beaches, crystal-clear waters, and
                  tropical beauty of Bangladesh's only coral island.
                </p>
                <div className="text-center space-x-4">
                  <Link className="btn border-none bg-terracotta text-[rgba(255,246,246)] hover:bg-[hsl(20,68%,63%)] uppercase">
                    Explore Packages
                  </Link>
                  <Link className="btn bg-transparent border-2 border-terracotta text-terracotta hover:bg-terracotta hover:border-transparent hover:text-white uppercase">
                    Find Your Guide
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-[500px] md:h-[700px] lg:h-[550px] relative">
            <div className="absolute h-full w-full bg-[rgba(0,18,26,0.65)] "></div>
            <img
              src="https://i.ibb.co.com/M1K78cB/Sundarban.jpg"
              className="h-full w-full max-sm:object-cover object-center "
            />
            <div className="absolute w-11/12 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2  flex flex-col lg:flex-row justify-center gap-5 items-center my-10">
              <div className="flex flex-col justify-center  items-center">
                <h1 className="text-center text-3xl md:text-5xl lg:text-6xl font-extrabold font-nunito text-white flex flex-col">
                  Unveil the Mysteries of the <span className="text-terracotta">Sundarbans</span>
                </h1>
                <p className=" font-heebo text-center text-[rgba(255,246,246)] py-4">
                  Venture into the world's largest mangrove forest and encounter
                  the majestic Royal Bengal Tiger in its natural habitat.
                </p>
                <div className="text-center space-x-4">
                  <Link className="btn border-none bg-terracotta text-[rgba(255,246,246)] hover:bg-[hsl(20,68%,63%)] uppercase">
                    Book a Safari
                  </Link>
                  <Link className="btn bg-transparent border-2 border-terracotta text-terracotta hover:bg-terracotta hover:border-transparent hover:text-white uppercase">
                    Explore More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-[500px] md:h-[700px] lg:h-[550px] relative">
            <div className="absolute h-full w-full bg-[rgba(0,18,26,0.7)] "></div>
            <img
              src="https://i.ibb.co.com/RhCY9Hk/Sixty-dome-mosque.jpg"
              className="h-full w-full max-sm:object-cover object-center "
            />
            <div className="absolute w-11/12 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-blue-50 flex flex-col lg:flex-row justify-center gap-5 items-center my-10">
              <div className="flex flex-col justify-center  items-center">
                <h1 className="text-center text-3xl md:text-5xl lg:text-6xl font-extrabold font-nunito text-white flex flex-col">
                  Step into History at the <span className="text-terracotta">Sixty Dome Mosque</span>
                </h1>
                <p className=" font-heebo text-center text-[rgba(255,246,246)] py-4">
                  Marvel at the architectural grandeur and historical
                  significance of this UNESCO World Heritage Site.
                </p>
                <div className="text-center space-x-4">
                  <Link className="btn border-none bg-terracotta text-[rgba(255,246,246)] hover:bg-[hsl(20,68%,63%)] uppercase">
                    Visit Now
                  </Link>
                  <Link className="btn bg-transparent border-2 border-terracotta text-terracotta hover:bg-terracotta hover:border-transparent hover:text-white uppercase">
                    Discover Heritage
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
