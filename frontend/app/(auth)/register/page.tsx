"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff } from "lucide-react";
import AppLogo from "@/components/AppLogo";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
	const { setUser } = useAuth();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.SubmitEvent) => {
		e.preventDefault();
		if (password !== passwordConfirmation) {
			return toast.error("Passwords do not match");
		}

		setLoading(true);

		try {
			const response = await authService.register({
				name,
				email,
				password,
				password_confirmation: passwordConfirmation,
			});

			if (response.success) {
				toast.success(response.message);
				setUser(response.data);
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
			<div className="flex flex-col items-center mb-6">
				<AppLogo size="lg" showText={false} variant="icon" />
				<h1 className="text-2xl font-bold text-white mt-3">Create Account</h1>
				<p className="text-slate-400 text-sm mt-1">
					Get started with your free profile
				</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="space-y-2">
					<Label>Full Name</Label>
					<Input
						type="text"
						required
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="John Doe"
					/>
				</div>

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
							placeholder="•••••••• (Min 8 characters)"
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

				<div className="space-y-2">
					<Label>Confirm Password</Label>
					<div className="relative">
						<Input
							type={showConfirmPassword ? "text" : "password"}
							required
							value={passwordConfirmation}
							onChange={(e) => setPasswordConfirmation(e.target.value)}
							placeholder="••••••••"
							className="pr-10"
						/>
						<button
							type="button"
							onClick={() => setShowConfirmPassword(!showConfirmPassword)}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
						>
							{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
						</button>
					</div>
				</div>

				<Button type="submit" className="w-full h-11" disabled={loading}>
					{loading ? (
						<Loader2 size={18} className="animate-spin" />
					) : (
						"Register"
					)}
				</Button>
			</form>

			<p className="text-center text-sm text-slate-400 mt-6">
				Already have an account?{" "}
				<Link href="/login" className="text-primary hover:underline">
					Login
				</Link>
			</p>
		</div>
	);
}

