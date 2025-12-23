import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-subtle to-background" />
      
      {/* Decorative elements */}
      <motion.div
        className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            style={{ y, opacity }}
            className="max-w-2xl"
          >
           

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.1] text-foreground mb-6"
            >
              We Don't Just Build Websites.
              <br />
              <span className="relative">
                We Build{" "}
                <span className="gradient-text">What's Next.</span>
               
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 text-balance"
            >
             From sleek websites to smart automation, we help founders and entrepreneurs build digital systems that scale their business.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="group rounded-full px-8 py-6 text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:shadow-xl hover:shadow-primary/25"
              >
                Start a Project
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group rounded-full px-8 py-6 text-base font-medium border-border hover:bg-accent transition-all duration-300"
              >
                <Play className="mr-2 w-4 h-4" />
                View Our Work
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-8 mt-14 pt-8 border-t border-border"
            >
              {[
                { value: "50+", label: "Projects Delivered" },
                { value: "98%", label: "Client Satisfaction" },
                { value: "5+", label: "Years Experience" },
              ].map((stat, i) => (
                <div key={i} className="text-left">
                  <div className="text-3xl font-display font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Device Mockups */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Laptop Mockup */}
              <motion.div
                className="relative z-10"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="bg-card rounded-2xl border border-border shadow-2xl overflow-hidden">
                  {/* Laptop Screen */}
                  <div className="bg-secondary p-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                    </div>
                  </div>
                  <div className="aspect-[16/10] bg-gradient-to-br from-primary/10 via-background to-accent p-8 flex items-center justify-center">
                    <div className="w-full max-w-md space-y-4">
                      <div className="h-4 bg-muted rounded-full w-3/4" />
                      <div className="h-4 bg-muted rounded-full w-1/2" />
                      <div className="h-20 bg-primary/20 rounded-xl mt-6" />
                      <div className="grid grid-cols-3 gap-3 mt-4">
                        <div className="h-16 bg-muted rounded-lg" />
                        <div className="h-16 bg-muted rounded-lg" />
                        <div className="h-16 bg-muted rounded-lg" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Phone Mockup */}
              <motion.div
                className="absolute -bottom-8 -left-8 z-20"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="w-40 bg-card rounded-3xl border border-border shadow-2xl overflow-hidden">
                  <div className="bg-secondary p-2 flex justify-center">
                    <div className="w-12 h-1 bg-muted-foreground/30 rounded-full" />
                  </div>
                  <div className="aspect-[9/16] bg-gradient-to-br from-background to-accent p-3">
                    <div className="space-y-2">
                      <div className="h-2 bg-muted rounded-full w-2/3" />
                      <div className="h-2 bg-muted rounded-full w-1/2" />
                      <div className="h-12 bg-primary/20 rounded-lg mt-3" />
                      <div className="h-8 bg-muted rounded-lg" />
                      <div className="h-8 bg-muted rounded-lg" />
                    </div>
                  </div>
                </div>
              </motion.div>

             
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
