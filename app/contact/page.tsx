"use client";

import { motion } from "framer-motion";
import { MessageCircle, Users, Mail, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const contactMethods = [
  {
    icon: MessageCircle,
    title: "Discord",
    description: "Join our Discord server for announcements, discussions, and match coordination.",
    action: "Join Discord",
    href: "https://discord.gg/syndicate",
  },
  {
    icon: Users,
    title: "WhatsApp Group",
    description: "Connect with other teams and players in our official WhatsApp group.",
    action: "Join WhatsApp",
    href: "https://wa.me/94XXXXXXXXX",
  },
  {
    icon: Mail,
    title: "Email",
    description: "For official inquiries, sponsorship opportunities, or urgent matters.",
    action: "Send Email",
    href: "mailto:contact@syndicate-esports.lk",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-chakra uppercase tracking-widest mb-4">
            Get In Touch
          </span>
          <h1 className="font-russo text-4xl md:text-5xl text-white uppercase tracking-wider mb-4">
            Contact & Community
          </h1>
          <p className="font-chakra text-silver max-w-lg mx-auto">
            Join our community or reach out for support. We&apos;re here to help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col hover-lift">
                <div className="p-3 bg-primary/10 rounded-buttons border border-primary/20 w-fit mb-4">
                  <method.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-russo text-xl text-white uppercase tracking-wide mb-2">
                  {method.title}
                </h3>
                <p className="font-chakra text-silver text-sm leading-relaxed mb-6 flex-1">
                  {method.description}
                </p>
                <Button variant="secondary" className="w-full" asChild>
                  <a href={method.href} target="_blank" rel="noopener noreferrer">
                    {method.action}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-russo text-2xl text-white uppercase tracking-wide mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Can teams from outside Sri Lanka participate?",
                a: "No. This tournament is exclusively for Sri Lankan teams.",
              },
              {
                q: "Is there an entry fee?",
                a: "No. The tournament is completely free to enter.",
              },
              {
                q: "How are matches scheduled?",
                a: "Team captains coordinate match times via Discord. All matches must be played within the designated round windows.",
              },
              {
                q: "Can I use an emulator?",
                a: "Yes. Matches can be played on mobile devices or emulators.",
              },
              {
                q: "How do I report a technical issue during a match?",
                a: "Contact tournament admins immediately via Discord. Provide screenshots or video evidence if possible.",
              },
            ].map((faq, index) => (
              <Card key={index}>
                <h4 className="font-russo text-white mb-2 uppercase tracking-wide">
                  {faq.q}
                </h4>
                <p className="font-chakra text-silver text-sm leading-relaxed">
                  {faq.a}
                </p>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
