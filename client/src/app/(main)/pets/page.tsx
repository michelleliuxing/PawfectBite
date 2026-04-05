"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Dog, Cat, Heart } from "lucide-react";
import { usePets } from "@/lib/hooks/use-pets";
import { useSession } from "next-auth/react";

export default function PetsPage() {
  const { data: session } = useSession();
  const { data: pets, isLoading, error } = usePets();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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
    <div className="w-full max-w-4xl mx-auto">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-12"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-[#F7B2B7] rounded-2xl border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] flex items-center justify-center rotate-[-6deg]">
            <Heart className="w-8 h-8 text-white" fill="white" />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight">My Pets</h1>
            <p className="text-lg font-medium text-[#4A3B32]/70">Manage your furry family members</p>
          </div>
        </div>

        <Link href={session ? "/pets/new" : "/sign-in"}>
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

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-12 h-12 border-4 border-[#4A3B32] border-t-[#F4D06F] rounded-full"
          />
          <p className="font-bold text-[#4A3B32]/70">Loading your pets...</p>
        </div>
      )}

      {error && (
        <div className="bg-white p-8 rounded-[2rem] border-4 border-[#4A3B32] shadow-[8px_8px_0px_#4A3B32] text-center">
          <p className="font-bold text-[#E88D72] text-xl">Oops! Failed to load pets.</p>
          <p className="text-[#4A3B32]/70 mt-2">Please try refreshing the page.</p>
        </div>
      )}

      {!isLoading && !error && (!pets || pets.length === 0) && (
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-[3rem] border-4 border-[#4A3B32] shadow-[12px_12px_0px_#4A3B32] flex flex-col items-center text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(#4A3B32 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
          
          <div className="flex gap-4 mb-8 relative z-10">
            <motion.div animate={{ y: [0, -10, 0], rotate: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="w-20 h-20 bg-[#F4D06F] rounded-3xl border-4 border-[#4A3B32] shadow-[6px_6px_0px_#4A3B32] flex items-center justify-center">
              <Dog className="w-10 h-10 text-white" />
            </motion.div>
            <motion.div animate={{ y: [0, 10, 0], rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 5, delay: 1 }} className="w-20 h-20 bg-[#E88D72] rounded-3xl border-4 border-[#4A3B32] shadow-[6px_6px_0px_#4A3B32] flex items-center justify-center">
              <Cat className="w-10 h-10 text-white" />
            </motion.div>
          </div>

          <h2 className="text-3xl font-black mb-4 relative z-10">No pets yet!</h2>
          <p className="text-xl font-medium text-[#4A3B32]/70 mb-8 max-w-md relative z-10">
            Add your first pet to start generating personalized, vet-safe meal recipes.
          </p>

          <Link href={session ? "/pets/new" : "/sign-in"} className="relative z-10">
            <motion.button 
              whileHover={{ scale: 1.05, y: -4, rotate: -2 }}
              whileTap={{ scale: 0.95, y: 4, boxShadow: "0px 0px 0px #4A3B32" }}
              className="flex items-center gap-3 bg-[#F7B2B7] text-[#4A3B32] px-8 py-4 rounded-full font-black text-xl border-4 border-[#4A3B32] shadow-[8px_8px_0px_#4A3B32] transition-all"
            >
              <Plus className="w-6 h-6" strokeWidth={3} />
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
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {pets.map((pet) => (
            <motion.div key={pet.id} variants={itemVariants}>
              <Link href={`/pets/${pet.id}`}>
                <motion.div 
                  whileHover={{ y: -8, rotate: pet.species === 'DOG' ? 2 : -2 }}
                  className={`p-6 rounded-[2rem] border-4 border-[#4A3B32] shadow-[8px_8px_0px_#4A3B32] flex flex-col items-center text-center relative transition-transform ${
                    pet.species === 'DOG' ? 'bg-[#F4D06F]' : 'bg-[#98C9A3]'
                  }`}
                >
                  <div className="w-20 h-20 bg-white rounded-full border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] flex items-center justify-center mb-4 -mt-12">
                    {pet.species === 'DOG' ? (
                      <Dog className="w-10 h-10 text-[#4A3B32]" />
                    ) : (
                      <Cat className="w-10 h-10 text-[#4A3B32]" />
                    )}
                  </div>
                  <h3 className="text-2xl font-black mb-2">{pet.name}</h3>
                  <div className="flex gap-2 text-sm font-bold bg-white/50 px-3 py-1 rounded-full border-2 border-[#4A3B32]">
                    <span>{pet.age} years</span>
                    <span>•</span>
                    <span>{pet.weight} kg</span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
