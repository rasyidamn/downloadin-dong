import { TwitterIcon } from "lucide-react";
import CardVideo from "../components/CardVideo";
import FormURL from "../components/FormURL";

export default function TwitterDownloader() {
	return (
		<div className="space-y-10 p-4">
			<div className="space-y-10">
				<div>
					<h2 className="text-center text-3xl font-semibold flex justify-center items-center gap-2">
						<span>Unduh video dari Instagram</span> <TwitterIcon className="size-10"/>
					</h2>
				</div>
				<div>
					<FormURL />
				</div>
			</div>

			<CardVideo />
		</div>
	);
}
