import { useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaClipboardList,
  FaPlus,
  FaUsers,
  FaBookOpen,
  FaFileAlt,
} from "react-icons/fa";
import { useRole } from "../Hooks/useRole";
import { TbArrowGuideFilled } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { FaUsersGear, FaUsersBetweenLines } from "react-icons/fa6";
import { LuPackagePlus } from "react-icons/lu";
import { MdBookmarkAdded } from "react-icons/md";
const Dashboard = () => {
  const [userRole] = useRole();
  const { isTourist, isTourGuide, isAdmin } = userRole;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin) {
      navigate("/dashboard/admin-profile"); // Admin default route
    } else if (isTourGuide) {
      navigate("/dashboard/tour-guide-profile"); // Tour guide default route
    } else if (isTourist) {
      navigate("/dashboard/tourist-profile"); // Tourist default route
    }
  }, [isAdmin, isTourGuide, isTourist, navigate]);
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
            {/* Tourist-Specific Links */}
            {isTourist && (
              <>
                <NavLink
                  to="/dashboard/tourist-profile"
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
                  to="/dashboard/my-bookings"
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
                <NavLink
                  to="/dashboard/join-as-guide"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 px-4 py-2 bg-terracotta text-white rounded-lg"
                      : "flex items-center gap-3 px-4 py-2 hover:bg-terracotta hover:text-white transition rounded-lg"
                  }
                >
                  <TbArrowGuideFilled className="w-5 h-5" />
                  Join as Guid
                </NavLink>
              </>
            )}

            {/* Tour Guide-Specific Links */}
            {isTourGuide && (
              <>
                <NavLink
                  to="/dashboard/tour-guide-profile"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 px-4 py-2 bg-terracotta text-white rounded-lg"
                      : "flex items-center gap-3 px-4 py-2 hover:bg-terracotta hover:text-white transition rounded-lg"
                  }
                >
                  <CgProfile className="w-5 h-5" />
                  Manage Profile
                </NavLink>
                <NavLink
                  to="/dashboard/my-assigned-tour"
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
                  to="/dashboard/add-guide-story"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 px-4 py-2 bg-terracotta text-white rounded-lg"
                      : "flex items-center gap-3 px-4 py-2 hover:bg-terracotta hover:text-white transition rounded-lg"
                  }
                >
                  <FaPlus className="w-5 h-5" />
                 Add Story
                </NavLink>
                <NavLink
                  to="/dashboard/manage-guide-stories"
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
                  to="/dashboard/admin-profile"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 px-4 py-2 bg-terracotta text-white rounded-lg"
                      : "flex items-center gap-3 px-4 py-2 hover:bg-terracotta hover:text-white transition rounded-lg"
                  }
                >
                  <CgProfile className="w-5 h-5" />
                  Manage Profile
                </NavLink>
                <NavLink
                  to="/dashboard/manage-users"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 px-4 py-2 bg-terracotta text-white rounded-lg"
                      : "flex items-center gap-3 px-4 py-2 hover:bg-terracotta hover:text-white transition rounded-lg"
                  }
                >
                  <FaUsersGear className="w-5 h-5" />
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
                  <LuPackagePlus className="w-5 h-5" />
                  Add Package
                </NavLink>
                <NavLink
                  to="/dashboard/added-packages"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 px-4 py-2 bg-terracotta text-white rounded-lg"
                      : "flex items-center gap-3 px-4 py-2 hover:bg-terracotta hover:text-white transition rounded-lg"
                  }
                >
                  <MdBookmarkAdded className="w-5 h-5" />
                  My Added Packages
                </NavLink>
                <NavLink
                  to="/dashboard/manage-candidates"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 px-4 py-2 bg-terracotta text-white rounded-lg"
                      : "flex items-center gap-3 px-4 py-2 hover:bg-terracotta hover:text-white transition rounded-lg"
                  }
                >
                  <FaUsersBetweenLines className="w-5 h-5" />
                  Manage Candidates
                </NavLink>
                <NavLink
                  to="/dashboard/add-admin-story"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 px-4 py-2 bg-terracotta text-white rounded-lg"
                      : "flex items-center gap-3 px-4 py-2 hover:bg-terracotta hover:text-white transition rounded-lg"
                  }
                >
                  <FaPlus className="w-5 h-5" />
                 Add Story
                </NavLink>
                <NavLink
                  to="/dashboard/manage-admin-stories"
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
          </nav>

          <div className="mt-auto ">
            {/* Logout */}
            <div className="px-4">
              <Link
                to="/"
                className="flex items-center gap-3 px-4 py-2 hover:bg-terracotta hover:text-white transition rounded-lg"
              >
                <FaHome className="w-5 h-5" />
                Home
              </Link>
            </div>
            <div className="divider my-2 h-[2px] bg-[rgba(244,241,222,0.59)]"></div>
            <p className="text-xs pt-2 text-terracotta text-center">
              All right reserved | TourHub
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-sand ">
        {/* Dynamic Section */}
        <section className="">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
