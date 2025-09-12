type FormatResolution = (resolution:string) => string

export const formatResolution:FormatResolution = (resolution) => {
   return `${resolution.split('x')[1]}${resolution !== "audio only" ? "p" : ""}`

}
