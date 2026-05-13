"use client";

import { createBook, updateBook, ApiError } from "@/lib/api";
import type { Book, BookFormPayload } from "@/types/book";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type FormMode = "create" | "edit";
type FormErrors = Partial<Record<keyof BookFormPayload | "root", string>>;

export default function BookForm({
  mode,
  initialBook,
}: {
  mode: FormMode;
  initialBook?: Book;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(initialBook?.title ?? "");
  const [author, setAuthor] = useState(initialBook?.author ?? "");
  const [price, setPrice] = useState(
    initialBook?.price === null || initialBook?.price === undefined ? "" : String(initialBook.price)
  );
  const [available, setAvailable] = useState(initialBook?.available ?? true);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const isEdit = mode === "edit";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});

    const nextErrors: FormErrors = {};
    const trimmedTitle = title.trim();
    const trimmedAuthor = author.trim();
    const trimmedPrice = price.trim();
    const parsedPrice = trimmedPrice === "" ? null : Number(trimmedPrice);

    if (!trimmedTitle) {
      nextErrors.title = "도서 제목을 입력해 주세요.";
    }

    if (!trimmedAuthor) {
      nextErrors.author = "저자를 입력해 주세요.";
    }

    if (
      trimmedPrice !== "" &&
      (parsedPrice === null || !Number.isFinite(parsedPrice) || parsedPrice < 0)
    ) {
      nextErrors.price = "가격은 0원 이상 숫자로 입력해 주세요.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const payload: BookFormPayload = {
      title: trimmedTitle,
      author: trimmedAuthor,
      price: parsedPrice,
      available,
    };

    try {
      setSubmitting(true);
      const savedBook = isEdit && initialBook
        ? await updateBook(initialBook.id, payload)
        : await createBook(payload);

      router.push(isEdit ? `/books/${savedBook.id}` : "/");
      router.refresh();
    } catch (error) {
      if (error instanceof ApiError) {
        setErrors({
          ...error.payload?.validation,
          root: error.message,
        });
        return;
      }

      setErrors({ root: "요청 처리 중 오류가 발생했습니다." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft sm:p-6"
    >
      {errors.root ? (
        <div className="mb-5 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
          {errors.root}
        </div>
      ) : null}

      <div className="grid gap-5">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">도서 제목</span>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            placeholder="예: 작은 책방의 밤"
          />
          {errors.title ? <span className="mt-1 block text-sm text-rose-600">{errors.title}</span> : null}
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">저자</span>
          <input
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            placeholder="예: 한서윤"
          />
          {errors.author ? <span className="mt-1 block text-sm text-rose-600">{errors.author}</span> : null}
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">가격</span>
          <input
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            inputMode="numeric"
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            placeholder="예: 14800"
          />
          {errors.price ? <span className="mt-1 block text-sm text-rose-600">{errors.price}</span> : null}
        </label>

        <label className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
          <span>
            <span className="block text-sm font-semibold text-slate-800">대출 가능</span>
            <span className="mt-1 block text-xs text-slate-500">
              현재 매장에서 바로 대출할 수 있는 상태입니다.
            </span>
          </span>
          <input
            type="checkbox"
            checked={available}
            onChange={(event) => setAvailable(event.target.checked)}
            className="h-5 w-5 rounded border-slate-300 text-teal-700 focus:ring-teal-500"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400 sm:w-auto"
      >
        <Save className="h-4 w-4" aria-hidden="true" />
        {submitting ? "저장 중" : isEdit ? "수정 저장" : "등록"}
      </button>
    </form>
  );
}
