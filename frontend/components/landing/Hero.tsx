import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="flex flex-col items-center text-center px-4 max-w-4xl mx-auto py-16">
            <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold px-3 py-1 rounded-full mb-6">
                Smart Task Management
            </span>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-none">
                Manage your daily tasks <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    with absolute control.
                </span>
            </h1>

            <p className="mt-6 text-slate-400 max-w-xl">
                A lightning-fast workspace designed for productivity and task management.
            </p>

            <div className="mt-10 flex gap-4">
                <Link
                    href="/register"
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl"
                >
                    Get Started Free <ArrowRight size={18} />
                </Link>

                <Link
                    href="/login"
                    className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300"
                >
                    Already have an account?
                </Link>
            </div>
        </section>
    );
}