import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col items-start px-4 py-12 sm:px-6">
      <p className="mb-2 text-sm font-semibold text-amber-700">404</p>
      <h1 className="text-2xl font-bold text-slate-950">도서를 찾을 수 없습니다.</h1>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        삭제되었거나 등록되지 않은 도서입니다.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-md bg-leaf px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800"
      >
        목록으로
      </Link>
    </main>
  );
}
