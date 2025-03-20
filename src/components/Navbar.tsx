// src/components/Navbar.tsx
"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 border-b border-gray-700 bg-black">
      <h1 className="text-xl font-bold text-white">J.M. Souza</h1>
      <div className="space-x-4">
        <Link href="/" className="text-white hover:underline">
          Home
        </Link>
        <Link href="#projetos" className="text-white hover:underline">
          Projetos
        </Link>
        <Link href="#contato" className="text-white hover:underline">
          Contato
        </Link>
      </div>
    </nav>
  );
}
