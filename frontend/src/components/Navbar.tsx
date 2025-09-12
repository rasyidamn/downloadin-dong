import { Download} from "lucide-react";
import { Link, NavLink } from "react-router";
import ThemeToggle from "./ThemeToggle";
import { navItems } from "../constant/navItems";

export default function Navbar() {
	return (
		<nav className=" bg-base-200 sticky top-0 max-w-7xl mx-auto backdrop-blur-lg border-b border-base-content/10">
			<div className="navbar px-4 justify-between items-center">
				{/* Header */}
				<div className="">
					<Link to="/" className="">
						<div className="flex gap-2">
							<Download size={30} />
							<h1 className=" font-asimovian text-2xl font-black tracking-tight bg-primary text-transparent bg-clip-text">
								Download
								<span className="bg-secondary bg-clip-text">
									In
								</span>
							</h1>
						</div>
					</Link>
				</div>

				<div className="flex gap-2">
					{navItems.map(item => (
						<NavLink
							to={item.path}
							key={item.title}
							className={({ isActive }) =>
								`flex gap-1 rounded-box p-2 text-sm btn btn-ghost hover:text-secondary hover:shadow-none hover:bg-base-300${
									isActive ? " text-accent" : ""
								}`
							}
						>
							{item.icon}
							<span>{item.title}</span>
						</NavLink>
					))}
				</div>

				<div className="">
					<ThemeToggle />
				</div>
			</div>
		</nav>
	);
}
