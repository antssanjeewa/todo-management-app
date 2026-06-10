import AppLogo from "@/components/AppLogo";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen flex flex-col">
			<div className="absolute top-8 left-8">
				<Link href="/">
					<AppLogo />
				</Link>
			</div>

			<main className="flex flex-1 items-center max-w-md mx-auto w-full p-4">
				{children}
			</main>

			<Footer />
		</div>
	);
}
