"use client";

import Link from "next/link";
import { Wallet } from "lucide-react";
import { UserMenu } from "@/components/UserMenu";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 md:px-12">
      <div className="flex items-center gap-2">
        <Wallet className="h-7 w-7 text-primary" />
        <span className="text-xl font-bold text-foreground">Wallet AI</span>
      </div>
      <div className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
        <Link href="/about" className="hover:text-foreground">
          About
        </Link>
        <Link href="/premium" className="hover:text-foreground">
          Premium
        </Link>
        <Link href="/contact" className="hover:text-foreground">
          Contact
        </Link>
      </div>
      <UserMenu />
    </nav>
  );
}
