import { ArrowRight, Mail, User, MessageSquare, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

const CTA = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Determine backend URL based on environment
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

      const response = await fetch(`${backendUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      // Show success message
      toast({
        title: 'Success!',
        description: 'Your message has been sent successfully. We\'ll get back to you soon.',
      });

      // Reset form
      setFormData({ name: '', email: '', service: '', message: '' });
    } catch (error) {
      // Show error message
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to submit form. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50 to-sky-50">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-blue-50/50 to-sky-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/30 rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-xl">


            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Ready to Build
              <span className="block mt-2 gradient-text">What's Next?</span>
            </h2>

            <p className="text-lg text-slate-700 mb-10">
              Let's discuss how we can help transform your ideas into a powerful digital presence
              that drives real results.
            </p>

            {/* Trust Indicators */}
            <div className="pt-8 border-t border-slate-300">
              <p className="text-sm text-slate-600 mb-4">Trusted by founders worldwide</p>
              <div className="flex items-center gap-4 flex-wrap">
                {['Startups', 'Agencies', 'E-Commerce', 'SaaS', 'Creators'].map((type) => (
                  <span key={type} className="text-slate-500 text-sm">
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 rounded-2xl p-8 border border-slate-200 shadow-lg">
            <h3 className="text-2xl font-bold mb-2 text-slate-900">Get in Touch</h3>
            <p className="text-slate-700 mb-8">Fill out the form below and we'll get back to you shortly.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-slate-800 flex items-center gap-2">
                  <User className="w-4 h-4 text-black" />
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-500"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-800 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-black" />
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-500"
                />
              </div>

              {/* Service Field */}
              <div className="space-y-2">
                <label htmlFor="service" className="text-sm font-medium text-slate-800 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-black" />
                  Service Interested In
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full h-10 px-3 rounded-md border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select a service</option>
                  <option value="Build & Presence">Build & Presence</option>
                  <option value="Automate & Scale">Automate & Scale</option>
                  <option value="Engage & Grow">Engage & Grow</option>
                  <option value="Analytics & Insights">Analytics & Insights</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-800 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-black" />
                  Tell us about your project
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Describe your project, goals, or any specific requirements..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-500 min-h-32 resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:text-white transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                {!isSubmitting && <ArrowRight className="ml-2 w-4 h-4" />}
              </Button>

              <p className="text-xs text-slate-600 font-bold text-center">
                We respect your privacy. Your information is secure.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;