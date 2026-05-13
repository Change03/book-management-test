import BookForm from "@/components/BookForm";
import { ApiError, getBook } from "@/lib/api";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type EditBookPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditBookPage({ params }: EditBookPageProps) {
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

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Link
        href={`/books/${book.id}`}
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-950"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        상세로
      </Link>
      <div className="mb-6">
        <p className="mb-2 text-sm font-semibold text-leaf">Edit Book</p>
        <h1 className="text-3xl font-bold text-slate-950">도서 수정</h1>
      </div>
      <BookForm mode="edit" initialBook={book} />
    </main>
  );
}
