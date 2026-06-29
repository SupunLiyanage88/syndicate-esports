"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
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
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-border">
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
            <div className="flex flex-col leading-none">
              <span style={{ fontFamily: "var(--font-ethnocentric)" }} className="text-base text-[#b26d02] tracking-wider">
                Syndicate
              </span>
              <span style={{ fontFamily: "var(--font-ethnocentric)" }} className="text-[10px] text-silver tracking-widest uppercase">
                Esports
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-chakra font-medium text-silver hover:text-primary transition-colors duration-200 uppercase tracking-wider relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-4"
            >
              <Button variant="default" size="sm" asChild>
                <Link href="/register">Register</Link>
              </Button>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-silver hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden glass-strong border-b border-border"
        >
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-sm font-chakra font-medium text-silver hover:text-primary hover:bg-surface-high rounded-lg transition-colors duration-200 uppercase tracking-wider"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-sm font-chakra font-semibold text-white bg-primary hover:bg-primary-light rounded-lg text-center uppercase tracking-wider transition-colors duration-200"
            >
              Register
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
