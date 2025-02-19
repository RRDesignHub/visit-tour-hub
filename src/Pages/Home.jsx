import { MotionConfig } from "motion/react";
import Banner from "../Components/Home/Banner";
import Overview from "../Components/Home/Overview";
import { PopularDestination } from "../Components/Home/PopularDestination";
import { Testimonial } from "../Components/Home/Testimonial";
import { TouristStories } from "../Components/Home/TouristStories";
import TravelGuide from "../Components/Home/TravelGuide";

import { motion } from "motion/react";
import OurGuide from "../Components/Home/OurGuides";
import Gallery from "../Components/Home/Gallery";

export const Home = () => {
  return (
    <>
      <motion.div
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // transition={{ duration: 1 }}
      >
        <Banner></Banner>
      </motion.div>
      <Overview></Overview>
      <TravelGuide></TravelGuide>
      <OurGuide></OurGuide>
      <PopularDestination></PopularDestination>
      <TouristStories></TouristStories>
      <Testimonial></Testimonial>
      <Gallery />
    </>
  );
};
