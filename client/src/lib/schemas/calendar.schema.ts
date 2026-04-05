import { z } from "zod";

export const calendarEntrySchema = z.object({
  petId: z.string().uuid("Please select a pet"),
  recipeId: z.string().uuid("Please select a recipe"),
  date: z.string().min(1, "Date is required"),
  mealType: z.string().min(1, "Meal type is required"),
});

export type CalendarEntryValues = z.infer<typeof calendarEntrySchema>;
