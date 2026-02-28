"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { HeartPulse } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
    const pathname = usePathname();

    const navLinks = [
        { name: "Dashboard", href: "/" },
        { name: "Input", href: "/input" },
        { name: "Analytics", href: "/analytics" },
        // { name: "Performance", href: "/performance" },
        // { name: "Learning", href: "/learning" },
        { name: "Connect With Me", href: "https://x.com/JAY_VEGAD_" },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-amber-900 group-hover:bg-amber-200 transition-colors">
                        <HeartPulse className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-zinc-950">CardioML</span>
                </Link>

                <div className="flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-[15px] font-medium transition-all hover:text-zinc-950 px-1",
                                pathname === link.href ? "text-zinc-950" : "text-zinc-500"
                            )}
                        >
                            {link.name}
                            {pathname === link.href && (
                                <motion.div
                                    layoutId="navbar-underline"
                                    className="h-px bg-amber-500 mt-0.5"
                                />
                            )}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
