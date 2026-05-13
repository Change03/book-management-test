"use client";

import { deleteBook } from "@/lib/api";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteBookButton({ bookId }: { bookId: number }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm("이 도서를 삭제할까요?");
    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);
      await deleteBook(bookId);
      router.push("/");
      router.refresh();
    } catch {
      window.alert("삭제에 실패했습니다.");
      setDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      className="inline-flex items-center justify-center gap-2 rounded-md border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Trash2 className="h-4 w-4" aria-hidden="true" />
      {deleting ? "삭제 중" : "삭제"}
    </button>
  );
}
