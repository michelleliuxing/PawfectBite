"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Dog, Cat, Heart, Info } from "lucide-react";
import { usePets } from "@/lib/hooks/use-pets";
import { useSession } from "next-auth/react";
import { PetCard } from "@/components/pets/pet-card";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

export default function PetsPage() {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const { data: pets, isLoading: isPetsLoading, error } = usePets({ enabled: isAuthenticated });
  const isLoading = status === "loading" || (isAuthenticated && isPetsLoading);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-20 right-10 w-64 h-64 bg-[#F4D06F]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-10 w-80 h-80 bg-[#F7B2B7]/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-12"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-[#F7B2B7] rounded-2xl border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] flex items-center justify-center rotate-[3deg]">
            <Heart className="w-8 h-8 text-white" fill="white" />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight">My Pets</h1>
            <p className="text-lg font-medium text-[#4A3B32]/70">Manage your furry family members</p>
          </div>
        </div>

        <Link href="/pets/new">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95, y: 2, boxShadow: "0px 0px 0px #4A3B32" }}
            className="flex items-center gap-2 bg-[#98C9A3] text-white px-6 py-3 rounded-full font-black border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] transition-colors"
          >
            <Plus className="w-5 h-5" strokeWidth={3} />
            Add Pet
          </motion.button>
        </Link>
      </motion.div>

      {isLoading && <LoadingSpinner message="Loading your pets..." color="yellow" />}

      {error && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-[#FFF9F2] p-8 rounded-[2rem] border-4 border-[#4A3B32] shadow-[8px_8px_0px_#4A3B32] text-center max-w-lg mx-auto"
        >
          <div className="w-16 h-16 bg-[#E88D72] rounded-2xl border-4 border-[#4A3B32] flex items-center justify-center mx-auto mb-4 rotate-[10deg]">
            <Info className="w-8 h-8 text-white" />
          </div>
          <p className="font-black text-[#4A3B32] text-2xl mb-2">Oops! Failed to load pets.</p>
          <p className="text-[#4A3B32]/70 font-bold">Please try refreshing the page.</p>
        </motion.div>
      )}

      {!isLoading && !error && (!pets || pets.length === 0) && (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 md:p-16 rounded-[3rem] border-4 border-[#4A3B32] shadow-[12px_12px_0px_#4A3B32] flex flex-col items-center text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#4A3B32 2px, transparent 2px)', backgroundSize: '30px 30px' }} />

          <div className="flex gap-6 mb-10 relative z-10">
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="w-24 h-24 bg-[#F4D06F] rounded-[2rem] border-4 border-[#4A3B32] shadow-[8px_8px_0px_#4A3B32] flex items-center justify-center"
            >
              <Dog className="w-12 h-12 text-white" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 15, 0], rotate: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, delay: 1, ease: "easeInOut" }}
              className="w-24 h-24 bg-[#E88D72] rounded-[2rem] border-4 border-[#4A3B32] shadow-[8px_8px_0px_#4A3B32] flex items-center justify-center"
            >
              <Cat className="w-12 h-12 text-white" />
            </motion.div>
          </div>

          <h2 className="text-4xl font-black mb-4 text-[#4A3B32] relative z-10">No pets yet!</h2>
          <p className="text-xl font-bold text-[#4A3B32]/60 mb-10 max-w-md relative z-10 bg-white/80 px-6 py-3 rounded-2xl border-2 border-[#4A3B32]/10">
            Add your first pet to start generating personalized, vet-safe meal recipes.
          </p>

          <Link href="/pets/new" className="relative z-10">
            <motion.button
              whileHover={{ scale: 1.05, y: -4, rotate: -2 }}
              whileTap={{ scale: 0.95, y: 4, boxShadow: "0px 0px 0px #4A3B32" }}
              className="flex items-center gap-3 bg-[#F7B2B7] text-[#4A3B32] px-10 py-5 rounded-full font-black text-2xl border-4 border-[#4A3B32] shadow-[8px_8px_0px_#4A3B32] transition-all"
            >
              <Plus className="w-8 h-8" strokeWidth={4} />
              Add Your First Pet
            </motion.button>
          </Link>
        </motion.div>
      )}

      {pets && pets.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-8 w-full"
        >
          {pets.map((pet) => (
            <motion.div key={pet.id} variants={itemVariants} className="w-full">
              <PetCard pet={pet} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
