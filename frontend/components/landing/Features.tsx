import { CalendarClock, ListFilter, ShieldCheck } from "lucide-react";
import FeatureCard from "./FeatureCard";

export default function Features() {
	return (
		<section className="mt-20 px-4 max-w-6xl mx-auto pb-16">
			<div className="text-center mb-10">
				<h2 className="text-2xl sm:text-3xl font-bold text-white">
					Everything you need to stay on track
				</h2>
				<p className="mt-3 text-slate-400 max-w-2xl mx-auto">
					Built for personal productivity — with the features you&apos;d expect
					from a modern todo app.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<FeatureCard
					icon={<CalendarClock size={20} />}
					title="Priorities & Due Dates"
					description="Set low, medium, or high priority and track due dates with overdue indicators."
					color="bg-blue-500/10 text-blue-400"
				/>

				<FeatureCard
					icon={<ListFilter size={20} />}
					title="Search & Filter"
					description="Find tasks quickly with search, status and priority filters, and paginated lists."
					color="bg-purple-500/10 text-purple-400"
				/>

				<FeatureCard
					icon={<ShieldCheck size={20} />}
					title="Your Private Workspace"
					description="Register once, sign in securely, and manage only your own todos."
					color="bg-green-500/10 text-green-400"
				/>
			</div>
		</section>
	);
}
