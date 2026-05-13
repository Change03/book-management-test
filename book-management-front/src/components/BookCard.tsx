import type { Book } from "@/types/book";
import { BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function BookCard({ book }: { book: Book }) {
  const formattedPrice =
    book.price === null
      ? "가격 미정"
      : new Intl.NumberFormat("ko-KR", {
          style: "currency",
          currency: "KRW",
          maximumFractionDigits: 0,
        }).format(book.price);

  return (
    <Link
      href={`/books/${book.id}`}
      className="group flex min-h-56 flex-col justify-between rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-soft"
    >
      <div>
        <div className="mb-4 flex items-start justify-between gap-3">
          <BookOpen className="h-6 w-6 shrink-0 text-teal-700" aria-hidden="true" />
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
              book.available
                ? "bg-emerald-50 text-emerald-700"
                : "bg-rose-50 text-rose-700"
            }`}
          >
            {book.available ? "대출 가능" : "대출 중"}
          </span>
        </div>
        <h2 className="break-words text-xl font-bold leading-7 text-slate-950">{book.title}</h2>
        <p className="mt-2 text-sm font-medium text-slate-600">{book.author}</p>
      </div>
      <div className="mt-6 flex items-center justify-between gap-3">
        <p className="text-base font-bold text-slate-900">{formattedPrice}</p>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-teal-700 group-hover:text-teal-900">
          상세
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
