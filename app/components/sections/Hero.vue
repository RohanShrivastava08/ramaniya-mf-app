<script setup lang="ts">
import { ArrowRight, Play, ShieldCheck, CheckCircle2, TrendingUp } from 'lucide-vue-next'
import Button from '~/components/ui/Button.vue'

const emit = defineEmits(['startClick'])

const scrollToFunds = () => {
  document.getElementById('funds')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section class="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
    <!-- Background gradients -->
    <div class="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-fintech-green-50 via-white to-white"></div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        <div class="animate-fade-in-up text-center lg:text-left">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fintech-green-100 text-fintech-green-800 font-medium text-sm mb-6">
            <ShieldCheck :size="16" />
            <span>India's Most Secure Investment Platform</span>
          </div>
          
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            Invest Smarter. <br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-fintech-green-600 to-fintech-blue-600">
              Grow Wealth with Confidence.
            </span>
          </h1>
          
          <p class="text-lg text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0">
            Simple, fast, and secure mutual fund investing for modern India. Start your wealth creation journey today with zero setup fees.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button size="lg" class="gap-2" @click="emit('startClick')">
              Start Investing <ArrowRight :size="20" />
            </Button>
            <Button size="lg" variant="outline" class="gap-2" @click="scrollToFunds">
              <Play :size="20" class="text-fintech-green-600" /> Explore Funds
            </Button>
          </div>
          
          <div class="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-500">
            <div class="flex items-center gap-2">
              <CheckCircle2 :size="16" class="text-fintech-green-500" />
              <span>Zero Commission</span>
            </div>
            <div class="flex items-center gap-2">
              <CheckCircle2 :size="16" class="text-fintech-green-500" />
              <span>Cancel Anytime</span>
            </div>
          </div>
        </div>
        
        <div class="animate-fade-in-up relative lg:ml-auto w-full max-w-lg mx-auto" style="animation-delay: 200ms;">
          <!-- Geometric background shapes -->
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-fintech-green-200/50 rounded-full blur-3xl -z-10"></div>
          
          <!-- UI Mockup Phone Style -->
          <div class="relative bg-white border-[8px] border-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden aspect-[4/8] max-w-[320px] mx-auto">
            <!-- Top Notch -->
            <div class="absolute top-0 inset-x-0 h-6 bg-slate-900 rounded-b-xl w-32 mx-auto z-20"></div>
            
            <!-- App Content -->
            <div class="p-5 pt-10 h-full flex flex-col bg-slate-50">
              <div class="flex justify-between items-center mb-6">
                <div>
                  <div class="text-xs text-slate-500">Portfolio Value</div>
                  <div class="text-2xl font-bold text-slate-900">₹4,25,000</div>
                </div>
                <div class="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                  <img src="https://ui-avatars.com/api/?name=User&background=16a34a&color=fff" alt="User" />
                </div>
              </div>
              
              <!-- 1D Return card -->
              <div class="bg-fintech-green-50 rounded-xl p-4 mb-6 border border-fintech-green-100">
                <div class="flex items-center gap-2 text-fintech-green-700 text-sm font-medium mb-1">
                  <TrendingUp :size="16" /> 1D Return
                </div>
                <div class="text-fintech-green-700 font-bold">+ ₹3,450 (0.8%)</div>
              </div>
              
              <div class="text-sm font-bold text-slate-900 mb-3">Your Top Funds</div>
              
              <!-- Fund Items -->
              <div class="space-y-3 flex-1">
                <template v-for="(name, index) in ['Axis Bluechip', 'Mirae Asset', 'Nippon India']" :key="index">
                  <div class="bg-white p-3 rounded-xl border border-slate-100 flex items-center justify-between shadow-sm">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded bg-fintech-blue-100 flex items-center justify-center text-fintech-blue-700 font-bold text-xs">
                        {{ ['A', 'M', 'N'][index] }}
                      </div>
                      <div>
                        <div class="text-xs font-bold text-slate-800">{{ name }}</div>
                        <div class="text-[10px] text-slate-500">Equity</div>
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="text-xs font-bold text-fintech-green-600">+{{ ['18.2', '14.5', '22.1'][index] }}%</div>
                      <div class="text-[10px] text-slate-500">3Y Ann.</div>
                    </div>
                  </div>
                </template>
              </div>
              
              <!-- Bottom Bar mockup -->
              <div class="h-14 bg-white border-t border-slate-100 mt-auto -mx-5 -mb-5 flex items-center justify-around text-slate-400">
                <div class="w-6 h-6 rounded bg-slate-200"></div>
                <div class="w-6 h-6 rounded bg-fintech-green-500"></div>
                <div class="w-6 h-6 rounded bg-slate-200"></div>
                <div class="w-6 h-6 rounded bg-slate-200"></div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </section>
</template>
