import { Lightbulb, Monitor, TrendingUp, Headphones } from 'lucide-react';

const processes = [
  {
    icon: Lightbulb,
    title: 'Strategy & Product',
    description: 'We define your vision, target audience, and build a roadmap that aligns with your business goals.',
    features: ['Market Research', 'User Personas', 'Product Roadmap'],
  },
  {
    icon: Monitor,
    title: 'Website & Platform',
    description: 'We design and develop stunning, high-performance websites and platforms that convert.',
    features: ['Custom Design', 'Development', 'Mobile-First'],
  },
  {
    icon: TrendingUp,
    title: 'Growth & Optimization',
    description: 'We implement strategies to drive traffic, improve conversions, and scale your business.',
    features: ['SEO & Analytics', 'A/B Testing', 'Performance'],
  },
  {
    icon: Headphones,
    title: 'Ongoing Support',
    description: 'We provide continuous support, updates, and improvements to keep your business growing.',
    features: ['24/7 Support', 'Regular Updates', 'Maintenance'],
  },
];

const Process = () => {
  return (
    <section id="process" className="py-24 relative bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-indigo-600 text-sm font-semibold tracking-wider uppercase">Our Process</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 text-slate-900">How We Build</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            A proven methodology that transforms your ideas into successful digital products.
          </p>
        </div>

        {/* Process Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processes.map((process, index) => (
            <div
              key={process.title}
              className="group relative p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300"
            >
              

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center mb-5 group-hover:bg-indigo-100 transition-colors relative z-10">
                <process.icon className="w-7 h-7 text-slate-600" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 text-slate-900 relative z-10">{process.title}</h3>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">{process.description}</p>

              {/* Features */}
              <ul className="space-y-2.5">
                {process.features.map((feature) => (
                  <li key={feature} className="text-sm text-slate-600 flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;