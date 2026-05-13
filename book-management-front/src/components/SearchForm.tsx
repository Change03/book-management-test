"use client";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function SearchForm({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
  const [keyword, setKeyword] = useState(initialQuery);

  useEffect(() => {
    setKeyword(initialQuery);
  }, [initialQuery]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = keyword.trim();
    router.push(trimmed ? `/?q=${encodeURIComponent(trimmed)}` : "/");
  }

  function handleClear() {
    setKeyword("");
    router.push("/");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:flex-row"
    >
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <input
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          className="h-11 w-full rounded-md border border-slate-300 pl-9 pr-3 text-slate-950 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
          placeholder="제목 또는 저자 검색"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-leaf px-4 text-sm font-semibold text-white transition hover:bg-teal-800"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          검색
        </button>
        {initialQuery ? (
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-300 text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
            aria-label="검색어 지우기"
            title="검색어 지우기"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </form>
  );
}
