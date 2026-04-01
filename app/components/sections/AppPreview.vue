<script setup lang="ts">
import Section from '~/components/layout/Section.vue'

const timeframes = ['1M', '3M', '1Y', 'ALL']
const holdings = [
  { name: "Parag Parikh Flexi", type: "Equity", val: "₹4.2L", ret: "+18.2%" },
  { name: "SBI Small Cap", type: "Equity", val: "₹3.1L", ret: "+24.5%" },
  { name: "HDFC Liquid Fund", type: "Debt", val: "₹2.5L", ret: "+6.8%" },
  { name: "Axis Midcap", type: "Equity", val: "₹2.1L", ret: "+14.1%" }
]
</script>

<template>
  <Section bg="white" class="overflow-hidden">
    <div class="text-center max-w-3xl mx-auto mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Track your wealth, beautifully</h2>
      <p class="text-slate-600 text-lg">A clean, intuitive dashboard that gives you complete control over your financial future.</p>
    </div>

    <div class="relative mx-auto max-w-5xl">
      <!-- Decorative background blur -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-fintech-green-100/60 rounded-full blur-3xl -z-10"></div>
      <div class="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-fintech-blue-100/60 rounded-full blur-3xl -z-10"></div>
      
      <!-- Dashboard Mockup Container -->
      <div class="animate-fade-in-up rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-xl shadow-2xl overflow-hidden">
        <!-- Mockup Header -->
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
          <div class="flex items-center gap-2">
            <div class="flex gap-1.5">
              <div class="w-3 h-3 rounded-full bg-red-400"></div>
              <div class="w-3 h-3 rounded-full bg-amber-400"></div>
              <div class="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div class="ml-4 text-sm font-medium text-slate-400">overview / portfolio</div>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-slate-100"></div>
            <div class="w-8 h-8 rounded-full bg-slate-100"></div>
          </div>
        </div>

        <!-- Mockup Body Grid -->
        <div class="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 bg-slate-50/50">
          
          <!-- Left Column (Chart & Stats) -->
          <div class="lg:col-span-2 space-y-6">
            <div class="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <div class="flex justify-between items-start mb-8">
                <div>
                  <div class="text-sm font-medium text-slate-500 mb-1">Total Portfolio Value</div>
                  <div class="text-4xl font-extrabold text-slate-900">₹14,50,000</div>
                  <div class="text-fintech-green-600 font-medium text-sm mt-2 flex items-center gap-1">
                    + ₹1,24,000 (9.4% XIRR)
                  </div>
                </div>
                <div class="flex gap-2 bg-slate-100 p-1 rounded-lg">
                  <div v-for="t in timeframes" :key="t" :class="`px-3 py-1 text-xs font-medium rounded-md ${t === '1Y' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`">
                    {{ t }}
                  </div>
                </div>
              </div>
              
              <!-- SVG Mock Chart -->
              <div class="h-48 w-full relative">
                <svg viewBox="0 0 400 100" class="w-full h-full preserve-3d" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#16a34a" stopOpacity="0.2"></stop>
                      <stop offset="100%" stopColor="#16a34a" stopOpacity="0"></stop>
                    </linearGradient>
                  </defs>
                  <path d="M0,100 L0,70 Q50,80 100,50 T200,40 T300,20 T400,10 L400,100 Z" fill="url(#gradient)"></path>
                  <path d="M0,70 Q50,80 100,50 T200,40 T300,20 T400,10" fill="none" stroke="#22c55e" stroke-width="3"></path>
                </svg>
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-6">
              <div class="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                <div class="w-10 h-10 rounded-lg bg-fintech-blue-50 mb-3"></div>
                <div class="text-sm text-slate-500">Invested Amount</div>
                <div class="text-xl font-bold text-slate-900">₹13,26,000</div>
              </div>
              <div class="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                <div class="w-10 h-10 rounded-lg bg-purple-50 mb-3"></div>
                <div class="text-sm text-slate-500">Current SIPs</div>
                <div class="text-xl font-bold text-slate-900">₹45,000/mo</div>
              </div>
            </div>
          </div>
          
          <!-- Right Column (Funds List) -->
          <div class="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <h3 class="font-bold text-slate-900 mb-6">Your Top Holdings</h3>
            <div class="space-y-5">
              <div v-for="(fund, i) in holdings" :key="i" class="flex justify-between items-center group cursor-pointer">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded bg-slate-50 border border-slate-100 flex items-center justify-center font-bold text-xs text-slate-400 group-hover:bg-fintech-green-50 group-hover:text-fintech-green-600 transition-colors">
                    M{{ i+1 }}
                  </div>
                  <div>
                    <div class="text-sm font-semibold text-slate-900">{{ fund.name }}</div>
                    <div class="text-xs text-slate-500">{{ fund.type }}</div>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-sm font-bold text-slate-900">{{ fund.val }}</div>
                  <div class="text-xs font-medium text-fintech-green-600">{{ fund.ret }}</div>
                </div>
              </div>
            </div>
            <button class="w-full mt-6 py-2 rounded-lg bg-slate-50 text-fintech-blue-600 font-medium text-sm hover:bg-fintech-blue-50 transition-colors">
              View All Holdings
            </button>
          </div>
        </div>
      </div>
    </div>
  </Section>
</template>
