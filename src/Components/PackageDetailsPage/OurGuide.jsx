
export const OurGuide = ({ guides }) => {
  return (
    <>
      <section className="mb-12">
        <h2 className="text-4xl text-center font-nunito font-bold text-chocolate mb-2">
          Meet Our Tour Guides
        </h2>
        <div className="divider mt-0"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guides &&
            guides?.map((guide) => (
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
                  {guide.speciality || "General Tours"}
                </p>
                <button
                  onClick={() => navigate(`/guides/${guide.id}`)}
                  className="mt-4 px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-chocolate"
                >
                  View Profile
                </button>
              </div>
            ))}
        </div>
      </section>
    </>
  );
};
