"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Plus, Dog, Cat } from "lucide-react";
import { usePets } from "@/lib/hooks/use-pets";
import { CalendarGrid } from "@/components/calendar/calendar-grid";
import { CalendarEntryDialog } from "@/components/calendar/calendar-entry-dialog";
import type { CalendarEntry } from "@/lib/types/calendar.types";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

export default function CalendarPage() {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const { data: pets, isLoading: isPetsLoading } = usePets({ enabled: isAuthenticated });
  const isLoading = status === "loading" || (isAuthenticated && isPetsLoading);
  const [selectedPetId, setSelectedPetId] = useState<string>("");
  const [dialogState, setDialogState] = useState<{
    date: string;
    entries: CalendarEntry[];
  } | null>(null);

  const activePetId = selectedPetId || pets?.[0]?.id || "";

  if (isLoading) {
    return <LoadingSpinner message="Loading calendar..." color="green" />;
  }

  if (!pets || pets.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-12"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#98C9A3] rounded-2xl border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] flex items-center justify-center rotate-[3deg]">
              <CalendarIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight">Calendar</h1>
              <p className="text-lg font-medium text-[#4A3B32]/70">Plan your pet&apos;s meals</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-[3rem] border-4 border-[#4A3B32] shadow-[12px_12px_0px_#4A3B32] flex flex-col items-center text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(#4A3B32 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
          
          <motion.div 
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }} 
            transition={{ repeat: Infinity, duration: 4 }} 
            className="w-24 h-24 bg-[#E88D72] rounded-3xl border-4 border-[#4A3B32] shadow-[8px_8px_0px_#4A3B32] flex items-center justify-center mb-8 relative z-10"
          >
            <CalendarIcon className="w-12 h-12 text-white" />
          </motion.div>

          <h2 className="text-3xl font-black mb-4 relative z-10">No pets yet!</h2>
          <p className="text-xl font-medium text-[#4A3B32]/70 mb-8 max-w-md relative z-10">
            Add a pet first to start planning their delicious meals on the calendar.
          </p>

          <Link href="/pets/new" className="relative z-10">
            <motion.button 
              whileHover={{ scale: 1.05, y: -4, rotate: 2 }}
              whileTap={{ scale: 0.95, y: 4, boxShadow: "0px 0px 0px #4A3B32" }}
              className="flex items-center gap-3 bg-[#98C9A3] text-white px-8 py-4 rounded-full font-black text-xl border-4 border-[#4A3B32] shadow-[8px_8px_0px_#4A3B32] transition-all"
            >
              <Plus className="w-6 h-6" strokeWidth={3} />
              Add Your First Pet
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-12"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-[#98C9A3] rounded-2xl border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] flex items-center justify-center rotate-[3deg]">
            <CalendarIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight">Calendar</h1>
            <p className="text-lg font-medium text-[#4A3B32]/70">Plan your pet&apos;s meals by day</p>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-wrap gap-3"
      >
        {pets.map((pet) => (
          <motion.button
            key={pet.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedPetId(pet.id)}
            className={`px-5 py-2 rounded-full font-bold border-2 border-[#4A3B32] transition-colors flex items-center gap-2 ${
              activePetId === pet.id ? "bg-[#4A3B32] text-white shadow-[2px_2px_0px_#4A3B32]" : "bg-white text-[#4A3B32] hover:bg-[#FFF9F2]"
            }`}
          >
            {pet.species === 'DOG' ? <Dog className="w-4 h-4" /> : <Cat className="w-4 h-4" />}
            {pet.name}
          </motion.button>
        ))}
      </motion.div>

      {activePetId && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[1rem] border-4 border-[#4A3B32] shadow-[8px_8px_0px_#4A3B32]"
        >
          <CalendarGrid
            petId={activePetId}
            onDayClick={(date, entries) => setDialogState({ date, entries })}
          />
        </motion.div>
      )}

      {dialogState && (
        <CalendarEntryDialog
          petId={activePetId}
          date={dialogState.date}
          existingEntries={dialogState.entries}
          onClose={() => setDialogState(null)}
        />
      )}
    </div>
  );
}
