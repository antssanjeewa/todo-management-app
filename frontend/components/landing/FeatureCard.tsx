import { ReactNode } from "react";

interface Props {
	icon: ReactNode;
	title: string;
	description: string;
	color: string;
}

export default function FeatureCard({
	icon,
	title,
	description,
	color,
}: Props) {
	return (
		<div className="bg-[#111827]/40 p-6 rounded-xl border border-slate-800/80 hover:border-blue-500/30 transition">
			<div className={`p-2.5 rounded-lg w-fit mb-4 ${color}`}>{icon}</div>

			<h3 className="text-white font-semibold text-lg">{title}</h3>
			<p className="text-slate-400 text-sm mt-2">{description}</p>
		</div>
	);
}
