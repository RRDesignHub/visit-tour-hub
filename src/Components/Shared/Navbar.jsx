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
          <img className="w-auto h-7 " src={logo} alt="TourHub Logo" />
          <span className="font-bold text-sand text-2xl">TourHub</span>
        </Link>
      </div>

      <div className="dropdown dropdown-end z-50">
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-sand rounded-box w-52"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/community">Community</NavLink>
            </li>
            <li>
              <NavLink to="/about-us">About Us</NavLink>
            </li>
            <li>
              <NavLink to="/all-trips">All Trips</NavLink>
            </li>

            {!user && (
              <li>
                <NavLink to="/login">Login</NavLink>
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
              </>
            )}
          </ul>
        )}

        {/* User Profile Dropdown */}
        {/* {user && (
          <div className="dropdown dropdown-end z-50 mt-3">
            <div
              tabIndex={0}
              role="button"
              className="btn bg-chocolate btn-circle avatar"
            >
              <div title={user?.displayName} className="w-10 rounded-full">
                <img
                  referrerPolicy="no-referrer"
                  alt="User Profile"
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
        )} */}
      </div>

      <div className="max-sm:hidden">
        <ul className="menu menu-horizontal text-base-100 px-1">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/community">Community</NavLink>
          </li>
          <li>
            <NavLink to="/about-us">About Us</NavLink>
          </li>
          <li>
            <NavLink to="/all-trips">All Trips</NavLink>
          </li>
        </ul>
      </div>
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
