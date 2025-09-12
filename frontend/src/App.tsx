import { createBrowserRouter, RouterProvider } from "react-router"
import { ROUTES } from "./constant/routes"

export default function App() {
  const router = createBrowserRouter(ROUTES)
  

  return <RouterProvider router={router} />
};
