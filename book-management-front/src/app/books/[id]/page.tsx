import DeleteBookButton from "@/components/DeleteBookButton";
import { ApiError, getBook } from "@/lib/api";
import { ArrowLeft, BookOpen, Pencil } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type BookDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { id } = await params;

  if (!Number.isFinite(Number(id))) {
    notFound();
  }

  let book;
  try {
    book = await getBook(id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }

  const formattedPrice =
    book.price === null
      ? "가격 미정"
      : new Intl.NumberFormat("ko-KR", {
          style: "currency",
          currency: "KRW",
          maximumFractionDigits: 0,
        }).format(book.price);

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-950"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        목록으로
      </Link>

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                book.available
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-rose-50 text-rose-700"
              }`}
            >
              {book.available ? "대출 가능" : "대출 중"}
            </span>
            <h1 className="mt-4 break-words text-3xl font-bold text-slate-950">{book.title}</h1>
            <p className="mt-2 text-base text-slate-600">{book.author}</p>
          </div>
          <BookOpen className="h-10 w-10 shrink-0 text-teal-700" aria-hidden="true" />
        </div>

        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <dt className="text-sm font-medium text-slate-500">판매가</dt>
            <dd className="mt-1 text-xl font-bold text-slate-950">{formattedPrice}</dd>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <dt className="text-sm font-medium text-slate-500">도서 번호</dt>
            <dd className="mt-1 text-xl font-bold text-slate-950">#{book.id}</dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href={`/books/${book.id}/edit`}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-leaf px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800"
          >
            <Pencil className="h-4 w-4" aria-hidden="true" />
            수정
          </Link>
          <DeleteBookButton bookId={book.id} />
        </div>
      </section>
    </main>
  );
}
