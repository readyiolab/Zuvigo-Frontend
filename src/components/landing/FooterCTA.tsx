import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Mail, Linkedin, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Mail, href: "mailto:hello@zuvigo.com", label: "Email" },
];

const footerLinks = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/" },

    ],
  },
  {
    title: "Services",
    links: [
      { label: "Strategy", href: "/#solutions" },
      { label: "Development", href: "/#solutions" },
      { label: "Design", href: "/#solutions" },
      { label: "Growth", href: "/#solutions" },
    ],
  },
  {
    title: "Resources",
    links: [

      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
] as const;

export function FooterCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <footer ref={containerRef}>


      {/* Footer Links */}
      <div className="bg-foreground text-background border-t border-background/10">
        <div className="container-wide py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <img src="/footer_logo.webp" alt="Zuvigo" className="w-auto h-20 object-contain rounded-xl" />
              </div>
              <p className="text-background/60 mb-6 max-w-sm">
                Digital agency crafting exceptional experiences through strategy,
                design, and technology.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center text-background/70 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
              <div className="mt-4">
                <a
                  href="mailto:hello@zuvigo.com"
                  className="text-background/80 hover:text-primary transition-colors underline underline-offset-4"
                >
                  hello@zuvigo.com
                </a>
              </div>
            </div>

            {/* Links */}
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h4 className="font-display font-semibold mb-4">{group.title}</h4>
                <ul className="space-y-3">
                  {group.links.map((link) => {
                    const isHashLink = link.href.includes("#");
                    const isInternal = link.href.startsWith("/") && !link.href.startsWith("/http");

                    // Handle hash links with smooth scroll
                    const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                      if (isHashLink) {
                        e.preventDefault();
                        const [path, hash] = link.href.split("#");

                        // If not on home page, navigate first
                        if (window.location.pathname !== "/" && path === "/") {
                          window.location.href = link.href;
                          return;
                        }

                        // Scroll to element
                        const element = document.getElementById(hash);
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                      }
                    };

                    return (
                      <li key={link.label}>
                        {isInternal && !isHashLink ? (
                          <Link to={link.href} className="text-background/60 hover:text-primary transition-colors">
                            {link.label}
                          </Link>
                        ) : isHashLink ? (
                          <a
                            href={link.href}
                            onClick={handleHashClick}
                            className="text-background/60 hover:text-primary transition-colors cursor-pointer"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <a href={link.href} className="text-background/60 hover:text-primary transition-colors">
                            {link.label}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="mt-16 pt-8 border-t border-background/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-background/50 text-sm">
              © {new Date().getFullYear()} Zuvigo. All rights reserved.
            </p>
            <p className="text-background/50 text-sm">
              Built with passion & precision.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
