import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "동네 책방 도서 관리",
  description: "소규모 서점을 위한 온라인 도서 관리 시스템",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-slate-50 text-ink antialiased">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
            <Link href="/" className="text-lg font-bold text-slate-950">
              동네 책방
            </Link>
            <nav className="flex items-center gap-2 text-sm font-medium">
              <Link
                href="/"
                className="rounded-md px-3 py-2 text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
              >
                도서 목록
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-leaf px-3 py-2 text-white transition hover:bg-teal-800"
              >
                등록
              </Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
