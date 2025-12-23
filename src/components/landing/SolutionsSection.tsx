import { useRef } from "react";
import { Globe, Zap, TrendingUp, BarChart3, Check } from "lucide-react";

const solutions = [
  {
    id: "build",
    icon: Globe,
    title: "Build & Presence",
    subtitle: "Build a digital foundation that converts",
    description: "From your first website to an integrated digital ecosystem, we help you create an online presence that performs and converts.",
    services: [
      {
        name: "Custom Website Design",
        description: "Build stunning, mobile-responsive websites tailored to your brand.",
        features: ["Mobile Optimization", "SEO-Integrated Design", "Fast Loading, High Conversion", "CMS & Custom Dashboards"]
      },
      {
        name: "Conversion Pages",
        description: "Create funnels that turn visitors into booked calls and sales.",
        features: ["Conversion-focused layouts & flows", "Custom Funnels", "A/B Testing", "Analytics Integration"]
      },
      {
        name: "Google Business Profile",
        description: "Boost your local visibility and attract clients where they search most.",
        features: ["Local SEO Optimization", "Profile Setup & Review Management", "Analytics Tracking", "Local Listing Management"]
      }
    ],
    tagline: "Your digital home — designed to earn trust and convert visitors into customers.",
    image: "/Build.png",
  },
  {
    id: "automate",
    icon: Zap,
    title: "Automate & Scale",
    subtitle: "Let your systems work while you sleep",
    description: "Streamline operations, automate repetitive tasks, and scale your business with smart integrations and marketing automation.",
    services: [
      {
        name: "AI Setup & Automation",
        description: "Automate client interactions with intelligent systems for calls, chats, & scheduling.",
        features: ["AI Chat & Call Systems", "Auto Booking & Lead Capture", "Workflow Integrations", "24/7 Automated Operations"]
      },
      {
        name: "Email Marketing Campaigns",
        description: "Nurture leads with personalized, automated email sequences that build relationships.",
        features: ["Campaign Design & Segmentation", "Drip Sequences & Analytics", "Lead Nurturing Automations", "Engagement Tracking"]
      },
      {
        name: "Reputation & Reviews",
        description: "Build credibility with automated feedback and reputation management.",
        features: ["Review Collection & Display", "Testimonial Automation", "Feedback Monitoring Systems", "Response Management"]
      }
    ],
    tagline: "From leads to bookings — everything runs seamlessly.",
    image: "/Automate.png",
  },
  {
    id: "grow",
    icon: TrendingUp,
    title: "Engage & Grow",
    subtitle: "Build an audience that stays",
    description: "Transform your audience into loyal advocates through authentic content, storytelling, and consistent visibility.",
    services: [
      {
        name: "Social Media Management",
        description: "Engage audiences with content that builds trust and community.",
        features: ["Content Creation & Strategy", "Posting Schedules & Automation", "Engagement Tracking", "Brand Community Building"]
      },
      {
        name: "Custom Reels & Videos",
        description: "Show your story through professional, shareable videos that drive attention & leads.",
        features: ["Video Production & Reels Creation", "Content Strategy", "Social Media Integration", "Professional Editing"]
      },
      {
        name: "Content Growth Campaigns",
        description: "Build consistent visibility through strategic content that attracts, educates, & converts.",
        features: ["Blog & Newsletter Systems", "Cross-Channel Publishing", "SEO-Driven Content Planning", "Engagement Optimization"]
      }
    ],
    tagline: "Turn engagement into growth through storytelling and visibility.",
    image: "/Grow.png",
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Analytics & Insights",
    subtitle: "Know what works. Improve what matters",
    description: "Make smarter decisions with real data — not guesswork. We help you understand user behavior, optimize performance, and measure success with precision.",
    services: [
      {
        name: "Performance Analytics",
        description: "Get visibility into what's driving growth and what's not.",
        features: ["Funnel Performance & Drop-off Tracking", "Real-time KPI Dashboards", "Conversion Metrics & Trend Visualization", "Traffic Source Analysis"]
      },
      {
        name: "Optimization Experiments",
        description: "Continuously test, learn, and refine to boost results.",
        features: ["A/B Testing & Variant Tracking", "UX & UI Impact Measurement", "Behavior Heatmaps & Click Maps", "Data-Driven Content Improvements"]
      },
      {
        name: "Analytics Dashboards",
        description: "Centralize your data and insights across tools in one clean view.",
        features: ["Marketing ROI Reporting", "Attribution & Forecasting Models", "Data Pipeline Integrations", "Automated Performance Summaries"]
      }
    ],
    tagline: "Data-backed decisions for continuous improvement.",
    image: "/Analytics.png",
  },
];

export function SolutionsSection() {
  return (
    <section id="solutions" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Solutions</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mt-4 mb-6">
            Solutions Designed for Every Stage of Growth
          </h2>
          <p className="text-xl text-gray-600">
            Whether you're launching, automating, or scaling, Zuvigo provides structured digital systems that help your business thrive.
          </p>
        </div>

        {/* Solutions */}
        <div className="space-y-32">
          {solutions.map((solution, index) => (
            <SolutionBlock key={solution.id} solution={solution} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionBlock({ solution, index }) {
  const isLeft = index % 2 === 0;

  return (
    <div className="relative">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start lg:items-stretch">
        
        {/* Content - Left or Right */}
        <div className={isLeft ? 'lg:order-1' : 'lg:order-2'}>
          {/* Header */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-400/20 mb-6">
            <solution.icon className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-gray-900">{solution.title}</span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {solution.subtitle}
          </h3>
          
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            {solution.description}
          </p>

          {/* Services */}
          <div className="space-y-6 mb-8">
            {solution.services.map((service) => (
              <div
                key={service.name}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {service.name}
                </h4>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Tagline */}
          <p className="text-lg font-semibold text-gray-900 italic border-l-4 border-blue-600 pl-4">
            {solution.tagline}
          </p>
        </div>

        {/* Image - Sticky Right or Left */}
        <div className={`hidden lg:block ${isLeft ? 'lg:order-2' : 'lg:order-1'}`}>
          <div className="sticky top-36 h-fit">
            <img
              src={solution.image}
              alt={solution.title}
              className="w-full rounded-3xl shadow-2xl object-cover"
            />
          </div>
        </div>

        {/* Mobile Image */}
        <div className="lg:hidden">
          <img
            src={solution.image}
            alt={solution.title}
            className="w-full h-auto rounded-3xl shadow-2xl object-cover"
          />
        </div>
      </div>
    </div>
  );
}