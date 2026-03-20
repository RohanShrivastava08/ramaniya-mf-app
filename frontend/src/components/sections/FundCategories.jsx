import React from 'react';
import { TrendingUp, Shield, ActivitySquare, ArrowRight } from 'lucide-react';
import { Section } from '../layout/Section';
import { Card } from '../ui/Card';

export function FundCategories({ onInvest }) {
  const categories = [
    {
      title: "Equity Funds",
      icon: <TrendingUp size={24} className="text-fintech-blue-600" />,
      risk: "High Risk",
      return: "12-18%",
      description: "Invest in shares of proven companies. Best for long-term wealth creation and beating inflation.",
      color: "bg-fintech-blue-50"
    },
    {
      title: "Debt Funds",
      icon: <Shield size={24} className="text-fintech-green-600" />,
      risk: "Low Risk",
      return: "6-8%",
      description: "Invest in government bonds and stable securities. Best for steady income and short-term goals.",
      color: "bg-fintech-green-50"
    },
    {
      title: "Hybrid Funds",
      icon: <ActivitySquare size={24} className="text-purple-600" />,
      risk: "Moderate Risk",
      return: "8-12%",
      description: "A balanced mix of equity and debt. Best for first-time investors seeking stable growth.",
      color: "bg-purple-50"
    }
  ];

  return (
    <Section id="funds" bg="gray">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Funds for every goal</h2>
          <p className="text-slate-600 text-lg">Whether you're saving for a home, retirement, or just beating inflation, we have the right funds for you.</p>
        </div>
        <button className="text-fintech-green-600 font-medium flex items-center gap-2 hover:text-fintech-green-700 transition-colors whitespace-nowrap">
          View all categories <ArrowRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((cat, idx) => (
          <Card key={idx} hoverEffect className="group cursor-pointer border-slate-200 hover:border-fintech-green-200 transition-colors" onClick={() => onInvest(cat.title)}>
            <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              {cat.icon}
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{cat.title}</h3>
            <p className="text-slate-600 mb-6">{cat.description}</p>
            
            <div className="grid grid-cols-2 gap-4 py-4 border-t border-slate-100">
              <div>
                <div className="text-xs text-slate-500 mb-1">Expected Return</div>
                <div className="font-bold text-fintech-green-600">{cat.return}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-1">Risk Profile</div>
                <div className="font-semibold text-slate-700">{cat.risk}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
