import { createBrowserRouter } from "react-router-dom"
import { MainLayout } from "../Layouts/MainLayout"
import ErrorPage from "../Pages/ErrorPage"
import { Home } from "../Pages/Home"

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
  }
])


export default router