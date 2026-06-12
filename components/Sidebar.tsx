"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, product } from "@/lib/constants";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-64 border-r border-white/10 bg-[#0b0c11] p-5 lg:block">
      <Link href="/" className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-bold text-black">
          AD
        </div>
        <div>
          <p className="font-semibold text-white">{product.name}</p>
          <p className="text-xs text-slate-500">Agent workspace</p>
        </div>
      </Link>

      <nav className="mt-10 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-xl px-3 py-2 text-sm transition ${
                active
                  ? "bg-white text-black"
                  : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-sm font-medium text-white">Access methods</p>
        <p className="mt-2 text-xs leading-5 text-slate-500">
          CLI, generated files, and MCP are the core connection methods for v1.
        </p>
      </div>
    </aside>
  );
}