import axios from "axios";
import {useState } from "react";
import { useNavigate } from "react-router-dom";

export const OurGuide = ({guides}) => {
  return (
    <>
      <section className="mb-12">
        <h2 className="text-2xl font-nunito font-bold text-chocolate mb-4">
          Meet Our Tour Guides
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* {guides && guides?.map((guide) => (
            <div
              key={guide.id}
              className="p-4 bg-white shadow-md rounded-lg text-center"
            >
              <img
                src={guide.image}
                alt={guide.name}
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-nunito font-bold text-chocolate">
                {guide.name}
              </h3>
              <p className="text-sm font-heebo text-neutral">
                {guide.specialty}
              </p>
              <button
                onClick={() => navigate(`/guides/${guide.id}`)}
                className="mt-4 px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-chocolate"
              >
                View Profile
              </button>
            </div>
          ))} */}
        </div>
      </section>
    </>
  );
};
