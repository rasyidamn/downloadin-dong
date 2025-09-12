import { useVideoStore } from "../store/useVideoStore";
import DropdownButton from "./Dropdown";


export default function FormatVideoList() {
	const {  getFormattedLists } = useVideoStore();

	return (
		<div className="flex justify-between">
			<DropdownButton title="mp4" dropdownItem={getFormattedLists().mp4}/>
			<DropdownButton title="webm" dropdownItem={getFormattedLists().webm}/>
			<DropdownButton title="audio only" dropdownItem={getFormattedLists().audio}/>
		</div>
	);
}
