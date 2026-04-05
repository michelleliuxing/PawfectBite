"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, Dog, Cat, Heart, Activity, Scale, Info } from "lucide-react";
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
        <div className="flex flex-col items-center justify-center py-20 gap-6">
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-16 h-16 border-8 border-[#4A3B32] border-t-[#F4D06F] rounded-full shadow-[4px_4px_0px_#4A3B32]"
          />
          <p className="font-black text-xl text-[#4A3B32] bg-white px-6 py-2 rounded-full border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32]">
            Loading your pets...
          </p>
        </div>
      )}

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

          <Link href={session ? "/pets/new" : "/sign-in"} className="relative z-10">
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
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {pets.map((pet) => {
            const isDog = pet.species === 'DOG';
            const themeColor = isDog ? 'bg-[#F4D06F]' : 'bg-[#98C9A3]';
            const Icon = isDog ? Dog : Cat;

            return (
              <motion.div key={pet.id} variants={itemVariants} className="h-full">
                <Link href={`/pets/${pet.id}`} className="block h-full">
                  <motion.div 
                    whileHover={{ y: -8, rotate: isDog ? 2 : -2 }}
                    className="h-full bg-white rounded-[2.5rem] border-4 border-[#4A3B32] shadow-[8px_8px_0px_#4A3B32] flex flex-col relative transition-transform overflow-hidden group"
                  >
                    {/* Card Header Background */}
                    <div className={`h-24 w-full ${themeColor} border-b-4 border-[#4A3B32] relative overflow-hidden`}>
                      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#4A3B32 2px, transparent 2px)', backgroundSize: '16px 16px' }} />
                    </div>

                    {/* Pet Icon Badge */}
                    <div className="absolute top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-white rounded-full border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 overflow-hidden relative">
                      {pet.photoUrl ? (
                        <Image src={pet.photoUrl} alt={pet.name} fill className="object-cover" />
                      ) : (
                        <Icon className="w-12 h-12 text-[#4A3B32]" />
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="pt-16 pb-8 px-6 flex flex-col items-center flex-1 text-center">
                      <h3 className="text-3xl font-black text-[#4A3B32] mb-2">{pet.name}</h3>
                      <p className="text-sm font-bold text-[#4A3B32]/60 uppercase tracking-wider mb-6">
                        {pet.breed}
                      </p>

                      <div className="grid grid-cols-2 gap-3 w-full mt-auto">
                        <div className="bg-[#FFF9F2] p-3 rounded-2xl border-2 border-[#4A3B32] flex flex-col items-center">
                          <Scale className="w-5 h-5 text-[#E88D72] mb-1" />
                          <span className="font-black text-[#4A3B32]">{pet.weightKg} kg</span>
                        </div>
                        <div className="bg-[#FFF9F2] p-3 rounded-2xl border-2 border-[#4A3B32] flex flex-col items-center">
                          <Activity className="w-5 h-5 text-[#F7B2B7] mb-1" />
                          <span className="font-black text-[#4A3B32] text-sm capitalize">
                            {pet.activityLevel.replace("_", " ").toLowerCase()}
                          </span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap justify-center gap-2 mt-4">
                        <span className="bg-[#4A3B32] text-white px-3 py-1 rounded-full text-xs font-bold border-2 border-[#4A3B32]">
                          {pet.ageYears}y {pet.ageMonths}m
                        </span>
                        <span className="bg-white text-[#4A3B32] px-3 py-1 rounded-full text-xs font-bold border-2 border-[#4A3B32]">
                          {pet.sex === "MALE" ? "Male" : "Female"}
                        </span>
                        {(pet.allergies.length > 0 || pet.medicalConditions.length > 0) && (
                          <span className="bg-[#E88D72] text-white px-3 py-1 rounded-full text-xs font-bold border-2 border-[#4A3B32]">
                            Medical
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
