import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-xl font-semibold">Habit Tracker</h1>
      <Link href="/habits" className="text-sm text-gray-500 underline hover:text-gray-800">
        Manage habits →
      </Link>
    </main>
  );
}
