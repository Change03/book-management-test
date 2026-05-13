import type { ApiErrorResponse, Book, BookFormPayload } from "@/types/book";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export class ApiError extends Error {
  status: number;
  payload?: ApiErrorResponse;

  constructor(status: number, message: string, payload?: ApiErrorResponse) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 204) {
    return undefined as T;
  }

  if (!response.ok) {
    let payload: ApiErrorResponse | undefined;

    try {
      payload = (await response.json()) as ApiErrorResponse;
    } catch {
      payload = undefined;
    }

    throw new ApiError(
      response.status,
      payload?.message ?? "API 요청에 실패했습니다.",
      payload
    );
  }

  return (await response.json()) as T;
}

export async function getBooks(keyword?: string): Promise<Book[]> {
  const query = keyword?.trim();
  const path = query ? `/api/books?q=${encodeURIComponent(query)}` : "/api/books";

  return request<Book[]>(path, {
    cache: "no-store",
  });
}

export async function getBook(id: number | string): Promise<Book> {
  return request<Book>(`/api/books/${id}`, {
    cache: "no-store",
  });
}

export async function createBook(payload: BookFormPayload): Promise<Book> {
  return request<Book>("/api/books", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateBook(id: number | string, payload: BookFormPayload): Promise<Book> {
  return request<Book>(`/api/books/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteBook(id: number | string): Promise<void> {
  await request<void>(`/api/books/${id}`, {
    method: "DELETE",
  });
}
