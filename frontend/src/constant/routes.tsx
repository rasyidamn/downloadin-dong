import type { RouteObject } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import YoutubeDownloader from "../pages/YoutubeDownloader";
import FacebookDownloader from "../pages/FacebookDownloader";
import InstagramDownloader from "../pages/InstagramDownloader";
import TwitterDownloader from "../pages/TwitterDownloader";

export const ROUTES: RouteObject[] = [
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "youtube-downloader", element: <YoutubeDownloader /> },
			{ path: "facebook-downloader", element: <FacebookDownloader /> },
			{ path: "instagram-downloader", element: <InstagramDownloader /> },
			{ path: "twitter-downloader", element: <TwitterDownloader /> },
		],
	},
];
