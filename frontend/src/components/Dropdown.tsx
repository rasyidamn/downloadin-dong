import {  ChevronDown } from "lucide-react";
import { useVideoStore, type Format } from "../store/useVideoStore";
import { formatResolution } from "../utils/formatResolution";
import { downloadUrl } from "../utils/downloadUrl";

export default function Dropdown(props: {title:string, dropdownItem: Format[]}) {
   const {title, dropdownItem} = props
	const {videoInfo} = useVideoStore()
	
	return (
		<div className="dropdown dropdown-right dropdown-center w-fit">
			<div
				tabIndex={0}
				role="button"
				className="btn m-1 btn-secondary"
			>
				{title} <ChevronDown className="size-4" />
			</div>
         <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-20 text-right p-2  border border-secondary/50">
            {dropdownItem.map((item, index)=>(
               <li key={index}><a href={downloadUrl(item.url, videoInfo?.title || "Video")}>{formatResolution(item.resolution)}</a></li>
            ))}
         </ul>
		</div>
	);
}
