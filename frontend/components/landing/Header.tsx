import Link from "next/link";
import { CheckSquare } from "lucide-react";

export default function Header() {
    return (
        <header className="bg-[#111827]/50 backdrop-blur-md border-b border-slate-800/60 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
            <div className="flex items-center gap-2 text-blue-500 font-bold text-xl tracking-wide">
                <CheckSquare size={24} />
                <span>TaskFlow</span>
            </div>

            <div className="flex items-center gap-4">
                <Link href="/login" className="text-sm text-slate-400 hover:text-blue-400 px-3 py-2">
                    Login
                </Link>
                <Link href="/register" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500">
                    Sign Up
                </Link>
            </div>
        </header>
    );
}