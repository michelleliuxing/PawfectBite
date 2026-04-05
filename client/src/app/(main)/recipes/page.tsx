"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, ChefHat, Utensils } from "lucide-react";
import { useRecipes } from "@/lib/hooks/use-recipes";
import { usePets } from "@/lib/hooks/use-pets";
import { useSession } from "next-auth/react";

export default function RecipesPage() {
  const { data: session } = useSession();
  const [selectedPetId, setSelectedPetId] = useState<string | undefined>();
  const { data: recipes, isLoading, error } = useRecipes(selectedPetId);
  const { data: pets } = usePets();

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
          <div className="w-16 h-16 bg-[#F4D06F] rounded-2xl border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] flex items-center justify-center rotate-[3deg]">
            <Utensils className="w-8 h-8 text-[#4A3B32]" />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight">Recipes</h1>
            <p className="text-lg font-medium text-[#4A3B32]/70">Your generated meal history</p>
          </div>
        </div>

        <Link href={session ? "/recipes/generate" : "/sign-in"}>
          <motion.button 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95, y: 2, boxShadow: "0px 0px 0px #4A3B32" }}
            className="flex items-center gap-2 bg-[#E88D72] text-white px-6 py-3 rounded-full font-black border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] transition-colors"
          >
            <Plus className="w-5 h-5" strokeWidth={3} />
            Generate Recipe
          </motion.button>
        </Link>
      </motion.div>

      {pets && pets.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-wrap gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedPetId(undefined)}
            className={`px-5 py-2 rounded-full font-bold border-2 border-[#4A3B32] transition-colors ${
              !selectedPetId ? "bg-[#4A3B32] text-white shadow-[2px_2px_0px_#4A3B32]" : "bg-white text-[#4A3B32] hover:bg-[#FFF9F2]"
            }`}
          >
            All Pets
          </motion.button>
          {pets.map((pet) => (
            <motion.button
              key={pet.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedPetId(pet.id)}
              className={`px-5 py-2 rounded-full font-bold border-2 border-[#4A3B32] transition-colors ${
                selectedPetId === pet.id ? "bg-[#4A3B32] text-white shadow-[2px_2px_0px_#4A3B32]" : "bg-white text-[#4A3B32] hover:bg-[#FFF9F2]"
              }`}
            >
              {pet.name}
            </motion.button>
          ))}
        </motion.div>
      )}

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-12 h-12 border-4 border-[#4A3B32] border-t-[#F7B2B7] rounded-full"
          />
          <p className="font-bold text-[#4A3B32]/70">Loading recipes...</p>
        </div>
      )}

      {error && (
        <div className="bg-white p-8 rounded-[2rem] border-4 border-[#4A3B32] shadow-[8px_8px_0px_#4A3B32] text-center">
          <p className="font-bold text-[#E88D72] text-xl">Oops! Failed to load recipes.</p>
          <p className="text-[#4A3B32]/70 mt-2">Please try refreshing the page.</p>
        </div>
      )}

      {!isLoading && !error && (!recipes || recipes.length === 0) && (
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-[3rem] border-4 border-[#4A3B32] shadow-[12px_12px_0px_#4A3B32] flex flex-col items-center text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(#4A3B32 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
          
          <motion.div 
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }} 
            transition={{ repeat: Infinity, duration: 4 }} 
            className="w-24 h-24 bg-[#98C9A3] rounded-3xl border-4 border-[#4A3B32] shadow-[8px_8px_0px_#4A3B32] flex items-center justify-center mb-8 relative z-10"
          >
            <ChefHat className="w-12 h-12 text-white" />
          </motion.div>

          <h2 className="text-3xl font-black mb-4 relative z-10">No recipes yet!</h2>
          <p className="text-xl font-medium text-[#4A3B32]/70 mb-8 max-w-md relative z-10">
            Generate your first personalized meal recipe tailored to your pet&apos;s needs.
          </p>

          <Link href={session ? "/recipes/generate" : "/sign-in"} className="relative z-10">
            <motion.button 
              whileHover={{ scale: 1.05, y: -4, rotate: 2 }}
              whileTap={{ scale: 0.95, y: 4, boxShadow: "0px 0px 0px #4A3B32" }}
              className="flex items-center gap-3 bg-[#F4D06F] text-[#4A3B32] px-8 py-4 rounded-full font-black text-xl border-4 border-[#4A3B32] shadow-[8px_8px_0px_#4A3B32] transition-all"
            >
              <Plus className="w-6 h-6" strokeWidth={3} />
              Generate Recipe
            </motion.button>
          </Link>
        </motion.div>
      )}

      {recipes && recipes.length > 0 && (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {recipes.map((recipe) => (
            <motion.div key={recipe.id} variants={itemVariants}>
              <Link href={`/recipes/${recipe.id}`}>
                <motion.div 
                  whileHover={{ y: -8 }}
                  className="bg-white p-6 rounded-[2rem] border-4 border-[#4A3B32] shadow-[8px_8px_0px_#4A3B32] flex flex-col relative transition-transform"
                >
                  <div className="w-12 h-12 bg-[#F7B2B7] rounded-full border-2 border-[#4A3B32] flex items-center justify-center mb-4 absolute -top-4 -right-4 shadow-[2px_2px_0px_#4A3B32]">
                    <ChefHat className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-black mb-2 pr-6 line-clamp-2">{recipe.title}</h3>
                  <p className="text-sm font-bold text-[#4A3B32]/60 mb-4">
                    For {pets?.find(p => p.id === recipe.petId)?.name || 'Unknown Pet'}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="text-xs font-bold bg-[#F4D06F]/30 text-[#4A3B32] px-2 py-1 rounded-md border border-[#4A3B32]/20">
                      {recipe.calories} kcal
                    </span>
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
