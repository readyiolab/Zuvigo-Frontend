import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, ChevronRight } from "lucide-react";
import { AspectRatio } from "../ui/aspect-ratio";

const projects = [
  {
    id: "igrowbig",
    title: "iGrowBig",
    category: "Digital Platform",
    description: "A growth-focused digital platform built for NHT Global distributors to launch, automate, and scale their business globally  without any technical skills.",
    results: [
      "Ready to use business website for NHT Global ",
      "Lead capture, lead sales-ready product system",
      "Tools to grow, train your global network"
    ],
    tags: ["Platform", "Automation", "MLM"],
    image: "/igrowbig.png",
    link: "https://igrowbig.com/",
  },
  {
    id: "arbilo",
    title: "Arbilo",
    category: "Crypto Platform",
    description: "A powerful crypto arbitrage platform powered by the world's first pair-based arbitrage algorithm — giving traders profitable signals with unmatched accuracy.",
    results: [
      "Real-time arbitrage signals every 5 minutes",
      "Unique pair-based algorithm for higher profits",
      "Track price gaps & trading cycles across exchanges"
    ],
    tags: ["Crypto", "Trading", "Analytics"],
    image: "/arbiloprojct.png",
    link: "https://arbilo.com/",
  },
  {
    id: "empowerlife",
    title: "Empower Life",
    category: "Financial Advisory",
    description: "A purpose-driven financial advisory website helping families protect, grow, and transfer wealth through clear strategy and trusted guidance.",
    results: [
      "Conversion-focused financial services landing page",
      "Trust-driven UI with metrics & education blocks",
      "Scalable design built for long-term advisory "
    ],
    tags: ["Finance", "Advisory", "Landing Page"],
    image: "/singhkarman.png",
    link: "https://singhkarman.com/",
  },
  {
    id: "shinakaur",
    title: "Shina Kaur",
    category: "Coaching & Wellness",
    description: "Compassionate support for high-achievers navigating personal, professional, emotional, or spiritual transitions. Co-creating clarity and personalized strategy to rebuild alignment.",
    results: [
      "Private Coaching for Sacred Pivots",
      "Digital Toolkit for self-inquiry",
      "Live Workshops for organizations"
    ],
    tags: ["Coaching", "Wellness", "Strategy"],
    image: "/shina.png",
    link: "https://shinakaur.com/",
  },
  {
    id: "freedomma",
    title: "Freedom M&A",
    category: "AI & Automation",
    description: "Transforming M&A for $50M–$150M founders with intelligent automation. AI agents and Twilio integrations streamline lead management.",
    results: [
      "AI Agent & Chatbot Integration",
      "Twilio Integration for Automated Calls",
      "Seamless Lead Automation System"
    ],
    tags: ["AI Agents", "Automation", "Twilio"],
    image: "/dave.png",
    link: "https://www.freedommergers.com/",
  },
  {
    id: "cedento",
    title: "Cedento",
    category: "Dental Marketing",
    description: "All-in-one marketing and practice growth platform specifically designed for dental professionals.",
    results: [
      "Custom-designed, mobile-ready websites",
      "Integrated booking & practice management",
      "AI-driven SEO & social media strategies"
    ],
    tags: ["Dental", "Marketing", "SEO"],
    image: "/cedento.png",
    link: "https://cedento.com/",
  },
];

export function SelectedWorkSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="work" className="section-padding bg-surface-subtle" ref={containerRef}>
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div>
            <span className="text-primary font-medium text-sm uppercase tracking-wider">Portfolio</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mt-4 mb-6">
              Growth through Innovation: <span className="block mt-2">Selected Work</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              A curated showcase of digital platforms and automated systems designed for global impact.
            </p>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group relative h-full"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <div className="relative overflow-hidden rounded-2xl bg-background border border-border transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 h-full flex flex-col">
                  {/* Project Media (fixed aspect ratio for equal heights) */}
                  <AspectRatio ratio={16 / 10}>
                    <div className="relative w-full h-full overflow-hidden bg-muted">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      {/* Hover content */}
                      <motion.div
                        className="absolute inset-0 p-6 flex flex-col justify-end"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: hoveredId === project.id ? 1 : 0,
                          y: hoveredId === project.id ? 0 : 20
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-primary-foreground text-sm mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 rounded-full bg-background/20 backdrop-blur-sm text-primary-foreground text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                      {/* View button */}
                      <motion.div
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center text-foreground"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                          opacity: hoveredId === project.id ? 1 : 0,
                          scale: hoveredId === project.id ? 1 : 0.8
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </AspectRatio>

                  {/* Content */}
                  <div className="p-6">
                    <span className="text-sm text-primary font-medium">{project.category}</span>
                    <h3 className="text-xl font-display font-semibold text-foreground mt-1 mb-4 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    {/* Results */}
                    <ul className="space-y-2">
                      {project.results.map((result) => (
                        <li key={result} className="flex items-start text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3 mt-1.5 flex-shrink-0" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}