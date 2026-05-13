import BookListSkeleton from "@/components/BookListSkeleton";

export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6 h-10 w-56 animate-pulse rounded-md bg-slate-200" />
      <BookListSkeleton />
    </main>
  );
}
