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
import { TourGuideProfile } from "../Pages/Dashboard/TouristGuidePages/TourGuideProfile";
import { MyBookings } from "../Pages/Dashboard/TouristPages/MyBookings";
import { MyAssignedTour } from "../Pages/Dashboard/TouristGuidePages/MyAssignedTour";
import { Payment } from "../Pages/Dashboard/TouristPages/StripePayment/Payment";
import { AllTrips } from "../Pages/AllTrips";
import { TouristRoute } from "./TouristRoute";
import { TourGuideRoute } from "./TourGuideRoute";
import AdminRoute from "./AdminRoute";
import { AdminProfile } from "../Pages/Dashboard/AdminPages/AdminProfile";
import { MyAddedPackages } from "../Pages/Dashboard/AdminPages/MyAddedPackages";
import { AddStory } from "../Pages/Dashboard/TouristPages/AddStory";
import { ManageStories } from "../Pages/Dashboard/TouristPages/ManageStories";
import { UpdateStory } from "../Pages/Dashboard/TouristPages/UpdateStory";
import { Community } from "../Pages/Community";
import { AddGuideStory } from "../Pages/Dashboard/TouristGuidePages/AddGuideStory";
import { ManageGuideStories } from "../Pages/Dashboard/TouristGuidePages/ManageGuideStories";
import { UpdatePackage } from "../Pages/Dashboard/AdminPages/UpdatePackage";

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
      {
        path: "/community",
        element: <Community></Community>,
      },
      {
        path: "/all-trips",
        element: <AllTrips></AllTrips>,
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
        element: (
          <TouristRoute>
            <ManageProfile></ManageProfile>
          </TouristRoute>
        ),
      },
      {
        path: "my-bookings",
        element: (
          <TouristRoute>
            <MyBookings></MyBookings>
          </TouristRoute>
        ),
      },
      {
        path: "add-story",
        element: (
          <TouristRoute>
            <AddStory></AddStory>
          </TouristRoute>
        ),
      },
      {
        path: "manage-stories",
        element: (
          <TouristRoute>
            <ManageStories></ManageStories>
          </TouristRoute>
        ),
      },
      {
        path: "update-story/:id",
        element: (
          <TouristRoute>
            <UpdateStory></UpdateStory>
          </TouristRoute>
        ),
      },
      {
        path: "join-as-guide",
        element: (
          <TouristRoute>
            <JoinAsGuide></JoinAsGuide>
          </TouristRoute>
        ),
      },
      {
        path: "payment/:id",
        element: (
          <TouristRoute>
            <Payment></Payment>
          </TouristRoute>
        ),
      },

      // tour-guide routes:
      {
        path: "tour-guide-profile",
        element: (
          <TourGuideRoute>
            <TourGuideProfile></TourGuideProfile>
          </TourGuideRoute>
        ),
      },
      {
        path: "my-assigned-tour",
        element: (
          <TourGuideRoute>
            <MyAssignedTour></MyAssignedTour>
          </TourGuideRoute>
        ),
      },
      {
        path: "add-guide-story",
        element: (
          <TourGuideRoute>
            <AddGuideStory></AddGuideStory>
          </TourGuideRoute>
        ),
      },
      {
        path: "manage-guide-stories",
        element: (
          <TourGuideRoute>
            <ManageGuideStories></ManageGuideStories>
          </TourGuideRoute>
        ),
      },
      {
        path: "update-guide-story/:id",
        element: (
          <TourGuideRoute>
            <UpdateStory></UpdateStory>
          </TourGuideRoute>
        ),
      },

      // admin routes
      {
        path: "admin-profile",
        element: (
          <AdminRoute>
            <AdminProfile></AdminProfile>
          </AdminRoute>
        ),
      },
      {
        path: "add-package",
        element: (
          <AdminRoute>
            <AddPackage></AddPackage>
          </AdminRoute>
        ),
      },
      {
        path: "added-packages",
        element: (
          <AdminRoute>
            <MyAddedPackages></MyAddedPackages>
          </AdminRoute>
        ),
      },
      {
        path: "update-package/:id",
        element: (
          <AdminRoute>
            <UpdatePackage></UpdatePackage>
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "manage-candidates",
        element: (
          <AdminRoute>
            <ManageCandidates></ManageCandidates>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
