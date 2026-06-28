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
          {/* Logo + Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Image
                src="/images/syndicate logo.png"
                alt="Syndicate Esports"
                width={40}
                height={40}
                className="relative drop-shadow-[0_0_10px_rgba(230,57,70,0.4)] group-hover:drop-shadow-[0_0_15px_rgba(230,57,70,0.6)] transition-all duration-300"
              />
            </motion.div>
            <div className="hidden sm:flex flex-col">
              <span className="font-russo text-lg text-white uppercase tracking-wider leading-tight group-hover:text-primary transition-colors duration-300">
                Syndicate
              </span>
              <span className="font-chakra text-xs text-primary uppercase tracking-[0.2em] leading-tight">
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
