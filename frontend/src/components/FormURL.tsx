import { Link2Icon, XIcon } from "lucide-react";
import { useVideoStore } from "../store/useVideoStore";
import type React from "react";

export default function FormURL() {
	const { url, setUrl, resetUrl, fetchVideoInfo, loading } = useVideoStore();

	return (
		<form
			onSubmit={(e) => {
            e.preventDefault()
            fetchVideoInfo()
         }}
			className="flex gap-2 justify-center items-center"
		>
			<label className="input w-full focus-within:outline-none">
				<Link2Icon />
				<input
					type="url"
					placeholder="tempel tautan video disini"
					value={url}
					onChange={(e : React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
				/>
				<button className="active:translate-y-[1px] cursor-pointer" type="button" onClick={resetUrl}>
					<XIcon />
				</button>
			</label>
			<button className="btn btn-primary" type="submit">
				{loading ? (
					<div className="loading loading-dots" />
				) : (
					<span>Unduh</span>
				)}
			</button>
		</form>
	);
}
