import { Zap, Shield, LayoutGrid } from "lucide-react";
import FeatureCard from "./FeatureCard";

export default function Features() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 px-4 max-w-6xl mx-auto">
            <FeatureCard
                icon={<Zap size={20} />}
                title="Blazing Fast"
                description="Instant UI updates and smooth performance."
                color="bg-blue-500/10 text-blue-400"
            />

            <FeatureCard
                icon={<Shield size={20} />}
                title="Secure by Default"
                description="Protected authentication and data isolation."
                color="bg-green-500/10 text-green-400"
            />

            <FeatureCard
                icon={<LayoutGrid size={20} />}
                title="Clean Interface"
                description="Minimal and responsive dashboard UI."
                color="bg-purple-500/10 text-purple-400"
            />
        </section>
    );
}