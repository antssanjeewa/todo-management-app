import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
	return (
		<section className="flex flex-col items-center text-center px-4 max-w-4xl mx-auto py-16">
			<span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold px-3 py-1 rounded-full mb-6">
				Smart Task Management
			</span>

			<h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight">
				Organize your tasks
				<br />
				<span className="bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
					in one place.
				</span>
			</h1>

			<p className="mt-6 text-slate-400 max-w-xl text-base sm:text-lg">
				Create todos, set priorities and due dates, and filter your list — all
				from a simple, focused dashboard.
			</p>

			<div className="mt-10 flex flex-col sm:flex-row gap-4">
				<Link
					href="/register"
					className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
				>
					Get Started <ArrowRight size={18} />
				</Link>

				<Link
					href="/login"
					className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 hover:border-slate-600 hover:text-white transition-colors text-center"
				>
					Sign In
				</Link>
			</div>
		</section>
	);
}
