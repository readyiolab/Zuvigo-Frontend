import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Code2, Rocket, HeartHandshake } from "lucide-react";

const services = [
  {
    icon: Lightbulb,
    title: "Strategy & Product Consulting",
    description: "We define your digital roadmap, validate ideas, and craft strategies that align with your business goals.",
    features: ["Market Research", "Product Strategy", "User Research", "Roadmap Planning"],
  },
  {
    icon: Code2,
    title: "Website & Platform Development",
    description: "Custom websites, web apps, and platforms built with modern tech stacks for performance and scalability.",
    features: ["Custom Development", "E-commerce", "SaaS Platforms", "Mobile Apps"],
  },
  {
    icon: Rocket,
    title: "Growth & Optimization Systems",
    description: "Data-driven systems to track, analyze, and optimize your digital presence for maximum ROI.",
    features: ["Analytics Setup", "SEO & Performance", "Conversion Optimization", "A/B Testing"],
  },
  {
    icon: HeartHandshake,
    title: "Ongoing Support Partner",
    description: "Continuous partnership to maintain, improve, and evolve your digital products over time.",
    features: ["24/7 Support", "Regular Updates", "Performance Monitoring", "Feature Enhancements"],
  },
];

export function HowWeBuildSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="how-we-build" className="section-padding bg-surface-subtle" ref={containerRef}>
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Our Process</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mt-4 mb-6">
            How We Build
          </h2>
          <p className="text-lg text-muted-foreground">
            A systematic approach to transforming your ideas into powerful digital solutions 
            that deliver measurable results.
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group"
            >
              <div className="h-full p-8 rounded-2xl bg-background border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2">
                

                {/* Content */}
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
