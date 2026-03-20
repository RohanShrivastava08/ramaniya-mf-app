import React from 'react';
import { ShieldCheck, Lock, Activity, Award } from 'lucide-react';
import { Section } from '../layout/Section';

export function Trust() {
  const badges = [
    { icon: <Lock size={24} />, title: "Secure & Encrypted", subtitle: "256-bit bank grade security" },
    { icon: <Award size={24} />, title: "Trusted Platform", subtitle: "Over 50+ AMC partners" },
    { icon: <ShieldCheck size={24} />, title: "SEBI Compliant", subtitle: "Fully regulated & secure" },
    { icon: <Activity size={24} />, title: "Seamless KYC", subtitle: "100% paperless onboarding" },
  ];

  return (
    <Section bg="white" className="border-y border-slate-100 py-12">
      <div className="text-center mb-8">
        <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
          Trusted by millions of investors across India
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
        {badges.map((badge, idx) => (
          <div key={idx} className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-700 flex items-center justify-center mb-4">
              {badge.icon}
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">{badge.title}</h3>
            <p className="text-xs text-slate-500">{badge.subtitle}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
