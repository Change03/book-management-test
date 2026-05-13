"use client";

import { RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex max-w-3xl flex-col items-start px-4 py-12 sm:px-6">
      <p className="mb-2 text-sm font-semibold text-rose-700">오류</p>
      <h1 className="text-2xl font-bold text-slate-950">도서 정보를 불러오지 못했습니다.</h1>
      <p className="mt-3 text-sm leading-6 text-slate-600">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 inline-flex items-center gap-2 rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        다시 시도
      </button>
    </main>
  );
}
