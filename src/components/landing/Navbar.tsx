import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { name: "How We Build", href: "#how-we-build" },
  { name: "Solutions", href: "#solutions" },
  { name: "Selected Work", href: "#work" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Get all section IDs from navLinks
    const sectionIds = navLinks.map(link => link.href.replace("#", ""));
    sectionIds.push("hero"); // Include hero if it has an id

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm"
        : "bg-transparent"
        }`}
    >
      <div className="container-wide">
        <nav className="relative flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/">
            <motion.div
              className="flex items-center gap-2 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img src="/logo.webp" alt="Zuvigo" className="w-auto h-10 object-contain rounded-xl" />

            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
            <nav className="flex items-center gap-1 p-1 rounded-full bg-background/50 backdrop-blur-md border border-border/40 shadow-sm ring-1 ring-white/5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  if (!isHomePage) {
                    // Navigate to home page with hash
                    navigate("/" + link.href);
                  } else {
                    const hash = link.href.replace("#", "");
                    const element = document.getElementById(hash);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }
                };

                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={handleClick}
                    className={`relative px-5 py-2 text-sm font-medium transition-all rounded-full ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                      }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 bg-white shadow-sm rounded-full z-[-1]"
                        transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                      />
                    )}
                    {link.name}
                  </motion.a>
                );
              })}
            </nav>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              size="lg"
              className="font-medium px-6 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
              onClick={() => {
                if (!isHomePage) {
                  navigate("/#contact");
                } else {
                  const element = document.getElementById("contact");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }
              }}
            >
              Schedule a Call
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="container-wide py-6 space-y-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  if (!isHomePage) {
                    // Navigate to home page with hash
                    navigate("/" + link.href);
                  } else {
                    const hash = link.href.replace("#", "");
                    const element = document.getElementById(hash);
                    if (element) {
                      // Small delay to allow menu to close first
                      setTimeout(() => {
                        element.scrollIntoView({ behavior: "smooth", block: "start" });
                      }, 100);
                    }
                  }
                };

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={handleClick}
                    className={`block transition-colors text-lg font-medium py-2 cursor-pointer ${isActive ? "text-primary" : "text-foreground hover:text-primary"
                      }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              <Button
                className="w-full mt-4 rounded-full"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (!isHomePage) {
                    navigate("/#contact");
                  } else {
                    setTimeout(() => {
                      const element = document.getElementById("contact");
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }, 100);
                  }
                }}
              >
                Schedule A Call
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
