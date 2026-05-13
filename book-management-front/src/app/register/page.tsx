"use client";

import BookForm from "@/components/BookForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-950"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        목록으로
      </Link>
      <div className="mb-6">
        <p className="mb-2 text-sm font-semibold text-leaf">Register Book</p>
        <h1 className="text-3xl font-bold text-slate-950">도서 등록</h1>
      </div>
      <BookForm mode="create" />
    </main>
  );
}
