export interface Book {
  id: number;
  title: string;
  author: string;
  price: number | null;
  available: boolean;
}

export interface BookFormPayload {
  title: string;
  author: string;
  price: number | null;
  available: boolean;
}

export interface ApiErrorResponse {
  status: number;
  error: string;
  message: string;
  path: string;
  timestamp: string;
  validation?: Record<string, string> | null;
}
