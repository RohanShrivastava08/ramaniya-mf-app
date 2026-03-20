import React from 'react';
import { Lightbulb, CalendarClock, PieChart, Sparkles } from 'lucide-react';
import { Section } from '../layout/Section';
import { Card } from '../ui/Card';

export function Features() {
  const features = [
    {
      icon: <Lightbulb size={24} className="text-fintech-blue-600" />,
      title: "Smart Fund Discovery",
      description: "Our algorithm ranks funds based on consistent performance, lower volatility, and expert ratings.",
      color: "bg-fintech-blue-50"
    },
    {
      icon: <CalendarClock size={24} className="text-fintech-green-600" />,
      title: "SIP & Lump Sum",
      description: "Automate your investments with weekly or monthly SIPs. Or invest lump sums when the market drops.",
      color: "bg-fintech-green-50"
    },
    {
      icon: <PieChart size={24} className="text-purple-600" />,
      title: "Real-time Tracking",
      description: "Monitor your portfolio's performance with beautiful graphs and actionable insights in real-time.",
      color: "bg-purple-50"
    },
    {
      icon: <Sparkles size={24} className="text-amber-600" />,
      title: "AI-powered Insights",
      description: "Get personalized rebalancing alerts and tax-saving opportunities tailored specifically for you.",
      color: "bg-amber-50"
    }
  ];

  return (
    <Section id="features" bg="white">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need to grow wealth</h2>
        <p className="text-slate-600 text-lg">Powerful features wrapped in a beautifully simple interface.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, idx) => (
          <Card key={idx} className="border-slate-100 flex flex-col h-full">
            <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-6`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
            <p className="text-slate-600 leading-relaxed flex-1">{feature.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
