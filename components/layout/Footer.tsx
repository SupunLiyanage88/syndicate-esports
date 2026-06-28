import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Users, Mail } from "lucide-react";
import { RedDivider } from "@/components/ui/RedDivider";

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <RedDivider />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/images/syndicate logo.png"
                alt="Syndicate Esports"
                width={48}
                height={48}
                className="drop-shadow-[0_0_10px_rgba(230,57,70,0.4)] group-hover:drop-shadow-[0_0_15px_rgba(230,57,70,0.6)] transition-all duration-300"
              />
              <div>
                <span className="font-russo text-lg text-white uppercase tracking-wider block group-hover:text-primary transition-colors duration-300">
                  Syndicate
                </span>
                <span className="font-chakra text-xs text-silver uppercase tracking-widest">
                  Esports
                </span>
              </div>
            </Link>
            <p className="text-muted text-sm font-chakra max-w-xs">
              Sri Lanka&apos;s premier esports organization. Compete. Conquer. Ascend.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-russo text-sm text-primary uppercase tracking-widest mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Tournament Info", href: "/tournament" },
                { label: "Register Team", href: "/register" },
                { label: "Registered Teams", href: "/teams" },
                { label: "Rules", href: "/rules" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-silver hover:text-primary text-sm font-chakra transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-russo text-sm text-primary uppercase tracking-widest mb-4">
              Join Our Community
            </h4>
            <div className="space-y-3">
              <a
                href="https://discord.gg/syndicate"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-silver hover:text-primary text-sm font-chakra transition-colors duration-200 group"
              >
                <MessageCircle size={18} className="text-primary group-hover:text-primary-light" />
                Discord Server
              </a>
              <a
                href="https://wa.me/94XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-silver hover:text-primary text-sm font-chakra transition-colors duration-200 group"
              >
                <Users size={18} className="text-primary group-hover:text-primary-light" />
                WhatsApp Group
              </a>
              <a
                href="mailto:contact@syndicate-esports.lk"
                className="flex items-center gap-3 text-silver hover:text-primary text-sm font-chakra transition-colors duration-200 group"
              >
                <Mail size={18} className="text-primary group-hover:text-primary-light" />
                contact@syndicate-esports.lk
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted text-xs font-chakra">
              &copy; {new Date().getFullYear()} Syndicate Esports. All rights reserved.
            </p>
            <p className="text-muted text-xs font-chakra">
              Ascendant League Season 1 — Mobile Legends: Bang Bang
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
