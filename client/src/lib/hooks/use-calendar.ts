"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { calendarApi } from "@/lib/api/calendar.api";
import type {
  CreateCalendarEntryRequest,
  UpdateCalendarEntryRequest,
} from "@/lib/types/calendar.types";

const CALENDAR_KEY = ["calendar"] as const;

export function useCalendarEntries(petId: string, month: string) {
  return useQuery({
    queryKey: [...CALENDAR_KEY, petId, month],
    queryFn: () => calendarApi.getEntries(petId, month),
    enabled: !!petId && !!month,
  });
}

export function useCreateCalendarEntry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCalendarEntryRequest) => calendarApi.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: CALENDAR_KEY }),
  });
}

export function useUpdateCalendarEntry(entryId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateCalendarEntryRequest) => calendarApi.update(entryId, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: CALENDAR_KEY }),
  });
}

export function useDeleteCalendarEntry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (entryId: string) => calendarApi.delete(entryId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: CALENDAR_KEY }),
  });
}
