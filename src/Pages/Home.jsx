import Banner from "../Components/Home/Banner"
import Overview from "../Components/Home/Overview"
import { PopularDestination } from "../Components/Home/PopularDestination"
import { Testimonial } from "../Components/Home/Testimonial"
import { TouristStories } from "../Components/Home/TouristStories"
import TravelGuide from "../Components/Home/TravelGuide"


export const Home = () => {
  return (
   <>
    <Banner></Banner>
    <Overview></Overview>
    <TravelGuide></TravelGuide>
    <TouristStories></TouristStories>
    <PopularDestination></PopularDestination>
    <Testimonial></Testimonial>
  </>
  )
}
