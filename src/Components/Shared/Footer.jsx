import { NavLink } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import logo from "../../assets/main_logo.jpg";
import Container from "./Container";
const Footer = () => {
  return (
    <>
      <footer className="bg-chocolate text-sand py-3 md:py-10">
        <Container>
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 justify-center gap-6 md:gap-8">
            {/* Logo and Description */}
            <div className="flex flex-col items-start">
              <NavLink to="/" className="flex items-center">
                <img
                  src={logo}
                  alt="TourHub Logo"
                  className="w-[150px] mr-2 rounded-xl drop-shadow-2xl"
                />
              </NavLink>
              <p className="font-heebo mt-4">
                Discover the heart of Bangladesh with curated travel
                experiences. Your adventure starts here!
              </p>
              <div className="flex space-x-4 mt-6">
                {/* Social Media Links */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sand hover:text-white transition"
                >
                  <FaFacebookF className="w-6 h-6 hover:text-primary transition hover:scale-110" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sand hover:text-white transition"
                >
                  <FaTwitter className="w-6 h-6 hover:text-primary transition hover:scale-110" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sand hover:text-white transition"
                >
                  <FaInstagram className="w-6 h-6 hover:text-primary transition hover:scale-110" />
                </a>
              </div>
            </div>
            <div className="md:hidden divider my-0 h-[2px] bg-[#f4f1de99]"></div>
            {/* Quick Links */}
            <div className=" md:mx-auto">
              <h3 className="text-xl font-nunito font-bold mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2 font-heebo">
              <li>
                  <NavLink
                    to="/"
                    className="hover:text-terracotta transition"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about-us"
                    className="hover:text-terracotta transition"
                  >
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/all-trips"
                    className="hover:text-terracotta transition"
                  >
                    Trips
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/community"
                    className="hover:text-terracotta transition"
                  >
                    Community
                  </NavLink>
                </li>
                
              </ul>
            </div>
      <div className="md:hidden divider my-0 h-[2px] bg-[#f4f1de99]"></div>
            {/* Contact Info */}
            <div className="md:ms-auto">
              <h3 className="text-xl font-nunito font-bold mb-4">Contact Us</h3>
              <p className="font-heebo">
                Email:{" "}
                <a
                  href="mailto:support@tourhub.com"
                  className="hover:text-terracotta transition"
                >
                  support@tourhub.com
                </a>
              </p>
              <p className="font-heebo">Phone: +880 123 456 789</p>
              <p className="font-heebo">Address: Dhaka, Bangladesh</p>
            </div>
          </div>
          <div className="text-center max-sm:text-xs mt-5 md:mt-10 font-heebo text-primary">
            © {new Date().getFullYear()} TourHub. All rights reserved.
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
