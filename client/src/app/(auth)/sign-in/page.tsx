"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { motion, Variants } from "framer-motion";
import { Sparkles, Heart, PawPrint } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

function SignInContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/pets";
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row w-full bg-[#FFF9F2] text-[#4A3B32] overflow-hidden">
      
      {/* Left Half: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 py-12 lg:px-24 relative z-10">
        
        {/* Decorative background blobs for left side */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-10 -left-10 w-40 h-40 bg-[#F7B2B7]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-[#98C9A3]/20 rounded-full blur-3xl" />
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-md w-full mx-auto lg:mx-0"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
            <div className="inline-flex items-center gap-2 bg-[#F4D06F] px-3 py-1.5 rounded-full border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] rotate-[2deg]">
              <Sparkles className="w-4 h-4 text-white" fill="white" />
              <span className="font-bold text-sm">Welcome Back!</span>
            </div>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-black leading-[1.1] mb-4 tracking-tight">
            Log in to your <br/>
            <span className="text-[#E88D72] relative inline-block">
              pet&apos;s kitchen
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#98C9A3] -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0 10 Q 50 20 100 10" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round"/>
              </svg>
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg font-medium text-[#4A3B32]/80 mb-10 leading-relaxed">
            Ready to whip up something delicious and healthy for your furry best friend? Let&apos;s get cooking!
          </motion.p>

          <motion.div variants={itemVariants}>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97, y: 4, boxShadow: "0px 0px 0px #4A3B32" }}
              onClick={() => signIn("google", { callbackUrl })}
              className="w-full flex items-center justify-center gap-4 bg-white text-[#4A3B32] px-8 py-5 rounded-2xl font-black text-lg border-4 border-[#4A3B32] shadow-[6px_6px_0px_#4A3B32] transition-all"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </motion.button>
          </motion.div>

          <motion.p variants={itemVariants} className="mt-8 text-center text-sm font-bold text-[#4A3B32]/50">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </motion.p>
        </motion.div>
      </div>

      {/* Right Half: Interactive/Decorative Section */}
      <div className="hidden lg:flex w-1/2 bg-[#F4D06F] border-l-4 border-[#4A3B32] relative items-center justify-center overflow-hidden">
        
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#4A3B32 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
        
        {/* Floating Decorative Elements */}
        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }} 
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute top-20 left-20 bg-white p-4 rounded-2xl border-4 border-[#4A3B32] shadow-[6px_6px_0px_#4A3B32] rotate-[-10deg]"
        >
          <Heart className="w-8 h-8 text-[#F7B2B7]" fill="#F7B2B7" />
        </motion.div>

        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} 
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-32 right-20 bg-white p-4 rounded-full border-4 border-[#4A3B32] shadow-[6px_6px_0px_#4A3B32] rotate-[15deg]"
        >
          <PawPrint className="w-10 h-10 text-[#98C9A3]" fill="#98C9A3" />
        </motion.div>

        <motion.div 
          animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }} 
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-40 right-32 bg-white p-3 rounded-xl border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] rotate-[5deg]"
        >
          <Sparkles className="w-6 h-6 text-[#E88D72]" fill="#E88D72" />
        </motion.div>

        {/* Main Logo & Interactive Food Icons */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
          className="relative z-10 w-[80%] max-w-lg aspect-square flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-white/40 rounded-full blur-3xl -z-10" />
          
          {/* Food Icon: Bone */}
          <motion.div
            drag
            dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
            whileHover={{ scale: 1.15, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            animate={{ y: [0, -15, 0], rotate: [-10, 0, -10] }}
            transition={{ y: { repeat: Infinity, duration: 4, ease: "easeInOut" }, rotate: { repeat: Infinity, duration: 5, ease: "easeInOut" } }}
            className="absolute top-[5%] left-[10%] w-24 h-24 cursor-grab active:cursor-grabbing z-20"
          >
            <Image src="/food-icons/bone.png" alt="Bone" fill className="object-contain drop-shadow-[4px_4px_0px_#4A3B32]" />
          </motion.div>

          {/* Food Icon: Drumstick */}
          <motion.div
            drag
            dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
            whileHover={{ scale: 1.15, rotate: -10 }}
            whileTap={{ scale: 0.9 }}
            animate={{ y: [0, 15, 0], rotate: [10, 0, 10] }}
            transition={{ y: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }, rotate: { repeat: Infinity, duration: 6, ease: "easeInOut" } }}
            className="absolute top-[15%] right-[5%] w-28 h-28 cursor-grab active:cursor-grabbing z-20"
          >
            <Image src="/food-icons/drumstick.png" alt="Drumstick" fill className="object-contain drop-shadow-[4px_4px_0px_#4A3B32]" />
          </motion.div>

          {/* Food Icon: Fish */}
          <motion.div
            drag
            dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
            whileHover={{ scale: 1.15, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            animate={{ y: [0, -10, 0], x: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-[15%] left-[0%] w-24 h-24 cursor-grab active:cursor-grabbing z-20"
          >
            <Image src="/food-icons/fish.png" alt="Fish" fill className="object-contain drop-shadow-[4px_4px_0px_#4A3B32]" />
          </motion.div>

          {/* Food Icon: Meat */}
          <motion.div
            drag
            dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
            whileHover={{ scale: 1.15, rotate: -15 }}
            whileTap={{ scale: 0.9 }}
            animate={{ y: [0, 10, 0], x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 1.5 }}
            className="absolute bottom-[5%] right-[10%] w-28 h-28 cursor-grab active:cursor-grabbing z-20"
          >
            <Image src="/food-icons/meat.png" alt="Meat" fill className="object-contain drop-shadow-[4px_4px_0px_#4A3B32]" />
          </motion.div>

          {/* Main Logo */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="w-[65%] h-[65%] relative z-10 bg-white rounded-full border-8 border-[#4A3B32] shadow-[8px_8px_0px_#4A3B32] flex items-center justify-center"
          >
            <Image 
              src="/images/logo.PNG" 
              alt="PawfectBite Logo" 
              fill
              className="object-contain p-8"
              priority
            />
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading..." color="pink" className="min-h-screen bg-[#FFF9F2]" />}>
      <SignInContent />
    </Suspense>
  );
}
