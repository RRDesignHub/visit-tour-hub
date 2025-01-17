
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LoadingSpinner } from "../Shared/LoadingSpinner";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const TravelGuide = () => {
  const navigate = useNavigate();

  // load all packages from db:
  const { data: packages = [], isLoading: packageLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/packages`
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

  // const handleCountExperience = async(joined) =>{

  //   const now = new Date();
  //   const joinedDate = new Date(joined);

  //   const dateDiff = now - joinedDate;
  //   return Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365.25));
  // }

  if (guideLoading || packageLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <section className="py-16 bg-white">
      <div>
        <h2 className="text-3xl lg:text-4xl font-nunito font-bold text-chocolate text-center">
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
                      className="rounded-md mb-4"
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {guides.map((guide) => (
                <div
                  key={guide._id}
                  className="card bg-sand shadow-md rounded-lg p-4"
                >
                  <img
                    src={guide.image}
                    alt={guide.name}
                    className="rounded-md mb-4 "
                  />
                  <h3 className="text-xl font-nunito font-bold text-chocolate">
                    {guide.name}
                  </h3>
                  <p className="text-sm text-neutral">
                    Experience: {} years
                  </p>
                  <p className="text-sm text-neutral">
                    Specialty: {guide.speciality}
                  </p>
                  <button
                    onClick={() => navigate(`/guides/${guide._id}`)}
                    className="mt-4 px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-chocolate"
                  >
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </section>
  );
};

export default TravelGuide;
