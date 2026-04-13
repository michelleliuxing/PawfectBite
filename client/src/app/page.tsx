"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Heart, ShieldCheck, Sparkles, Utensils, ArrowRight } from "lucide-react";
import { MainNavBar } from "@/components/layout/main-nav-bar";

export default function LandingPage() {
  const { data: session } = useSession();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F2] text-[#4A3B32] font-sans overflow-hidden selection:bg-[#F7B2B7] selection:text-[#4A3B32]">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#F4D06F]/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-48 h-48 bg-[#F7B2B7]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-[#98C9A3]/20 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="relative z-10 w-full"
      >
        <MainNavBar user={session?.user} />
      </motion.div>

      <main className="relative z-10 max-w-5xl mx-auto px-6 pb-12 md:pb-20 pt-4 md:pt-8 flex flex-col items-center">
        {/* Hero Section */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full grid lg:grid-cols-2 gap-12 items-center mb-32"
        >
          {/* Left Column: Text Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] mb-8 rotate-[-2deg]">
              <Sparkles className="w-5 h-5 text-[#E88D72]" fill="#E88D72" />
              <span className="font-bold text-sm md:text-base">AI-Powered & Vet-Approved</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black leading-[1.1] mb-6 tracking-tight">
              Pawfect Bite for your <span className="text-[#E88D72] relative inline-block">
                best friend
                <svg className="absolute w-full h-4 -bottom-1 left-0 text-[#F4D06F] -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 10 Q 50 20 100 10" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl font-medium text-[#4A3B32]/80 mb-10 max-w-xl leading-relaxed">
              Create personalized, veterinary-safe homemade recipes tailored perfectly to your dog or cat&apos;s unique needs. Because they deserve the best.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/pets/new" passHref>
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95, y: 4, boxShadow: "0px 0px 0px #4A3B32" }}
                  className="group flex items-center justify-center gap-3 bg-[#E88D72] text-white px-8 py-4 rounded-full font-black text-lg border-4 border-[#4A3B32] shadow-[6px_6px_0px_#4A3B32] transition-all w-full"
                >
                  Create Pet Profile
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link href="#how-it-works" passHref>
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95, y: 4, boxShadow: "0px 0px 0px #4A3B32" }}
                  className="flex items-center justify-center gap-3 bg-white text-[#4A3B32] px-8 py-4 rounded-full font-bold text-lg border-4 border-[#4A3B32] shadow-[6px_6px_0px_#4A3B32] transition-all hover:bg-[#FFF9F2] w-full"
                >
                  See How It Works
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Large Logo Image */}
          <motion.div 
            variants={itemVariants} 
            className="relative w-full max-w-md mx-auto aspect-square lg:max-w-none"
          >
            <div className="absolute inset-0 bg-[#F4D06F]/30 rounded-full blur-3xl -z-10 transform translate-y-10" />
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative w-full h-full"
            >
              <Image 
                src="/images/logo.PNG" 
                alt="PawfectBite Hero Logo" 
                fill
                className="object-contain drop-shadow-[0_20px_20px_rgba(74,59,50,0.15)]"
                priority
              />
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Features / How it Works */}
        <motion.section 
          id="how-it-works"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="w-full grid md:grid-cols-3 gap-8 mb-32"
        >
          {/* Feature 1 */}
          <motion.div 
            whileHover={{ y: -8, rotate: -1 }}
            className="bg-white p-8 rounded-[2rem] border-4 border-[#4A3B32] shadow-[8px_8px_0px_#4A3B32] flex flex-col items-center text-center relative"
          >
            <div className="w-16 h-16 bg-[#F7B2B7] rounded-2xl border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] flex items-center justify-center mb-6 -mt-12 rotate-[-6deg]">
              <Heart className="w-8 h-8 text-white" fill="white" />
            </div>
            <h3 className="text-2xl font-black mb-3">Tell Us About Them</h3>
            <p className="font-medium text-[#4A3B32]/80 leading-relaxed">
              Age, weight, allergies, and picky habits. We take every little detail into account.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div 
            whileHover={{ y: -8, rotate: 1 }}
            className="bg-[#F4D06F] p-8 rounded-[2rem] border-4 border-[#4A3B32] shadow-[8px_8px_0px_#4A3B32] flex flex-col items-center text-center relative"
          >
            <div className="w-16 h-16 bg-white rounded-2xl border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] flex items-center justify-center mb-6 -mt-12 rotate-[3deg]">
              <ShieldCheck className="w-8 h-8 text-[#98C9A3]" strokeWidth={3} />
            </div>
            <h3 className="text-2xl font-black mb-3">Vet-Safe AI Engine</h3>
            <p className="font-medium text-[#4A3B32]/80 leading-relaxed">
              Our smart engine cross-references veterinary nutritional guidelines to ensure absolute safety.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div 
            whileHover={{ y: -8, rotate: -1 }}
            className="bg-white p-8 rounded-[2rem] border-4 border-[#4A3B32] shadow-[8px_8px_0px_#4A3B32] flex flex-col items-center text-center relative"
          >
            <div className="w-16 h-16 bg-[#98C9A3] rounded-2xl border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] flex items-center justify-center mb-6 -mt-12 rotate-[-3deg]">
              <Utensils className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-black mb-3">Cook with Love</h3>
            <p className="font-medium text-[#4A3B32]/80 leading-relaxed">
              Get easy-to-follow, perfectly portioned recipes using fresh ingredients you trust.
            </p>
          </motion.div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, type: "spring" }}
          className="w-full bg-[#98C9A3] rounded-[3rem] border-4 border-[#4A3B32] shadow-[12px_12px_0px_#4A3B32] p-10 md:p-16 text-center relative overflow-hidden"
        >
          {/* Decorative background elements in CTA */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl" />
             <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#4A3B32]/5 rounded-full blur-2xl" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 drop-shadow-[0_2px_2px_rgba(74,59,50,0.3)]" style={{ textShadow: "2px 2px 0px #4A3B32, -2px -2px 0px #4A3B32, 2px -2px 0px #4A3B32, -2px 2px 0px #4A3B32" }}>
              Ready to make mealtime magical?
            </h2>
            <p className="text-xl font-bold text-[#4A3B32] mb-10 bg-white/50 px-6 py-2 rounded-full inline-block border-2 border-[#4A3B32]">
              Join thousands of happy, healthy pets.
            </p>
            <Link href="/pets/new" passHref>
              <motion.button 
                whileHover={{ scale: 1.05, y: -4, rotate: 1 }}
                whileTap={{ scale: 0.95, y: 4, boxShadow: "0px 0px 0px #4A3B32" }}
                className="bg-[#F7B2B7] text-[#4A3B32] px-10 py-5 rounded-full font-black text-xl border-4 border-[#4A3B32] shadow-[8px_8px_0px_#4A3B32] transition-all flex items-center gap-3"
              >
                <Heart fill="#4A3B32" className="w-6 h-6" />
                Start For Free
              </motion.button>
            </Link>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="w-full mt-24 pt-8 border-t-4 border-[#4A3B32]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-bold text-[#4A3B32]/60">
          <p>© {new Date().getFullYear()} PawfectBite. Crafted with care.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#E88D72] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#E88D72] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#E88D72] transition-colors">Contact</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
