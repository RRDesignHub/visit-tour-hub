import { createBrowserRouter } from "react-router-dom"
import { MainLayout } from "../Layouts/MainLayout"
import ErrorPage from "../Pages/ErrorPage"
import { Home } from "../Pages/Home"
import Login from "../Pages/Authentication/Login"
import Register from "../Pages/Authentication/Register"

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
])


export default router