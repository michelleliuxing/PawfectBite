import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths } from "date-fns";

export function getMonthString(date: Date): string {
  return format(date, "yyyy-MM");
}

export function getMonthLabel(date: Date): string {
  return format(date, "MMMM yyyy");
}

export function getCalendarDays(date: Date): Date[] {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  return eachDayOfInterval({ start, end });
}

export function getStartPadding(date: Date): number {
  return getDay(startOfMonth(date));
}

export function nextMonth(date: Date): Date {
  return addMonths(date, 1);
}

export function prevMonth(date: Date): Date {
  return subMonths(date, 1);
}

export function formatDate(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function formatDisplayDate(date: Date): string {
  return format(date, "MMM d, yyyy");
}
