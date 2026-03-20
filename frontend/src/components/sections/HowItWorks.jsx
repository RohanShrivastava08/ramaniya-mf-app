import React from 'react';
import { UserCheck, Search, IndianRupee } from 'lucide-react';
import { Section } from '../layout/Section';

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: <UserCheck size={32} />,
      title: "Complete KYC in minutes",
      description: "Paperless onboarding via Aadhaar. Fast, secure, and hassle-free."
    },
    {
      num: "02",
      icon: <Search size={32} />,
      title: "Choose mutual funds",
      description: "Discover top-rated equity, debt, and hybrid funds using our smart tools."
    },
    {
      num: "03",
      icon: <IndianRupee size={32} />,
      title: "Invest via UPI / Netbanking",
      description: "Start a SIP or invest a lump sum using simple payment methods."
    }
  ];

  return (
    <Section bg="gray" id="how-it-works">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Simple, transparent investing</h2>
        <p className="text-slate-600 text-lg">Your wealth creation journey starts in three easy steps.</p>
      </div>

      <div className="relative">
        {/* Connecting Line */}
        <div className="hidden md:block absolute top-[45px] left-[15%] right-[15%] h-0.5 bg-slate-200 border-t-2 border-dashed border-slate-300"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-6 relative">
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-fintech-green-100 text-fintech-green-700 font-bold text-sm flex items-center justify-center shadow-sm">
                  {step.num}
                </div>
                <div className="text-fintech-blue-600">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
