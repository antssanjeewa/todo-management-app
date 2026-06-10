"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import api from "@/lib/api";
import { CheckSquare, LogOut } from "lucide-react";
import { toast } from "sonner";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();

	const handleLogout = async () => {
		try {
			await api.post("/logout");
		} catch (error) {
		} finally {
			Cookies.remove("token");
			toast.success("Logged out successfully");
			router.push("/login");
		}
	};

	return (
		<div className="min-h-screen flex flex-col bg-[#0B0F19]">
			<header className="bg-[#111827]/60 backdrop-blur-md border-b border-slate-800/80 px-6 py-4 flex justify-between items-center sticky top-0 z-40">
				<div className="flex items-center gap-2 text-blue-500 font-bold text-xl tracking-wide">
					<CheckSquare
						size={22}
						className="drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]"
					/>
					<span>TaskFlow</span>
				</div>
				<button
					onClick={handleLogout}
					className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-red-400 transition-colors bg-slate-800/40 hover:bg-red-500/10 border border-slate-700/60 px-3 py-1.5 rounded-lg"
				>
					<LogOut size={16} />
					<span>Logout</span>
				</button>
			</header>

			<main className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8">
				{children}
			</main>
		</div>
	);
}
