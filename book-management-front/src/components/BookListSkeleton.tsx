export default function BookListSkeleton() {
  return (
    <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="도서 목록 로딩">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="min-h-56 animate-pulse rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="mb-6 flex items-center justify-between">
            <div className="h-6 w-6 rounded bg-slate-200" />
            <div className="h-6 w-20 rounded-full bg-slate-200" />
          </div>
          <div className="h-6 w-4/5 rounded bg-slate-200" />
          <div className="mt-3 h-4 w-2/5 rounded bg-slate-200" />
          <div className="mt-14 flex items-center justify-between">
            <div className="h-5 w-24 rounded bg-slate-200" />
            <div className="h-5 w-14 rounded bg-slate-200" />
          </div>
        </div>
      ))}
    </section>
  );
}
