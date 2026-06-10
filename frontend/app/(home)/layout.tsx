"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { CheckSquare, LogOut } from "lucide-react";
import { toast } from "sonner";
import AppLogo from "@/components/AppLogo";
import { authService } from "@/services/authService";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();

		const handleLogout = async () => {
			try {
				const response = await authService.logout();
				if (response.success) {
					toast.success(response.message);
					router.push("/login");
				}
			} catch (err: any) {
				console.log("Error: ", err);
			} finally {
			}
		};


	return (
		<div className="min-h-screen flex flex-col bg-[#0B0F19]">
			<header className="bg-[#111827]/60 backdrop-blur-md border-b border-slate-800/80 px-6 py-4 flex justify-between items-center sticky top-0 z-40">
				<AppLogo/>
				<button
					onClick={handleLogout}
					className="flex items-center gap-2 text-sm font-medium text-red-400 hover:text-red-400 transition-colors bg-slate-800/40 hover:bg-red-500/10 border border-red-400/50 px-3 py-1.5 rounded-lg"
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
