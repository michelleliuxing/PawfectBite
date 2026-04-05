"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
import { useCalendarEntries } from "@/lib/hooks/use-calendar";
import type { CalendarEntry } from "@/lib/types/calendar.types";

interface CalendarGridProps {
  petId: string;
  onDayClick: (date: string, entries: CalendarEntry[]) => void;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function CalendarGrid({ petId, onDayClick }: CalendarGridProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const monthStr = getMonthString(currentMonth);
  const { data: entries } = useCalendarEntries(petId, monthStr);

  const days = getCalendarDays(currentMonth);
  const startPad = getStartPadding(currentMonth);

  const getEntriesForDate = (date: Date): CalendarEntry[] => {
    const dateStr = formatDate(date);
    return entries?.filter((e) => e.date === dateStr) ?? [];
  };

  return (
    <div className="rounded-xl border bg-card">
      <div className="flex items-center justify-between border-b p-4">
        <button onClick={() => setCurrentMonth(prevMonth(currentMonth))} className="rounded-md p-1.5 hover:bg-accent">
          <ChevronLeft className="size-5" />
        </button>
        <h3 className="font-medium">{getMonthLabel(currentMonth)}</h3>
        <button onClick={() => setCurrentMonth(nextMonth(currentMonth))} className="rounded-md p-1.5 hover:bg-accent">
          <ChevronRight className="size-5" />
        </button>
      </div>

      <div className="grid grid-cols-7">
        {WEEKDAYS.map((day) => (
          <div key={day} className="border-b p-2 text-center text-xs font-medium text-muted-foreground">
            {day}
          </div>
        ))}
        {Array.from({ length: startPad }).map((_, i) => (
          <div key={`pad-${i}`} className="min-h-[80px] border-b border-r p-1" />
        ))}
        {days.map((date) => {
          const dayEntries = getEntriesForDate(date);
          const isToday = formatDate(date) === formatDate(new Date());
          return (
            <button
              key={date.toISOString()}
              onClick={() => onDayClick(formatDate(date), dayEntries)}
              className="min-h-[80px] border-b border-r p-1 text-left transition-colors hover:bg-accent/30"
            >
              <span className={`inline-flex size-6 items-center justify-center rounded-full text-xs ${isToday ? "bg-primary text-primary-foreground font-bold" : ""}`}>
                {format(date, "d")}
              </span>
              {dayEntries.length > 0 && (
                <div className="mt-1 flex flex-col gap-0.5">
                  {dayEntries.slice(0, 2).map((entry) => (
                    <span key={entry.id} className="truncate rounded bg-primary/10 px-1 text-[10px] font-medium text-primary">
                      {entry.recipeTitle || entry.mealType}
                    </span>
                  ))}
                  {dayEntries.length > 2 && (
                    <span className="text-[10px] text-muted-foreground">+{dayEntries.length - 2} more</span>
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
