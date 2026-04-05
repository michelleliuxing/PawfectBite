import { apiClient } from "./client";
import type {
  CalendarEntry,
  CreateCalendarEntryRequest,
  UpdateCalendarEntryRequest,
} from "@/lib/types/calendar.types";

export const calendarApi = {
  getEntries: (petId: string, month: string) =>
    apiClient.get<CalendarEntry[]>(`/api/calendar?petId=${petId}&month=${month}`),

  create: (data: CreateCalendarEntryRequest) =>
    apiClient.post<CalendarEntry>("/api/calendar/entries", data),

  update: (entryId: string, data: UpdateCalendarEntryRequest) =>
    apiClient.put<CalendarEntry>(`/api/calendar/entries/${entryId}`, data),

  delete: (entryId: string) =>
    apiClient.delete<void>(`/api/calendar/entries/${entryId}`),
};
