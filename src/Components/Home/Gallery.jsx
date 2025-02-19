import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";

const galleryData = {
  Beaches: [
    {
      id: 1,
      img: "https://i.ibb.co.com/NrzgHSP/Saint-martin.jpg",
      name: "Cox's Bazar",
    },
    {
      id: 2,
      img: "https://i.ibb.co.com/s6sGV9Z/9760927662-17ff9a403e-b.jpg",
      name: "Saint Martin",
    },
    {
      id: 3,
      img: "https://i.ibb.co.com/g4pHxHG/069ecf056b932e37304553ec37b9dc62.jpg",
      name: "Saint Martin",
    },
  ],
  Mountains: [
    {
      id: 4,
      img: "https://i.ibb.co.com/M1K78cB/Sundarban.jpg",
      name: "Sundarban",
    },
    {
      id: 5,
      img: "https://i.ibb.co.com/C9s66dd/sundarban-2.jpg",
      name: "Sundarban",
    },
    {
      id: 6,
      img: "https://i.ibb.co.com/PFMsWjj/aa06d31ec1d326036cef8850b5e1b7c8.jpg",
      name: "Rangamati",
    },
  ],
 Historycal: [
    {
      id: 7,
      img: "https://i.ibb.co.com/RhCY9Hk/Sixty-dome-mosque.jpg",
      name: "Sixty Dome Mosque",
    },
    {
      id: 8,
      img: "https://i.ibb.co.com/rt87xxx/pic-01.jpg",
      name: "Golden Tample",
    },
  ],
};

const Gallery = () => {
  const [selectedTab, setSelectedTab] = useState("Beaches");

  return (
    <div className="py-6 md:py-10 lg:py-16 bg-sand">
      <Tabs defaultValue="Beaches" className="container mx-auto px-6 lg:px-12">
        <TabsList className="flex flex-col md:flex-row justify-center max-sm:items-center md:justify-between bg-white px-4 py-5 rounded-lg">
          <h2 className="text-2xl max-sm:mb-5 md:text-3xl lg:text-4xl font-nunito font-bold text-chocolate text-center mb-0">
            Explore Our Destinations
          </h2>
          <div>
            {Object.keys(galleryData).map((place) => (
              <TabsTrigger
                key={place}
                className="font-heebo data-[state=active]:bg-terracotta data-[state=active]:text-chocolate data-[state=active]:font-semibold px-4 py-2 rounded-lg transition-all"
                value={place}
                onClick={() => setSelectedTab(place)}
              >
                {place}
              </TabsTrigger>
            ))}
          </div>
        </TabsList>

        {Object.entries(galleryData).map(([category, images]) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
              {images.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3 bg-white">
                    <h3 className="text-lg font-heebo text-chocolate text-center font-semibold">
                      {item.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Gallery;
