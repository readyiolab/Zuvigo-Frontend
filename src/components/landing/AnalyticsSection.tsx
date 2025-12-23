import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BarChart3, TrendingUp, Brain, Target } from "lucide-react";

const pillars = [
  {
    icon: BarChart3,
    title: "Performance",
    value: "99.9%",
    label: "Uptime SLA",
    description: "Enterprise-grade infrastructure ensuring your digital products are always available.",
  },
  {
    icon: TrendingUp,
    title: "Optimization",
    value: "3x",
    label: "Faster Growth",
    description: "Data-driven optimization strategies that accelerate your business metrics.",
  },
  {
    icon: Brain,
    title: "Intelligence",
    value: "AI",
    label: "Powered Insights",
    description: "Machine learning algorithms that uncover hidden patterns in your data.",
  },
  {
    icon: Target,
    title: "Precision",
    value: "40%",
    label: "Cost Reduction",
    description: "Targeted strategies that maximize ROI while minimizing unnecessary spend.",
  },
];

export function AnalyticsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="section-padding relative overflow-hidden" ref={containerRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
                           linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
      </div>

      <div className="container-wide relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Data-Driven</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mt-4 mb-6">
            Analytics & Insights
          </h2>
          <p className="text-lg text-muted-foreground">
            We don't just build — we measure, analyze, and optimize for continuous improvement.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group"
            >
              <div className="h-full p-8 rounded-2xl bg-background/80 backdrop-blur-sm border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 text-center">
                {/* Icon */}
                <motion.div
                  className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300"
                  whileHover={{ rotate: 5 }}
                >
                  <pillar.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </motion.div>

                {/* Value */}
                <motion.div
                  className="text-4xl font-display font-bold text-foreground mb-1"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + 0.1 * index }}
                >
                  {pillar.value}
                </motion.div>
                <div className="text-sm font-medium text-primary mb-4">{pillar.label}</div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visual decoration */}
        <motion.div
          className="mt-16 relative"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
}
