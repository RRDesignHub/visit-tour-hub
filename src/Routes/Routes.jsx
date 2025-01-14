import { createBrowserRouter } from "react-router-dom"
import { MainLayout } from "../Layouts/MainLayout"
import ErrorPage from "../Pages/ErrorPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <h1>Home</h1>
      }
    ]
  }
])


export default router