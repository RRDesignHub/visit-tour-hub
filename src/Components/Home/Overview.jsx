import React from "react";
import icon_1 from "../../assets/packages.png";
import icon_2 from "../../assets/journey.png";
import icon_3 from "../../assets/guide.png";
const Overview = () => {
  return (
    <section className="bg-sand py-16">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-3xl lg:text-4xl font-nunito font-bold text-chocolate text-center">
          Why Choose TourHub?
        </h2>
        <p className="text-lg font-heebo text-neutral text-center mt-4 max-w-3xl mx-auto">
          TourHub connects you to the best travel experiences in Bangladesh.
          With detailed guides, curated packages, and authentic local insights,
          we ensure every journey is unforgettable.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Card 1 */}
          <div className="flex flex-col items-center text-center bg-white shadow-md rounded-lg p-6">
            <img
              src={icon_1}
              alt="Curated Packages"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-xl font-nunito font-bold text-chocolate">
              Curated Packages
            </h3>
            <p className="text-sm font-heebo text-neutral mt-2">
              Handpicked tours and experiences tailored to your preferences.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center text-center bg-white shadow-md rounded-lg p-6">
            <img
              src={icon_2}
              alt="Curated Packages"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-xl font-nunito font-bold text-chocolate">
              Authentic Local Guides
            </h3>
            <p className="text-sm font-heebo text-neutral mt-2">
              Explore with expert guides who know the real Bangladesh.
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center text-center bg-white shadow-md rounded-lg p-6">
            <img
              src={icon_3}
              alt="Curated Packages"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-xl font-nunito font-bold text-chocolate">
              Unforgettable Journeys
            </h3>
            <p className="text-sm font-heebo text-neutral mt-2">
              Immerse yourself in experiences that leave lasting memories.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
