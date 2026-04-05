export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
  meta: { timestamp: string };
}

export interface ApiError {
  code: string;
  message: string;
}
