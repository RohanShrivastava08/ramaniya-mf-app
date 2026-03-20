import React from 'react';
import { Section } from '../layout/Section';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export function AppPreview() {
  return (
    <Section bg="white" className="overflow-hidden">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Track your wealth, beautifully</h2>
        <p className="text-slate-600 text-lg">A clean, intuitive dashboard that gives you complete control over your financial future.</p>
      </div>

      <div className="relative mx-auto max-w-5xl">
        {/* Decorative background blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-fintech-green-100/60 rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-fintech-blue-100/60 rounded-full blur-3xl -z-10"></div>
        
        {/* Dashboard Mockup Container */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-xl shadow-2xl overflow-hidden"
        >
          {/* Mockup Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="ml-4 text-sm font-medium text-slate-400">overview / portfolio</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-100"></div>
              <div className="w-8 h-8 rounded-full bg-slate-100"></div>
            </div>
          </div>

          {/* Mockup Body Grid */}
          <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 bg-slate-50/50">
            
            {/* Left Column (Chart & Stats) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="text-sm font-medium text-slate-500 mb-1">Total Portfolio Value</div>
                    <div className="text-4xl font-extrabold text-slate-900">₹14,50,000</div>
                    <div className="text-fintech-green-600 font-medium text-sm mt-2 flex items-center gap-1">
                      + ₹1,24,000 (9.4% XIRR)
                    </div>
                  </div>
                  <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
                    {['1M', '3M', '1Y', 'ALL'].map(t => (
                      <div key={t} className={`px-3 py-1 text-xs font-medium rounded-md ${t === '1Y' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}>
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* SVG Mock Chart */}
                <div className="h-48 w-full relative">
                  <svg viewBox="0 0 400 100" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#16a34a" stopOpacity="0.2"></stop>
                        <stop offset="100%" stopColor="#16a34a" stopOpacity="0"></stop>
                      </linearGradient>
                    </defs>
                    <path d="M0,100 L0,70 Q50,80 100,50 T200,40 T300,20 T400,10 L400,100 Z" fill="url(#gradient)"></path>
                    <path d="M0,70 Q50,80 100,50 T200,40 T300,20 T400,10" fill="none" stroke="#22c55e" strokeWidth="3"></path>
                  </svg>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-fintech-blue-50 mb-3"></div>
                  <div className="text-sm text-slate-500">Invested Amount</div>
                  <div className="text-xl font-bold text-slate-900">₹13,26,000</div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 mb-3"></div>
                  <div className="text-sm text-slate-500">Current SIPs</div>
                  <div className="text-xl font-bold text-slate-900">₹45,000/mo</div>
                </div>
              </div>
            </div>
            
            {/* Right Column (Funds List) */}
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-6">Your Top Holdings</h3>
              <div className="space-y-5">
                {[
                  { name: "Parag Parikh Flexi", type: "Equity", val: "₹4.2L", ret: "+18.2%" },
                  { name: "SBI Small Cap", type: "Equity", val: "₹3.1L", ret: "+24.5%" },
                  { name: "HDFC Liquid Fund", type: "Debt", val: "₹2.5L", ret: "+6.8%" },
                  { name: "Axis Midcap", type: "Equity", val: "₹2.1L", ret: "+14.1%" }
                ].map((fund, i) => (
                  <div key={i} className="flex justify-between items-center group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-slate-50 border border-slate-100 flex items-center justify-center font-bold text-xs text-slate-400 group-hover:bg-fintech-green-50 group-hover:text-fintech-green-600 transition-colors">
                        M{i+1}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{fund.name}</div>
                        <div className="text-xs text-slate-500">{fund.type}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-slate-900">{fund.val}</div>
                      <div className="text-xs font-medium text-fintech-green-600">{fund.ret}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-2 rounded-lg bg-slate-50 text-fintech-blue-600 font-medium text-sm hover:bg-fintech-blue-50 transition-colors">
                View All Holdings
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
