"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { NavLink } from "@/lib/types";

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Tournament", href: "/tournament" },
  { label: "Teams", href: "/teams" },
  { label: "Rules", href: "/rules" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/syndicate logo.png"
              alt="Syndicate Esports"
              width={40}
              height={40}
              className="drop-shadow-[0_0_10px_rgba(201,162,39,0.3)]"
            />
            <span className="font-orbitron font-bold text-lg text-gold-light uppercase tracking-wider hidden sm:block">
              Syndicate
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-rajdhani font-medium text-silver hover:text-gold-light transition-colors duration-200 uppercase tracking-wider"
              >
                {link.label}
              </Link>
            ))}
            <Button variant="default" size="sm" className="ml-4" asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-silver hover:text-gold-light transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <div className="md:hidden bg-surface border-b border-border">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-sm font-rajdhani font-medium text-silver hover:text-gold-light hover:bg-surface-high rounded-lg transition-colors duration-200 uppercase tracking-wider"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-sm font-rajdhani font-semibold text-background bg-gold hover:bg-gold-light rounded-lg text-center uppercase tracking-wider transition-colors duration-200"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
