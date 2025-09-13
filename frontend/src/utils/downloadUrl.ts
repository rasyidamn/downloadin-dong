const API_URL: string = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL

type DownloadUrl = (url:string, title:string) => string

export const downloadUrl: DownloadUrl = (url, title) => {
   const encodedUrl = encodeURIComponent(url)
   const encodedTitle = encodeURIComponent(title)
   return `${API_URL}/api/video-download?url=${encodedUrl}&title=${encodedTitle}`
}