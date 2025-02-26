import logo from "../../assets/main_logo.jpg";
import { NavLink, Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { TiThMenu } from "react-icons/ti";
import { FaWindowClose } from "react-icons/fa";
import { useState } from "react";
const Navbar = () => {
  const { user, logOut } = useAuth();
  const [openCloseMenu, setOpenCloseMenu] = useState(true);

  const handleOpenCloseMenu = () => {
    setOpenCloseMenu(!openCloseMenu);
  };

  const handleCloseMenu = () => {
    setOpenCloseMenu(false);
  };

  const handleUserLogout = () => {
    logoutUser();
  };
  return (
    <div className="navbar justify-between container px-4 mx-auto">
      <div className="">
        <Link to="/" className="flex gap-2 items-center">
          <img
            className="w-auto h-7 rounded-xl"
            src={logo}
            alt="TourHub Logo"
          />
          <span className="font-extrabold font-nunito text-sand text-xl">
            TourHub
          </span>
        </Link>
      </div>

      {/* menu for small/mobile device */}
      <div className="md:hidden dropdown dropdown-end z-50">
        <div
          tabIndex={0}
          role="button"
          className=" bg-chocolate text-sand"
          onClick={handleOpenCloseMenu} // Toggle menu when clicked
        >
          {openCloseMenu ? (
            <FaWindowClose className="text-2xl" />
          ) : (
            <TiThMenu className="text-2xl" />
          )}
        </div>

        {/* Conditional rendering for menu */}
        {openCloseMenu && (
          <ul
            onBlur={handleCloseMenu}
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-sand rounded-box w-52 space-y-1"
          >
            <li>
              <NavLink className="text-xl" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className="text-xl" to="/community">
                Community
              </NavLink>
            </li>
            <li>
              <NavLink className="text-xl" to="/about-us">
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink className="text-xl" to="/all-trips">
                All Trips
              </NavLink>
            </li>

            {user && (
              <li>
                <NavLink className="text-xl" to="/add-review">
                  Add Review
                </NavLink>
              </li>
            )}

            {!user && (
              <li>
                <NavLink className="text-xl" to="/login">
                  Login
                </NavLink>
              </li>
            )}
            {user && (
              <>
                <div className="divider"></div>
                <div
                  title={user?.displayName}
                  className="w-14 h-14 rounded-full mx-auto border-2 border-terracotta"
                >
                  <img
                    referrerPolicy="no-referrer"
                    alt="User Profile"
                    className="w-full h-full rounded-full"
                    src={user?.photoURL}
                  />
                </div>
                <h3 className="text-md font-semibold text-center pt-1">
                  {user?.displayName}
                </h3>
                <h4 className="text-md text-center pb-5">{user?.email}</h4>
                <li>
                  <NavLink className="text-xl" to={`/dashboard`}>
                    Dashboard
                  </NavLink>
                </li>
                <li className="mt-2">
                  <button
                    onClick={logOut}
                    className="bg-gray-200 block text-lg text-center"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        )}
      </div>

      {/* menu for tab/ large device */}
      <div className="max-sm:hidden">
        <ul className="menu menu-horizontal text-base-100 px-1 space-x-1">
          <li>
            <NavLink
              className={({ isActive }) =>
                `px-2 lg:px-4 py-2 rounded-lg transition duration-300 ${
                  isActive
                    ? "bg-blue-50 text-terracotta font-semibold border-b-4 border-[#E07A5F] active:bg-blue-50 focus:bg-blue-50 active:text-terracotta focus:text-terracotta" // Active state style with a border
                    : "text-base-100"
                } hover:bg-blue-100 hover:text-terracotta `
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
            className={({ isActive }) =>
              `px-2 lg:px-4 py-2 rounded-lg transition duration-300 ${
                isActive
                  ? "bg-blue-50 text-terracotta font-semibold border-b-4 border-[#E07A5F] active:bg-blue-50 focus:bg-blue-50 active:text-terracotta focus:text-terracotta" // Active state style with a border
                  : "text-base-100"
              } hover:bg-blue-100 hover:text-terracotta `
            }
            to="/community">Community</NavLink>
          </li>
          <li>
            <NavLink 
            className={({ isActive }) =>
              `px-2 lg:px-4 py-2 rounded-lg transition duration-300 ${
                isActive
                  ? "bg-blue-50 text-terracotta font-semibold border-b-4 border-[#E07A5F] active:bg-blue-50 focus:bg-blue-50 active:text-terracotta focus:text-terracotta" // Active state style with a border
                  : "text-base-100"
              } hover:bg-blue-100 hover:text-terracotta `
            }
            to="/about-us">About Us</NavLink>
          </li>
          <li>
            <NavLink 
            className={({ isActive }) =>
              `px-2 lg:px-4 py-2 rounded-lg transition duration-300 ${
                isActive
                  ? "bg-blue-50 text-terracotta font-semibold border-b-4 border-[#E07A5F] active:bg-blue-50 focus:bg-blue-50 active:text-terracotta focus:text-terracotta" // Active state style with a border
                  : "text-base-100"
              } hover:bg-blue-100 hover:text-terracotta `
            }
            to="/all-trips">All Trips</NavLink>
          </li>
          {user && (
            <li>
              <NavLink 
              className={({ isActive }) =>
                `px-2 lg:px-4 py-2 rounded-lg transition duration-300 ${
                  isActive
                    ? "bg-blue-50 text-terracotta font-semibold border-b-4 border-[#E07A5F] active:bg-blue-50 focus:bg-blue-50 active:text-terracotta focus:text-terracotta" // Active state style with a border
                    : "text-base-100"
                } hover:bg-blue-100 hover:text-terracotta `
              }
              to="/add-review">Add Review</NavLink>
            </li>
          )}
        </ul>
      </div>

      {/* right profile pic with dropdown for large device */}
      <div className="flex-none max-sm:hidden">
        <ul className="menu menu-horizontal text-base-100 px-1">
          {!user && (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          )}
        </ul>

        {user && (
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn bg-chocolate btn-circle avatar"
            >
              <div title={user?.displayName} className="w-10 rounded-full">
                <img
                  referrerPolicy="no-referrer"
                  alt="User Profile Photo"
                  src={user?.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <h3 className="text-md font-semibold text-center pt-5">
                {user?.displayName}
              </h3>
              <h4 className="text-md text-center pb-5">{user?.email}</h4>
              <li>
                <NavLink to={`/dashboard`}>Dashboard</NavLink>
              </li>
              <li className="mt-2">
                <button
                  onClick={logOut}
                  className="bg-gray-200 block text-center"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
