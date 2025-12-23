import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Mail, Linkedin, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Mail, href: "mailto:hello@zuvigo.com", label: "Email" },
];

const footerLinks = [
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Press"],
  },
  {
    title: "Services",
    links: ["Strategy", "Development", "Design", "Growth"],
  },
  {
    title: "Resources",
    links: ["Case Studies", "Documentation", "Privacy", "Terms"],
  },
];

export function FooterCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <footer ref={containerRef}>
      {/* CTA Section */}
      <section className="section-padding bg-white text-background relative overflow-hidden">
        {/* Background decorations */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.2, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-black mb-6">
              Let's Build{" "}
              <span className="text-primary">Together</span>
            </h2>
            <p className="text-lg sm:text-xl text-black mb-10 max-w-2xl mx-auto">
              Ready to transform your ideas into powerful digital solutions? 
              Let's start a conversation about your next project.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                size="lg"
                className="group rounded-full px-10 py-7 text-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:shadow-xl hover:shadow-primary/25"
              >
                Start a Project
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full text-black px-10 py-7 text-lg font-medium border-background/30 bg-black text-background transition-all duration-300"
              >
                Schedule a Call
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer Links */}
      <div className="bg-foreground text-background border-t border-background/10">
        <div className="container-wide py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-display font-bold text-lg">Z</span>
                </div>
                <span className="font-display font-semibold text-xl">Zuvigo</span>
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
            </div>

            {/* Links */}
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h4 className="font-display font-semibold mb-4">{group.title}</h4>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-background/60 hover:text-primary transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
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
