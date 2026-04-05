export interface CalendarEntry {
  id: string;
  petId: string;
  petName: string;
  recipeId: string;
  recipeTitle: string;
  date: string;
  mealType: string;
  createdAt: string;
}

export interface CreateCalendarEntryRequest {
  petId: string;
  recipeId: string;
  date: string;
  mealType: string;
}

export interface UpdateCalendarEntryRequest {
  recipeId?: string;
  date?: string;
  mealType?: string;
}
