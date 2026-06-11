"use client";

import AppLogo from "@/components/AppLogo";
import UserInfo from "@/components/user/UserInfo";


export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {



	return (
		<div className="min-h-screen flex flex-col bg-[#0B0F19]">
			<header className="bg-[#111827]/60 backdrop-blur-md border-b border-slate-800/80 px-6 py-4 flex justify-between items-center sticky top-0 z-40">
				<AppLogo />

				<div className="flex items-center gap-4">
					<UserInfo />
				</div>
			</header>

			<main className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8">
				{children}
			</main>
		</div>
	);
}
