
export const AboutTour = ({packageData}) => {
  return (
    <section className="mb-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-center font-nunito font-bold text-chocolate mb-2">
          About the Tour
        </h2>
        <div className='divider my-0'></div>
        <p className="text-base md:text-lg max-sm:text-justify text-neutral font-heebo mb-2">
          {packageData?.description}
        </p>
        <p className="text-lg max-sm:mt-4 text-neutral font-heebo">
          <strong className="text-lg">Location:</strong> {packageData?.location}.
        </p>
        <ul className="mt-4 list-disc list-inside space-y-2 text-neutral font-heebo">
          <strong className="text-lg">Highlights:</strong>
          {packageData?.highlights && packageData?.highlights.map((highlight, index) => (
            <li className="text-sm" key={index}>{highlight}</li>
          ))}
        </ul>
      </section>
  )
}
