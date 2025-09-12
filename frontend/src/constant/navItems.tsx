import { Facebook, InstagramIcon, TwitterIcon, Youtube } from "lucide-react";
import type { JSX } from "react";

interface NavItem {
   title: string;
   path: string;
   icon: JSX.Element;
}

export const navItems: NavItem[] = [
   {
      title: "Youtube",
      path: "/youtube-downloader",
      icon: <Youtube />
   },
   {
      title: "Instagram",
      path: "/instagram-downloader",
      icon: <InstagramIcon />
   },
   {
      title: "Facebook",
      path: "/facebook-downloader",
      icon: <Facebook />
   },
   {
      title: "Twitter",
      path: "/twitter-downloader",
      icon: <TwitterIcon />
   },
]