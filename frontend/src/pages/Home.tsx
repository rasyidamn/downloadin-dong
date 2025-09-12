import { FacebookIcon, InstagramIcon, YoutubeIcon } from "lucide-react";
import { Link } from "react-router";

export default function Home() {
	
	return (
		<div className="max-w-4xl mx-auto my-20">
			<div className="space-y-4 p-4">
				<h1 className="text-6xl text-center font-bold text-primary font-asimovian">
					Download<span className="text-secondary">In</span>
				</h1>
				<h2 className="text-xl text-center font-semibold">
					Download video dari Youtube, Instagram, atau Facebook dengan
					mudah dan cepat!
				</h2>
			</div>
			<div className="p-8">
				<div className="flex justify-around">
					<Link to="youtube-downloader">
						<div className="flex flex-col items-center">
							<YoutubeIcon size={50} />
							<span>Youtube</span>
						</div>
					</Link>
					<Link to="instagram-downloader">
						<div className="flex flex-col items-center">
							<InstagramIcon size={50}/>
							<span>Instagram</span>
						</div>
					</Link>
					<Link to="facebook-downloader">
						<div className="flex flex-col items-center">
							<FacebookIcon size={50}/>
							<span>Facebook</span>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}
