import BookCard from "@/components/BookCard";
import BookListSkeleton from "@/components/BookListSkeleton";
import SearchForm from "@/components/SearchForm";
import { getBooks } from "@/lib/api";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

type HomePageProps = {
  searchParams?: Promise<{
    q?: string | string[];
  }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const keyword = Array.isArray(params?.q) ? params.q[0] ?? "" : params?.q ?? "";

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold text-leaf">Book Inventory</p>
          <h1 className="text-3xl font-bold text-slate-950">도서 목록</h1>
          <p className="mt-2 text-sm text-slate-600">
            매장에 비치된 도서를 빠르게 확인하고 관리하세요.
          </p>
        </div>
        <Link
          href="/register"
          className="inline-flex w-fit items-center gap-2 rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          새 도서
        </Link>
      </div>

      <SearchForm initialQuery={keyword} />

      <Suspense key={keyword} fallback={<BookListSkeleton />}>
        <BookGrid keyword={keyword} />
      </Suspense>
    </main>
  );
}

async function BookGrid({ keyword }: { keyword: string }) {
  const books = await getBooks(keyword);

  if (books.length === 0) {
    return (
      <section className="mt-8 rounded-lg border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
        <h2 className="text-lg font-semibold text-slate-950">표시할 도서가 없습니다.</h2>
        <p className="mt-2 text-sm text-slate-600">
          {keyword ? "검색어를 바꾸거나 새 도서를 등록해 보세요." : "첫 도서를 등록해 보세요."}
        </p>
      </section>
    );
  }

  return (
    <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </section>
  );
}
