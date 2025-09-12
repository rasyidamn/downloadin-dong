import { useVideoStore } from "../store/useVideoStore"
import {formatDuration} from "../utils/formatDuration"
import FormatVideoList from "./FormatVideoList"

export default function CardVideo() {
   
   const {loading, videoInfo} = useVideoStore()
   return (
      <div className="w-full border border-base-content/30 rounded-xl p-4 transition">
         {loading ? (
            <div className="flex justify-center items-center">
               <div className="loading loading-spinner loading-xl"/>
            </div>
         ) : (
            <div className={`card card-side ${
               videoInfo ? "" : "hidden"
            }`}>
               <figure className="w-1/2 aspect-video">
                  <img src={videoInfo?.thumbnail} alt="" className="aspect-video w-full h-full" />
               </figure>
               <div className="card-body py-0">
                  <h2 className="card-title">{videoInfo?.title}</h2>
                  <p className="text-base-content/50">{formatDuration(videoInfo ? videoInfo.duration : 0)}</p>
                  <div >
                     <p>Format Unduhan:</p>
                     <div className="p-2 border border-base-content/20">
                        <FormatVideoList />
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   )
};
