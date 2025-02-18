import { Link } from "react-router-dom";
import { motion } from "motion/react";

export const AboutUs = () => {
  const projects = [
    {
      id: 1,
      title: "Portfolio (Ripanul Alam)",
      description:
        "A personal portfolio website showcasing my projects, skills, and contact information, built using React and hosted on Netlify.",
      image: "https://i.ibb.co.com/qrLH44W/portfolio.png", // Replace with actual project images
      link: "https://ripanulalam.netlify.app/",
    },
    {
      id: 2,
      title: "Cox Crab Restaurant App",
      description:
        "A feature-rich web application for a seafood restaurant, enabling users to explore menus, place online orders, and make reservations.",
      image: "https://i.ibb.co.com/JkVCVGD/cox-crab.png",
      link: "https://cox-crab.surge.sh",
    },
    {
      id: 3,
      title: "BookHub E-commerce App",
      description:
        "An e-commerce platform for purchasing books, featuring user authentication, product browsing, and real-time payment integration.",
      image: "https://i.ibb.co.com/SrK18Lp/book-hub.png",
      link: "https://book-hub-library.surge.sh",
    },
    {
      id: 4,
      title: "School App (Shah Neyamat School)",
      description:
        "An educational management system for Shah Neyamat School, allowing users to access school information, schedules, and announcements.",
      image: "https://i.ibb.co.com/sj2tg8v/school-site.png",
      link: "https://shah-neyamat-school.netlify.app",
    },
    {
      id: 5,
      title: "Visa Navigator App",
      description:
        "A visa application tracking system providing users with real-time updates on visa statuses, document requirements, and application progress.",
      image: "https://i.ibb.co.com/bgXjFWj/visa-hub.png",
      link: "https://visa-hub.surge.sh",
    },
  ];

  return (
    <>
      <motion.div
        // initial={{ x: 300, opacity: 0 }}
        // animate={{ x: 0, opacity: 1 }}
        // exit={{ x: -300, opacity: 0 }}
        // transition={{ duration: 0.5 }}
      >
        <motion.div 
        initial={{  opacity: 0 }}
        animate={{opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto md:px-6 lg:px-12 lg:py-5">
          <div className="bg-neutral p-4 lg:p-6 md:rounded-3xl flex items-center justify-center gap-x-2 md:gap-x-5 lg:gap-x-14">
            <div className="col-lg-5 col-sm-6 position-relative head-inner">
              <div className="mb-2">
                <h2 className="text-md md:text-2xl font-heebo font-semibold text-sand">
                  Hey there, I am
                </h2>
              </div>
              <div className="">
                <h1 className="text-2xl md:text-5xl lg:text-7xl text-white font-nunito font-extrabold">
                  RIPANUL ALAM <br /> RIDOY
                </h1>
                <h3 className="text-xs font-medium md:text-lg lg:text-2xl font-heebo text-sand">
                  Web Designer & Developer
                </h3>
              </div>
              <div className="mt-8">
                <Link
                  href="#my-work"
                  className=" btn bg-sand text-neutral border-2 border-terracotta hover:bg-terracotta hover:border-transparent"
                >
                  MY WORK
                </Link>
              </div>
            </div>
            <div className="w-[150px] md:w-[200px] lg:w-[300px]">
              <img
                className="w-full"
                src="https://i.ibb.co.com/S7gRFtp/hero-potriate-1.png"
                alt=""
              />
            </div>
          </div>
        </motion.div>

        {/* my work */}
        <div id="#my-work" className="container mx-auto px-6 lg:px-12 py-12">
          <h2 className="text-2xl md:text-4xl font-nunito font-bold text-chocolate mb-2 text-center">
            My Work
          </h2>
          <div className="divider border-sand my-0 mb-2"></div>
          <motion.div
            // initial={{ opacity: 0, y: 50 }}
            // whileInView={{ opacity: 1, y: 0 }}
            // viewport={{ once: true }}
            // transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative bg-sand shadow-lg rounded-lg overflow-hidden"
              >
                {/* Project Image */}
                <div className="h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full overflow-hidden object-cover object-top transform group-hover:translate-y-[-100%] transition-transform duration-1000 ease-in-out"
                  />
                </div>

                {/* Project Details */}
                <div className="p-4 text-center">
                  <h3 className="text-xl font-nunito font-bold text-chocolate mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm font-heebo text-neutral mb-4">
                    {project.description}
                  </p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-chocolate transition"
                  >
                    View Project
                  </a>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hero Section */}
        <div
          className="bg-cover bg-center h-fit py-10 flex flex-col items-center justify-center text-center gap-y-5 text-white"
          style={{
            backgroundImage:
              "url('https://i.ibb.co.com/M1K78cB/Sundarban.jpg')",
          }}
        >
          <div className="bg-black bg-opacity-50 p-8 rounded-lg">
            <h1 className="text-4xl font-nunito font-bold">About TourHub</h1>
            <p className="mt-4 text-lg font-heebo">
              Connecting you to the heart of travel – Explore, Experience, and
              Enjoy.
            </p>
          </div>
          <div className="w-11/12 mx-auto bg-black bg-opacity-50 p-8 rounded-lg">
            <h2 className="text-2xl md:text-4xl text-center font-nunito font-bold mb-2">
              Our Mission
            </h2>
            <div className="divider border-sand my-0 mb-2"></div>
            <p className="text-lg font-heebo ">
              Our mission is to connect people with the most authentic travel
              experiences in Bangladesh. Whether you're exploring the
              Sundarbans, the serene hills of Bandarban, or the vibrant beaches
              of Cox's Bazar, TourHub is your guide to unforgettable adventures.
            </p>
          </div>
        </div>

        {/* About Me Section */}
        <div className="mt-12 mb-10 w-11/12 mx-auto bg-sand border border-terracotta p-2 md:p-4 shadow-lg rounded-lg">
          <h2 className="text-2xl md:text-4xl text-center font-nunito font-bold text-chocolate mb-2">
            Meet the Creator
          </h2>
          <div className="divider my-0 mb-2"></div>
          <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <img
                src="https://i.ibb.co.com/S5VDdjL/formal-pic-self.png"
                alt="Profile"
                className="rounded-full mx-auto border-4 border-terracotta w-32 h-32 md:w-48 md:h-48"
              />
            </div>
            {/* Personal Details */}
            <div>
              <h3 className="text-2xl max-sm:text-center font-nunito font-bold text-chocolate">
                Ripanul Alam Ridoy
              </h3>
              <p className="mt-4 max-sm:text-justify text-base md:text-lg font-heebo text-neutral">
                Hello! I'm Ripanul Alam, the creator of TourHub. As a passionate
                developer and travel enthusiast, I built TourHub to help people
                discover the hidden gems of Bangladesh while making travel
                planning simple and enjoyable.
              </p>
              <p className="mt-4 max-sm:text-justify text-base md:text-lg font-heebo text-neutral">
                With years of experience in **MERN stack development**, I
                combine my technical expertise and love for adventure to create
                a platform that inspires people to explore.
              </p>
              <p className="mt-4 max-sm:text-justify text-base md:text-lg font-heebo text-neutral">
                Let's embark on this journey together!
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
