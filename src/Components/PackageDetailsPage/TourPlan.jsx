
export const TourPlan = ({ packageData }) => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl md:text-3xl lg:text-4xl  text-center font-nunito font-bold text-chocolate mb-2">
        Tour Plan
      </h2>
      <div className="divider my-0"></div>
      <div className="space-y-4">
        {packageData?.tourPlan && packageData?.tourPlan.map((plan, index) => (
          <div key={index} className="collapse collapse-arrow md:p-4 bg-sand shadow-md rounded-lg border-l-4 border-terracotta" >
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-lg md:text-xl font-nunito font-bold text-chocolate">
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
