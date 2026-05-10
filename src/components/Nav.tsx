"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Today" },
  { href: "/history", label: "History" },
  { href: "/charts", label: "Charts" },
  { href: "/habits", label: "Habits" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-8 py-4">
        <span className="text-sm font-semibold tracking-tight text-gray-900">
          Habit Tracker
        </span>
        <div className="flex items-center gap-6">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm transition-colors ${
                  active
                    ? "font-medium text-gray-900"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
