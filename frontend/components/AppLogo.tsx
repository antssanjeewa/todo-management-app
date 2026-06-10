import { CheckSquare } from "lucide-react";

interface AppLogoProps {
    size?: "sm" | "md" | "lg";
    showText?: boolean;
    variant?: "default" | "icon";
}

export default function AppLogo({
    size = "md",
    showText = true,
    variant = "default",
}: AppLogoProps) {
    const iconSize = size === "sm" ? 20 : size === "lg" ? 32 : 24;

    if (variant === "icon") {
        return (
            <div className="bg-blue-600/10 p-3 rounded-xl border border-primary/20">
                <CheckSquare size={iconSize} className="text-primary" />
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2 text-primary font-bold tracking-wide">
            <CheckSquare size={iconSize} className="text-primary" />
            {showText && <span className="text-xl">TaskFlow</span>}
        </div>
    );
}