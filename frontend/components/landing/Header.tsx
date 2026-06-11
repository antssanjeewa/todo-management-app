import Link from "next/link";
import AppLogo from "@/components/AppLogo";

export default function Header() {
	return (
		<header className="bg-[#111827]/50 backdrop-blur-md border-b border-slate-800/60 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
			<Link href="/">
				<AppLogo />
			</Link>

			<div className="flex items-center gap-4">
				<Link
					href="/login"
					className="text-sm text-slate-400 hover:text-primary px-3 py-2 transition-colors"
				>
					Sign In
				</Link>
				<Link
					href="/register"
					className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
				>
					Sign Up
				</Link>
			</div>
		</header>
	);
}
