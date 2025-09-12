import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { useThemeStore } from "../store/useThemeStore";

export default function MainLayout() {
   const {theme} = useThemeStore()
   return (
      <div className="min-h-screen transition font-roboto bg-base-100" data-theme={theme}>
         <Navbar />
         <main className="max-w-4xl mx-auto px-4 py-8">
            <Outlet />
         </main>
      </div>
   )
};
