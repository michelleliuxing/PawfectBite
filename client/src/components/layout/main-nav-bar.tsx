"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { PawPrint, Utensils, Calendar, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import type { User } from "next-auth";

export function MainNavBar({ user }: { user?: User }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/pets", label: "My Pets", icon: PawPrint },
    { href: "/recipes", label: "Recipes", icon: Utensils },
    { href: "/calendar", label: "Calendar", icon: Calendar },
  ];

  return (
    <header className="w-full max-w-5xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 z-50 relative">
      <Link href="/" className="flex items-center gap-3 group">
        <div className="relative w-12 h-12 rounded-2xl bg-white border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] overflow-hidden flex items-center justify-center p-1.5 group-hover:-translate-y-1 transition-transform">
          <Image 
            src="/images/logo.PNG" 
            alt="PawfectBite Logo" 
            fill
            className="object-contain p-1"
            priority
          />
        </div>
        <span className="text-2xl font-black tracking-tight text-[#4A3B32]">
          PawfectBite
        </span>
      </Link>

      <nav className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32]">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-colors ${
                  isActive 
                    ? "bg-[#F4D06F] text-[#4A3B32] border-2 border-[#4A3B32]" 
                    : "text-[#4A3B32]/60 hover:text-[#4A3B32] hover:bg-[#FFF9F2] border-2 border-transparent"
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={isActive ? 3 : 2} />
                <span className="hidden sm:inline">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white px-2 py-2 pr-4 rounded-full border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32]">
              {user.image ? (
                <Image 
                  src={user.image} 
                  alt={user.name || "User"} 
                  width={32} 
                  height={32} 
                  className="rounded-full border-2 border-[#4A3B32]"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#F7B2B7] border-2 border-[#4A3B32] flex items-center justify-center">
                  <span className="text-sm font-black text-white">{user.name?.[0] || "U"}</span>
                </div>
              )}
              <span className="font-bold text-sm">{user.name?.split(' ')[0] || "Profile"}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-10 h-10 bg-white rounded-full border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] flex items-center justify-center text-[#4A3B32] hover:bg-[#F7B2B7] hover:text-white transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" strokeWidth={3} />
            </motion.button>
          </div>
        ) : (
          <Link href="/sign-in">
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95, y: 2, boxShadow: "0px 0px 0px #4A3B32" }}
              className="flex items-center gap-2 bg-[#98C9A3] text-white px-6 py-3 rounded-full font-black border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] transition-colors hover:bg-[#A9D4B2]"
            >
              Sign In
            </motion.button>
          </Link>
        )}
      </div>
    </header>
  );
}
