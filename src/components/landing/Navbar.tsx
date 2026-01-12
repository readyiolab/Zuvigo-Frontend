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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container-wide">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/">
            <motion.div
              className="flex items-center gap-2 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-lg">Z</span>
              </div>
              <span className="font-display font-semibold text-xl text-foreground">Zuvigo</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
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
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium cursor-pointer"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.name}
                </motion.a>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              size="lg"
              className="font-medium px-6 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
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
                    className="block text-foreground hover:text-primary transition-colors text-lg font-medium py-2 cursor-pointer"
                  >
                    {link.name}
                  </a>
                );
              })}
              <Button className="w-full mt-4 rounded-full">Schedule A Call </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
