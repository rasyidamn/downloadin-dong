import {create} from "zustand"

export interface ThemeStore {
   theme: string;
   setTheme: () => void
}

export const useThemeStore = create<ThemeStore>()((set) => ({
   theme: localStorage.getItem("theme") || "light",
   setTheme: () => {
      set((state) => {
         const newTheme = state.theme === "light" ? "dark" : "light"
         localStorage.setItem("theme", newTheme)
         return {theme: newTheme}
      })
   }
}))