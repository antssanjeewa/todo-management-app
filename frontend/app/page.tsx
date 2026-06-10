import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Footer from "@/components/Footer";

export default function Page() {
	return (
		<div className="min-h-screen flex flex-col justify-between">
			<Header />
			<main>
				<Hero />
				<Features />
			</main>
			<Footer />
		</div>
	);
}
