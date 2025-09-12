import axios from "axios";
import { create } from "zustand";

const API_URL: string = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL


export interface VideoInfo {
	title: string;
	thumbnail: string;
	duration: number;
	formats: Format[];
}

export interface Format {
	ext: EXT;
	resolution: string;
	url: string;
}

export interface FormatVideoList {
	mp4: Format[];
	webm: Format[];
	audio: Format[];
}

export type EXT = "m4a" | "mhtml" | "mp4" | "webm";

interface VideoStore {
	videoInfo: VideoInfo | null;
	setVideoInfo: (data: VideoInfo) => void;
	loading: boolean;
	url: string;
	setUrl: (url: string) => void;
	resetUrl: () => void;
	fetchVideoInfo: () => void;
	getFormattedLists: () => FormatVideoList;
	
}

export const useVideoStore = create<VideoStore>()((set, get) => ({
	videoInfo: null,
	setVideoInfo: (data) => {
		set({ videoInfo: data });
	},
	loading: false,
	url: "",
	setUrl: (url) => {
		set({ url });
		console.log(get().url);
	},
	resetUrl: () => {
		set({ url: "" });
	},
	fetchVideoInfo: async () => {
		set({ loading: true });
		if (get().url.length === 0) {
			console.log("url kosong!");
			set({ loading: false });
			return;
		}
		try {
			const { setVideoInfo } = get();
			const response = await axios.post(`${API_URL}/api/video-info`, {
				url: get().url,
			});
			setVideoInfo(response.data.data);
			console.log(get().videoInfo);
		} catch (error) {
			console.log("terjadi error", error);
		} finally {
			set({ loading: false });
		}
	},
	getFormattedLists: () => {
		const formats = get().videoInfo?.formats;
      const uniqueEntries = new Set()

		if (!formats) {
			return { mp4: [], audio: [], webm: [] };
		}

      const mp4 = formats.filter((format) => {
         if(format.ext === "mp4"){
            const uniqueKey = `${format.ext}-${format.resolution}`
            if(!uniqueEntries.has(uniqueKey)){
               uniqueEntries.add(uniqueKey)
               return true
            }
         }
         return false
      })
      const webm = formats.filter((format) => {
         if(format.ext === "webm" && format.resolution !== "audio only"){
            const uniqueKey = `${format.ext}-${format.resolution}`
            if(!uniqueEntries.has(uniqueKey)){
               uniqueEntries.add(uniqueKey)
               return true
            }
         }
         return false
      })

      const audio = formats.filter((format) => {
         if(format.ext === "m4a"){
            const uniqueKey = `${format.ext}-${format.resolution}`
            if(!uniqueEntries.has(uniqueKey)){
               uniqueEntries.add(uniqueKey)
               return true
            }
         }
         return false
      })

      return {mp4, webm, audio}
	},
}));
