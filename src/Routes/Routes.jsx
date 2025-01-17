import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../Layouts/MainLayout";
import ErrorPage from "../Pages/ErrorPage";
import { Home } from "../Pages/Home";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import { ResetPassword } from "../Pages/Authentication/ResetPassword";
import Dashboard from "../Layouts/Dashboard";
import AddPackage from "../Pages/Dashboard/AdminPages/AddPackages";
import { PackageDetails } from "../Pages/PackageDetails";
import { ManageProfile } from "../Pages/Dashboard/TouristPages/ManageProfile";
import { JoinAsGuide } from "../Pages/Dashboard/TouristPages/JoinAsGuide";
import PrivateRoute from "./PrivateRoute";
import { ManageUsers } from "../Pages/Dashboard/AdminPages/ManageUsers";
import { ManageCandidates } from "../Pages/Dashboard/AdminPages/ManageCandidates";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/package-details/:id",
        element: <PackageDetails></PackageDetails>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/registration",
    element: <Register></Register>,
  },
  {
    path: "/reset-password",
    element: <ResetPassword></ResetPassword>,
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      // tourists routes:
      {
        path: "tourist-profile",
        element: <ManageProfile></ManageProfile>,
      },
      {
        path: "join-as-guide",
        element: <JoinAsGuide></JoinAsGuide>,
      },

      // admin routes
      {
        path: "add-package",
        element: <AddPackage></AddPackage>,
      },
      {
        path: 'manage-users',
        element: <ManageUsers></ManageUsers>
      },
      {
        path: 'manage-candidates',
        element: <ManageCandidates></ManageCandidates>
      }
    ],
  },
]);

export default router;
