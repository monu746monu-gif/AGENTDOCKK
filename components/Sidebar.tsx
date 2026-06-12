"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, product } from "@/lib/constants";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 border-r border-[rgba(120,95,70,0.14)] bg-[#fffaf2]/82 p-5 backdrop-blur-xl lg:block">
      <Link href="/" className="group flex items-center gap-3 rounded-2xl p-2">
        <Image
          src="/Claude%20Sonnet%204_5%20_%20MyShell.jpeg"
          alt="AgentDock logo"
          width={40}
          height={40}
          className="h-10 w-10 rounded-xl object-cover shadow-[0_14px_30px_rgba(23,19,15,0.16)] transition group-hover:-translate-y-0.5"
        />
        <div>
          <p className="font-semibold text-[#17130f]">{product.name}</p>
          <p className="text-xs text-[#8a7e70]">Agent workspace</p>
        </div>
      </Link>

      <nav className="mt-9 space-y-1.5">
        {navItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative block rounded-xl px-3 py-2.5 text-sm font-medium ${
                active
                  ? "border border-[rgba(171,119,43,0.24)] bg-[#fff0c9] text-[#9a681d] shadow-[0_12px_26px_rgba(171,119,43,0.12)]"
                  : "text-[#756b5f] hover:bg-[#fff0c9]/70 hover:text-[#17130f] hover:translate-x-0.5"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="premium-card mt-10 rounded-2xl border p-4">
        <p className="text-sm font-medium text-[#17130f]">Access methods</p>
        <p className="mt-2 text-xs leading-5 text-[#8a7e70]">
          CLI, generated files, and MCP are the core connection methods for v1.
        </p>
      </div>
    </aside>
  );
}
