import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LoadingSpinner } from "../Shared/LoadingSpinner";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const TravelGuide = () => {
  const navigate = useNavigate();

  // load all packages from db:
  const { data: packages = [], isLoading: packageLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/random-packages`
      );
      return data;
    },
  });

  // load all guide from db:
  const { data: guides = [], isLoading: guideLoading } = useQuery({
    queryKey: ["guides"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/random-tour-guide`
      );
      return data;
    },
  });

  if (guideLoading || packageLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <section className="py-6 md:py-10 lg:py-16 bg-white">
      <div>
        <h2 className="text-2xl max-sm:mb-5 md:text-3xl lg:text-4xl font-nunito font-bold text-chocolate text-center">
          Tourism and Travel Guide
        </h2>
      </div>
      <div className="container mx-auto px-6 lg:px-12">
        <Tabs>
          <TabList>
            <Tab>Our Packages</Tab>
            <Tab>Meet Our Tour Guides</Tab>
          </TabList>

          {/* Our Packages Tab */}
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages &&
                packages?.map((pkg) => (
                  <div
                    key={pkg._id}
                    className="card bg-sand shadow-md rounded-lg p-4"
                  >
                    <img
                      src={pkg?.images[0]}
                      alt={pkg?.title}
                      className="rounded-md mb-4 h-[195px] w-full object-cover"
                    />
                    <h3 className="text-xl font-nunito font-bold text-chocolate">
                      {pkg?.title}
                    </h3>
                    <p className="text-sm text-neutral">Type: {pkg?.type}</p>
                    <p className="text-sm text-neutral">Price: ${pkg?.price}</p>
                    <button
                      onClick={() => navigate(`/package-details/${pkg._id}`)}
                      className="mt-4 px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-chocolate"
                    >
                      View Details
                    </button>
                  </div>
                ))}
            </div>
          </TabPanel>

          {/* Meet Our Tour Guides Tab */}
          <TabPanel>
            <div
              key={guides.map((g) => g._id)}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {guides.map((guide, index) => (
                <>
                  <div
                    key={guide._id}
                    className="p-4 bg-sand shadow-md rounded-lg text-center"
                  >
                    <img
                      src={guide.image}
                      alt={guide.name}
                      className="w-24 h-24 mx-auto rounded-full mb-4 border-2 border-chocolate"
                    />
                    <h3 className="text-xl font-nunito font-bold text-chocolate">
                      {guide.name}
                    </h3>
                    <p className="text-sm font-heebo text-neutral">
                      {guide?.speciality || "General Tours"}
                    </p>
                    <p className="text-sm font-heebo text-neutral">
                      Experience: {guide?.experience} years
                    </p>
                    <Link to={`/guide-details/${guide._id}`}>
                      <button className="mt-4 px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-chocolate">
                        View Profile
                      </button>
                    </Link>
                  </div>
                </>
              ))}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </section>
  );
};

export default TravelGuide;
