
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Calendar, Apple, FileText, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background to-muted py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center sm:text-left">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              <span className="block">Hormone Harmonics</span>
              <span className="block text-primary mt-2">Balance. Strength. Vitality.</span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-muted-foreground max-w-3xl sm:mx-0 mx-auto">
              The comprehensive health tracker designed specifically for pre-menopausal and 
              menopausal women, combining hormone tracking with personalized fitness and nutrition guidance.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center sm:justify-start">
              <Link
                to="/profile-setup"
                className="rounded-md bg-primary px-6 py-3 text-lg font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                Get Started <ArrowRight size={18} />
              </Link>
              <Link
                to="/dashboard"
                className="rounded-md bg-secondary px-6 py-3 text-lg font-semibold text-secondary-foreground shadow-sm hover:bg-secondary/90 transition-colors flex items-center justify-center"
              >
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-12 text-center">
            Personalized For Your Hormonal Journey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-5xl mx-auto">
          <div className="bg-background rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Why Hormone-Specific Tracking Matters
              </h2>
              <p className="text-muted-foreground mb-4">
                Traditional fitness apps don't account for the unique hormonal patterns of women—especially 
                during the pre-menopausal and menopausal transitions. Our approach integrates:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex gap-2">
                  <div className="flex-shrink-0 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">✓</div>
                  <span className="text-foreground">Hormone fluctuation tracking for optimal workout timing</span>
                </li>
                <li className="flex gap-2">
                  <div className="flex-shrink-0 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">✓</div>
                  <span className="text-foreground">Personalized nutrition recommendations based on your hormonal status</span>
                </li>
                <li className="flex gap-2">
                  <div className="flex-shrink-0 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">✓</div>
                  <span className="text-foreground">Intelligent workout adjustments to prevent overtraining</span>
                </li>
                <li className="flex gap-2">
                  <div className="flex-shrink-0 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">✓</div>
                  <span className="text-foreground">Blood test analysis for deeper health insights</span>
                </li>
              </ul>
              <div className="mt-8 flex justify-center">
                <Link
                  to="/hormone-tracker"
                  className="rounded-md bg-accent px-5 py-2.5 text-md font-semibold text-accent-foreground shadow-sm hover:bg-accent/90 transition-colors flex items-center gap-2"
                >
                  Start Tracking Your Hormones <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Feature card component
const FeatureCard = ({ title, description, icon: Icon, color }) => {
  return (
    <div className="bg-background rounded-xl shadow-sm border border-border p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-4", color)}>
        <Icon size={24} className="text-background" />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

// Features data
const features = [
  {
    title: 'Hormone Tracking',
    description: 'Monitor estrogen, progesterone, testosterone, and cortisol levels to optimize your training and nutrition.',
    icon: Activity,
    color: 'bg-hormone-estrogen'
  },
  {
    title: 'Cycle-Adaptive Training',
    description: 'Automatically adjust your workout intensity based on your hormonal phase and energy levels.',
    icon: Calendar,
    color: 'bg-hormone-progesterone'
  },
  {
    title: 'Nutrition Guidance',
    description: 'Get personalized meal plans that support hormonal balance and recovery needs.',
    icon: Apple,
    color: 'bg-hormone-testosterone'
  },
  {
    title: 'Blood Test Analysis',
    description: 'Upload your lab results for AI-powered insights and personalized recommendations.',
    icon: FileText,
    color: 'bg-hormone-cortisol'
  },
  {
    title: 'Smart Recommendations',
    description: 'Receive AI-generated insights based on your unique data patterns and goals.',
    icon: Brain,
    color: 'bg-primary'
  },
  {
    title: 'Progress Tracking',
    description: 'Visualize your strength gains, hormone balance, and health improvements over time.',
    icon: Activity,
    color: 'bg-accent'
  }
];

export default Index;
