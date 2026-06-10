"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import AppLogo from "@/components/AppLogo";
import { authService } from "@/services/authService";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.SubmitEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await authService.login({
				email,
				password,
			});

			if (response.success) {
				toast.success(response.message);
				router.push("/dashboard");
			}
		} catch (err: any) {
			toast.error(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-full bg-foreground/5 border rounded-2xl p-8 backdrop-blur-sm shadow-xl">
			<div className="flex flex-col items-center mb-8">
				<AppLogo size="lg" showText={false} variant="icon" />
				<h1 className="text-2xl font-bold text-white mt-4">Welcome Back</h1>
				<p className="text-slate-400 text-sm">
					Sign in to manage your productivity
				</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-5">
				<div className="space-y-2">
					<Label>Email Address</Label>
					<Input
						type="email"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="name@example.com"
					/>
				</div>

				<div className="space-y-2">
					<Label>Password</Label>
					<div className="relative">
						<Input
							type={showPassword ? "text" : "password"}
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="••••••••"
							className="pr-10"
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black transition-colors"
						>
							{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
						</button>
					</div>
				</div>

				<Button type="submit" className="w-full h-11" disabled={loading}>
					{loading ? <Loader2 size={18} className="animate-spin" /> : "Sign In"}
				</Button>
			</form>

			<p className="text-center text-sm text-slate-400 mt-6">
				Don't have an account?{" "}
				<Link href="/register" className="text-primary hover:underline">
					Register here
				</Link>
			</p>
		</div>
	);
}
