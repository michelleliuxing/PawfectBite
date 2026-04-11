"use client";

import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { format } from "date-fns";
import {
  getMonthString,
  getMonthLabel,
  getCalendarDays,
  getStartPadding,
  nextMonth,
  prevMonth,
  formatDate,
} from "@/lib/utils/format";
import { useCalendarEntries, useAllCalendarEntries } from "@/lib/hooks/use-calendar";
import { cn } from "@/lib/utils";
import type { CalendarEntry } from "@/lib/types/calendar.types";

interface CalendarGridProps {
  petId?: string;
  petIds?: string[];
  onDayClick: (date: string, entries: CalendarEntry[]) => void;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function CalendarGrid({ petId, petIds, onDayClick }: CalendarGridProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const monthStr = getMonthString(currentMonth);
  const { data: singleEntries } = useCalendarEntries(petId ?? "", monthStr);
  const { data: combinedEntries } = useAllCalendarEntries(petIds ?? [], monthStr);
  const entries = petIds ? combinedEntries : singleEntries;

  const days = getCalendarDays(currentMonth);
  const startPad = getStartPadding(currentMonth);

  const getEntriesForDate = (date: Date): CalendarEntry[] => {
    const dateStr = formatDate(date);
    return entries?.filter((e) => e.date === dateStr) ?? [];
  };

  return (
    <div className="overflow-hidden rounded-[2.5rem] border-4 border-[#4A3B32] bg-white shadow-[8px_8px_0px_#4A3B32]">
      <div className="flex items-center justify-between border-b-4 border-[#4A3B32] p-4 bg-[#FFF9F2]">
        <button
          className="flex size-10 items-center justify-center rounded-full border-4 border-[#4A3B32] bg-white text-[#4A3B32] shadow-[2px_2px_0px_#4A3B32] transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#4A3B32] active:translate-y-0 active:shadow-none"
          onClick={() => setCurrentMonth(prevMonth(currentMonth))}
        >
          <ChevronLeftIcon className="size-6" strokeWidth={3} />
        </button>
        <h3 className="text-2xl font-black text-[#4A3B32] uppercase tracking-wider">{getMonthLabel(currentMonth)}</h3>
        <button
          className="flex size-10 items-center justify-center rounded-full border-4 border-[#4A3B32] bg-white text-[#4A3B32] shadow-[2px_2px_0px_#4A3B32] transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#4A3B32] active:translate-y-0 active:shadow-none"
          onClick={() => setCurrentMonth(nextMonth(currentMonth))}
        >
          <ChevronRightIcon className="size-6" strokeWidth={3} />
        </button>
      </div>

      <div className="grid grid-cols-7">
        {WEEKDAYS.map((day) => (
          <div key={day} className="border-b-4 border-[#4A3B32] p-3 text-center text-sm font-black text-[#4A3B32]/60 uppercase tracking-widest bg-white">
            {day}
          </div>
        ))}
        {Array.from({ length: startPad }).map((_, i) => (
          <div key={`pad-${i}`} className="min-h-[100px] border-b-4 border-r-4 border-[#4A3B32]/10 p-2 bg-[#FFF9F2]/50" />
        ))}
        {days.map((date) => {
          const dayEntries = getEntriesForDate(date);
          const isToday = formatDate(date) === formatDate(new Date());
          return (
            <button
              key={date.toISOString()}
              onClick={() => onDayClick(formatDate(date), dayEntries)}
              className="min-h-[100px] border-b-4 border-r-4 border-[#4A3B32]/10 p-2 text-left transition-all hover:bg-[#FFF9F2] focus:bg-[#FFF9F2] focus:outline-none flex flex-col gap-2"
            >
              <span
                className={cn(
                  "inline-flex size-8 items-center justify-center rounded-full text-sm font-black transition-all",
                  isToday ? "bg-[#F7B2B7] text-[#4A3B32] border-4 border-[#4A3B32] shadow-[2px_2px_0px_#4A3B32] -translate-y-0.5" : "text-[#4A3B32] group-hover:bg-[#4A3B32]/5"
                )}
              >
                {format(date, "d")}
              </span>
              {dayEntries.length > 0 && (
                <div className="mt-1 flex flex-col gap-1.5">
                  {dayEntries.slice(0, 2).map((entry) => (
                    <span key={entry.id} className="truncate rounded-xl border-2 border-[#4A3B32] bg-[#98C9A3] px-2 py-1 text-[10px] font-black text-white shadow-[2px_2px_0px_#4A3B32]">
                      {entry.recipeTitle || entry.mealType}
                    </span>
                  ))}
                  {dayEntries.length > 2 && (
                    <span className="text-[11px] font-bold text-[#4A3B32]/60 pl-1">+{dayEntries.length - 2} more</span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
