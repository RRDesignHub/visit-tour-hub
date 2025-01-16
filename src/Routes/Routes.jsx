import { createBrowserRouter } from "react-router-dom"
import { MainLayout } from "../Layouts/MainLayout"
import ErrorPage from "../Pages/ErrorPage"
import { Home } from "../Pages/Home"
import Login from "../Pages/Authentication/Login"
import Register from "../Pages/Authentication/Register"
import { ResetPassword } from "../Pages/Authentication/ResetPassword"
import Dashboard from "../Layouts/Dashboard"
import AddPackage from "../Pages/Dashboard/AdminPages/AddPackages"
import { PackageDetails } from "../Pages/PackageDetails"

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: '/package-details/:id', 
        element: <PackageDetails></PackageDetails>
      }
      
    ]
  },
  {
    path: "/login",
    element: <Login></Login>
  },
  {
    path: "/registration",
    element: <Register></Register>
  },
  {
    path: "/reset-password",
    element: <ResetPassword></ResetPassword>
  },
  {
    path: 'dashboard',
    element: <Dashboard></Dashboard>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: 'add-package',
        element: <AddPackage></AddPackage>
      }
    ]
  }
])


export default router