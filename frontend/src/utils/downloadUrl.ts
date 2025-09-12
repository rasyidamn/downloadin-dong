type DownloadUrl = (url:string, title:string) => string

export const downloadUrl: DownloadUrl = (url, title) => {
   const encodedUrl = encodeURIComponent(url)
   const encodedTitle = encodeURIComponent(title)
   return `/api/video-download?url=${encodedUrl}&title=${encodedTitle}`
}