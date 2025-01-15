import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaClipboardList,
  FaPlus,
  FaSignOutAlt,
  FaUsers,
  FaBookOpen,
  FaFileAlt,
} from "react-icons/fa";

const Dashboard = () => {
  const isTourist = true;
  const isTourGuide = false;
  const isAdmin = false;

  return (
    <div className="min-h-screen flex bg-sand">
      {/* Sidebar */}
      <aside className="w-64 bg-chocolate text-sand shadow-lg">
        <div className="py-4 h-full flex flex-col ">
          <h2 className="text-4xl text-center font-nunito font-bold ">
            TourHub
          </h2>
          <h3 className="text-xl font-heebo text-center">Dashboard</h3>
          <div className="divider my-2 h-[2px] bg-[rgba(244,241,222,0.59)]"></div>
          <nav className="space-y-4 px-4">
            <NavLink
              to="/dashboard/home"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-3 px-4 py-2 bg-terracotta text-white rounded-lg"
                  : "flex items-center gap-3 px-4 py-2 hover:bg-terracotta hover:text-white transition rounded-lg"
              }
            >
              <FaHome className="w-5 h-5" />
              Dashboard Home
            </NavLink>

            {/* Tourist-Specific Links */}
            {isTourist && (
              <>
                <NavLink
                  to="/dashboard/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 px-4 py-2 bg-terracotta text-white rounded-lg"
                      : "flex items-center gap-3 px-4 py-2 hover:bg-terracotta hover:text-white transition rounded-lg"
                  }
                >
                  <FaUser className="w-5 h-5" />
                  Manage Profile
                </NavLink>
                <NavLink
                  to="/dashboard/bookings"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 px-4 py-2 bg-terracotta text-white rounded-lg"
                      : "flex items-center gap-3 px-4 py-2 hover:bg-terracotta hover:text-white transition rounded-lg"
                  }
                >
                  <FaClipboardList className="w-5 h-5" />
                  My Bookings
                </NavLink>
                <NavLink
                  to="/dashboard/add-story"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 px-4 py-2 bg-terracotta text-white rounded-lg"
                      : "flex items-center gap-3 px-4 py-2 hover:bg-terracotta hover:text-white transition rounded-lg"
                  }
                >
                  <FaPlus className="w-5 h-5" />
                  Add Stories
                </NavLink>
              </>
            )}

            {/* Tour Guide-Specific Links */}
            {isTourGuide && (
              <>
                <NavLink
                  to="/dashboard/assigned-tours"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 px-4 py-2 bg-terracotta text-white rounded-lg"
                      : "flex items-center gap-3 px-4 py-2 hover:bg-terracotta hover:text-white transition rounded-lg"
                  }
                >
                  <FaClipboardList className="w-5 h-5" />
                  My Assigned Tours
                </NavLink>
                <NavLink
                  to="/dashboard/manage-stories"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 px-4 py-2 bg-terracotta text-white rounded-lg"
                      : "flex items-center gap-3 px-4 py-2 hover:bg-terracotta hover:text-white transition rounded-lg"
                  }
                >
                  <FaBookOpen className="w-5 h-5" />
                  Manage Stories
                </NavLink>
              </>
            )}

            {/* Admin-Specific Links */}
            {isAdmin && (
              <>
                <NavLink
                  to="/dashboard/manage-users"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 px-4 py-2 bg-terracotta text-white rounded-lg"
                      : "flex items-center gap-3 px-4 py-2 hover:bg-terracotta hover:text-white transition rounded-lg"
                  }
                >
                  <FaUsers className="w-5 h-5" />
                  Manage Users
                </NavLink>
                <NavLink
                  to="/dashboard/add-package"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 px-4 py-2 bg-terracotta text-white rounded-lg"
                      : "flex items-center gap-3 px-4 py-2 hover:bg-terracotta hover:text-white transition rounded-lg"
                  }
                >
                  <FaPlus className="w-5 h-5" />
                  Add Package
                </NavLink>
                <NavLink
                  to="/dashboard/manage-candidates"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 px-4 py-2 bg-terracotta text-white rounded-lg"
                      : "flex items-center gap-3 px-4 py-2 hover:bg-terracotta hover:text-white transition rounded-lg"
                  }
                >
                  <FaFileAlt className="w-5 h-5" />
                  Manage Candidates
                </NavLink>
              </>
            )}
          </nav>

          <div className="mt-auto ">
            {/* Logout */}
            <div className="px-4">
            
            <Link to='/' className="flex items-center gap-3 px-4 py-2 hover:bg-terracotta hover:text-white transition rounded-lg">
              <FaHome className="w-5 h-5" />
              Home
            </Link>
            </div>
            <div className="divider my-2 h-[2px] bg-[rgba(244,241,222,0.59)]"></div>
            <p className="text-xs pt-2 text-terracotta text-center">All right reserved | TourHub</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white p-6">
        <header className="flex justify-between items-center pb-6 border-b border-neutral">
          <h1 className="text-3xl font-nunito font-bold text-chocolate">
            Dashboard
          </h1>
        </header>

        {/* Dynamic Section */}
        <section className="mt-6">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
