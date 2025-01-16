import React from "react";

export const TourPlan = ({ packageData }) => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-nunito font-bold text-chocolate mb-4">
        Tour Plan
      </h2>
      <div className="space-y-4">
        {packageData?.tourPlan && packageData?.tourPlan.map((plan, index) => (
          <div key={index} className="collapse collapse-arrow p-4 bg-white shadow-md rounded-lg border-l-4 border-terracotta" >
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-nunito font-bold text-chocolate">
              Day {plan?.day}
            </div>
            <div className="collapse-content text-neutral font-heebo">
              {plan?.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
