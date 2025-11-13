import { Mail, ArrowRight, Search, Calendar, Bell, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plan } from "@/types/plan";

const Index = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const auth = localStorage.getItem("nexmail_auth");
    if (auth) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const plans: Plan[] = [
    {
      id: '1',
      type: 'starter',
      title: "Free",
      price: "$0",
      features: [
        "1 Team member",
        "2 GB Storage",
        "Upto 4 pages",
        "Community support",
        "Analytics dashboard"
      ]
    },
    {
      id: '2',
      type: 'professional',
      title: "Professional",
      price: "$49",
      features: [
        "5 Team members",
        "20 GB Storage",
        "Upto 12 pages",
        "Priority support",
        "Analytics dashboard",
        "Export analytics"
      ],
      popular: true
    },
    {
      id: '3',
      type: 'enterprise',
      title: "Enterprise",
      price: "$99",
      features: [
        "Unlimited members",
        "50 GB Storage",
        "Custom pages",
        "24/7 support",
        "Analytics dashboard",
        "Export analytics",
        "API Access"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#222222] to-[#1A1F2C] overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30"></div>
      
      {/* Gradient Orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-accent/30 blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 float glow">
            <Mail className="h-8 w-8 text-white" />
            <span className="text-2xl font-bold text-white">Nexmail</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-white/90 hover:text-white transition-colors">Features</a>
            <a href="#plans" className="text-white/90 hover:text-white transition-colors">Plans</a>
            <a href="#testimonials" className="text-white/90 hover:text-white transition-colors">Testimonials</a>
            <Button variant="ghost" className="text-white hover:text-white/90" onClick={() => navigate("/login")}>Login</Button>
            <Button className="bg-primary text-white hover:bg-primary/90" onClick={() => navigate("/signup")}>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-up opacity-0 [animation-delay:200ms]">
          Next Generation<br />Email Management
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-12 animate-fade-up opacity-0 [animation-delay:400ms]">
          Experience the future of email with AI-driven summarization and automated responses. Stay organized and efficient with our intelligent email assistant.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center animate-fade-up opacity-0 [animation-delay:600ms]">
          <Button size="lg" className="bg-primary text-white hover:bg-primary/90" onClick={() => navigate("/signup")}>
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10" onClick={() => navigate("/login")}>
            Sign In
          </Button>
          <Button size="lg" variant="ghost" className="text-white/80" onClick={() => {
            // Demo mode: create a sample user and navigate to dashboard
            const demoUser = { id: 'demo-user', email: 'demo@nexmail.test', name: 'Demo User', created_at: new Date().toISOString() };
            localStorage.setItem('nexmail_user', JSON.stringify(demoUser));
            localStorage.setItem('nexmail_auth', 'true');
            navigate('/dashboard');
          }}>
            Try Demo
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { number: "10M+", label: "Emails Processed" },
            { number: "99.9%", label: "Accuracy Rate" },
            { number: "5000+", label: "Happy Users" },
          ].map((stat, index) => (
            <div key={index} className="float glass p-8 animate-fade-up opacity-0" style={{ animationDelay: `${800 + index * 200}ms` }}>
              <h3 className="text-4xl font-bold text-white mb-2">{stat.number}</h3>
              <p className="text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-white text-center mb-12">AI-Powered Email Analysis</h2>
        <p className="text-white/80 text-center mb-16 max-w-2xl mx-auto">
          Our advanced AI analyzes your email patterns and provides smart suggestions for better email management.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass p-8 text-center hover:scale-105 transform duration-300">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold text-white mb-2">Calendar Integration</h3>
            <p className="text-white/80">Seamlessly sync with your calendar for better scheduling.</p>
          </div>
          <div className="glass p-8 text-center hover:scale-105 transform duration-300">
            <Bell className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold text-white mb-2">Smart Notifications</h3>
            <p className="text-white/80">Get intelligent alerts for important emails and deadlines.</p>
          </div>
          <div className="glass p-8 text-center hover:scale-105 transform duration-300">
            <Search className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold text-white mb-2">Intelligent Search</h3>
            <p className="text-white/80">Find any email instantly with our smart search.</p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section id="plans" className="container mx-auto px-6 py-20">
        <div className="text-center space-y-4 mb-16 animate-fade-up">
          <h2 className="text-4xl font-bold text-white">Simple, transparent pricing</h2>
          <p className="text-lg text-white/70">No contracts. No surprise fees.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative flex flex-col p-8 bg-white/5 backdrop-blur-xl rounded-3xl border transition-all duration-300 hover:translate-y-[-8px] ${
                plan.popular ? 'border-primary/50 scale-105 md:scale-110' : 'border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">{plan.title}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-white/60">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/80">
                    <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full ${
                  plan.popular 
                    ? 'bg-primary hover:bg-primary/90' 
                    : 'bg-white/10 hover:bg-white/20'
                } text-white transition-all duration-300`}
                onClick={() => navigate("/signup")}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Get Started'}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-white text-center mb-16">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: "NexMail has completely transformed how I handle my emails. The AI summarization is incredibly accurate!",
              author: "Sarah Johnson",
              role: "CEO, TechStart"
            },
            {
              quote: "The smart categorization has saved me hours of work. I can't imagine going back to manual email management.",
              author: "Michael Chen",
              role: "Product Manager"
            },
            {
              quote: "Best investment for our team's productivity. The AI responses are surprisingly human-like!",
              author: "Emma Davis",
              role: "Marketing Director"
            }
          ].map((testimonial, index) => (
            <div
              key={index}
              className="glass p-8 text-left hover:scale-105 transform duration-300"
            >
              <p className="text-white/90 mb-6 text-lg">{testimonial.quote}</p>
              <div>
                <p className="text-white font-semibold">{testimonial.author}</p>
                <p className="text-white/70">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-white/10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-white/80">
          <div className="float">
            <div className="flex items-center space-x-2 mb-4">
              <Mail className="h-6 w-6 text-white" />
              <span className="text-xl font-bold text-white">Nexmail</span>
            </div>
              <p className="text-sm">
                Making email management smarter
              </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-2 transform duration-200 inline-block">About</a></li>
              <li><a href="#features" className="hover:text-white transition-colors hover:translate-x-2 transform duration-200 inline-block">Features</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors hover:translate-x-2 transform duration-200 inline-block">Testimonials</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-2 transform duration-200 inline-block">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-2 transform duration-200 inline-block">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover:scale-110 transform duration-200">GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover:scale-110 transform duration-200">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/60">
          <p>&copy; {new Date().getFullYear()} Nexmail. All rights reserved.</p>
        </div>
        {/* Watermark inside footer so it only appears when footer is visible */}
        <div className="absolute inset-0 flex items-end justify-center z-0 pointer-events-none" aria-hidden="true">
          <div className="w-full text-center select-none pb-6">
            <span className="inline-block leading-none font-extrabold tracking-tight text-white" style={{fontSize: 'clamp(36px, 6vw, 96px)', opacity: 0.04}}>
              Developed by Team Fazed
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
