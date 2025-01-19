
export const AboutTour = ({packageData}) => {
  return (
    <section className="mb-12">
        <h2 className="text-4xl text-center font-nunito font-bold text-chocolate mb-2">
          About the Tour
        </h2>
        <div className='divider my-0'></div>
        <p className="text-lg text-neutral font-heebo mb-2">
          {packageData?.description}
        </p>
        <p className="text-lg text-neutral font-heebo">
          <strong>Location:</strong> {packageData?.location}.
        </p>
        <ul className="mt-4 list-disc list-inside text-neutral font-heebo">
          <strong>Highlights:</strong>
          {packageData?.highlights && packageData?.highlights.map((highlight, index) => (
            <li key={index}>{highlight}</li>
          ))}
        </ul>
      </section>
  )
}
