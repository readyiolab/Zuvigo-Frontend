import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, ChevronRight } from "lucide-react";

const projects = [
  {
    id: "arbilo",
    title: "Arbilo",
    category: "FinTech Platform",
    description: "A comprehensive financial analytics platform enabling real-time market insights and automated trading strategies.",
    results: ["200% increase in user engagement", "50K+ active users", "99.9% uptime"],
    tags: ["Web App", "Analytics", "AI Integration"],
    gradient: "from-blue-600 to-indigo-600",
  },
  {
    id: "singhkarman",
    title: "SinghKarman",
    category: "E-commerce",
    description: "Premium e-commerce platform with custom inventory management and seamless checkout experience.",
    results: ["150% revenue growth", "40% faster load times", "3x conversion rate"],
    tags: ["E-commerce", "UI/UX", "Performance"],
    gradient: "from-amber-500 to-orange-600",
  },
  {
    id: "igrowbig",
    title: "iGrowBig",
    category: "EdTech Platform",
    description: "An innovative learning platform connecting students with mentors through AI-powered matching.",
    results: ["10K+ students enrolled", "95% satisfaction rate", "500+ mentors"],
    tags: ["Platform", "AI", "Mobile App"],
    gradient: "from-emerald-500 to-teal-600",
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
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <span className="text-primary font-medium text-sm uppercase tracking-wider">Portfolio</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mt-4">
              Selected Work
            </h2>
          </div>
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300"
            whileHover={{ x: 5 }}
          >
            View All Projects
            <ChevronRight className="w-4 h-4" />
          </motion.a>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group relative"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-background border border-border transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5">
                {/* Project Image/Gradient */}
                <div className={`aspect-[4/3] bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent"
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
                  <motion.button
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center text-foreground"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: hoveredId === project.id ? 1 : 0,
                      scale: hoveredId === project.id ? 1 : 0.8
                    }}
                    transition={{ duration: 0.2 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-sm text-primary font-medium">{project.category}</span>
                  <h3 className="text-xl font-display font-semibold text-foreground mt-1 mb-4 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  {/* Results */}
                  <ul className="space-y-2">
                    {project.results.map((result) => (
                      <li key={result} className="flex items-center text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
