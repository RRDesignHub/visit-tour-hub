import { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TravelGuide = () => {
  const [packages, setPackages] = useState([]);
  const [guides, setGuides] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch random packages
    axios.get("Packages.json").then((res) => setPackages(res.data));
    // Fetch random guides
    axios.get("Guides.json").then((res) => setGuides(res.data));
  }, []);

  return (
    <section className="py-16 bg-white">
      <div>
        <h2 className="text-3xl lg:text-4xl font-nunito font-bold text-chocolate text-center">Tourism and Travel Guide</h2>
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
              {packages && packages?.map((pkg) => (
                <div key={pkg.id} className="card bg-sand shadow-md rounded-lg p-4">
                  <img src={pkg.image} alt={pkg.title} className="rounded-md mb-4" />
                  <h3 className="text-xl font-nunito font-bold text-chocolate">{pkg.title}</h3>
                  <p className="text-sm text-neutral">Type: {pkg.type}</p>
                  <p className="text-sm text-neutral">Price: ${pkg.price}</p>
                  <button
                    onClick={() => navigate(`/packages/${pkg._id}`)}
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
              {guides?.map((guide) => (
                <div key={guide.id} className="card bg-sand shadow-md rounded-lg p-4">
                  <img src={guide.image} alt={guide.name} className="rounded-md mb-4" />
                  <h3 className="text-xl font-nunito font-bold text-chocolate">{guide.name}</h3>
                  <p className="text-sm text-neutral">Experience: {guide.experience} years</p>
                  <p className="text-sm text-neutral">Specialty: {guide.specialty}</p>
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
