import { motion } from "motion/react";
export const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      feedback:
        "TourHub made my trip unforgettable! The guides were professional, and the entire process was seamless.",
      image: "https://i.ibb.co/KK7wg28/images.png",
    },
    {
      id: 2,
      name: "Jane Smith",
      feedback:
        "Booking through TourHub was the best decision! The packages were well-curated, and the experience was fantastic.",
      image: "https://i.ibb.co/KK7wg28/images.png",
    },
    {
      id: 3,
      name: "Alice Johnson",
      feedback:
        "I loved how easy it was to plan my trip with TourHub. Their support team was excellent!",
      image: "https://i.ibb.co/KK7wg28/images.png",
    },
  ];

  return (
    <section className="py-6 md:py-10 lg:py-12 bg-sand">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-2xl max-sm:mb-5 md:text-3xl lg:text-4xl font-nunito font-bold text-chocolate text-center mb-8">
          What Our Tourists Say
        </h2>
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white shadow-lg rounded-lg p-6 text-center"
            >
              <img
              referrerPolicy="no-referrer"
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-terracotta"
              />
              <p className="text-sm font-heebo text-neutral mb-4">
                "{testimonial.feedback}"
              </p>
              <h3 className="text-lg font-nunito font-bold text-chocolate">
                {testimonial.name}
              </h3>
            </div>
          ))}
        </motion.div>
      </div>
    </section>

  )
}
