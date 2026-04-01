<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, TrendingUp, Landmark, Activity, Loader2 } from 'lucide-vue-next'
import { fetchLiveFunds } from '~/lib/liveData'
import Button from '~/components/ui/Button.vue'
import Card from '~/components/ui/Card.vue'

const router = useRouter()
const isOnboarding = ref(false)
const catalog = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const investments = await $fetch<any[]>('/api/transactions')
    isOnboarding.value = investments.length === 0
  } catch(e) {
    isOnboarding.value = true
  }
  
  catalog.value = await fetchLiveFunds()
  loading.value = false
})

const categories = [
  { id: 'Equity', icon: TrendingUp, iconClass: "text-fintech-green-600", desc: "High growth potential over long term horizons." },
  { id: 'Debt', icon: Landmark, iconClass: "text-purple-600", desc: "Stable returns, safe fixed-income assets." },
  { id: 'Hybrid', icon: Activity, iconClass: "text-fintech-blue-600", desc: "Optimized balanced portfolio buffering equity volatility." }
]
</script>

<template>
  <div class="min-h-screen bg-slate-50 p-4 md:p-8 mb-20">
    <div class="max-w-[1400px] mx-auto">
      
      <div v-if="isOnboarding" class="flex justify-between items-center mb-8">
        <div class="text-fintech-green-600 font-bold bg-fintech-green-50 px-4 py-1.5 rounded-full text-xs tracking-widest uppercase shadow-sm border border-fintech-green-100">Step 3 of 4: Select Asset</div>
        <button @click="router.push('/dashboard')" class="flex items-center gap-2 text-slate-400 hover:text-slate-700 transition-colors font-bold text-sm tracking-wider uppercase">
           Skip directly to Dashboard
        </button>
      </div>
      <div v-else>
        <button @click="router.push('/dashboard')" class="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-8 transition-colors font-bold uppercase tracking-widest text-xs">
          <ArrowLeft :size="16" /> Back to Portfolio
        </button>
      </div>
      
      <div class="mb-12">
        <h1 class="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
          Explore Curated Funds
        </h1>
        <p class="text-slate-500 text-lg font-medium max-w-2xl leading-relaxed">Discover SEBI-verified top-performing indices. Select a fund to project calculations and start your SIP.</p>
      </div>
      
      <div class="space-y-12">
        <div v-if="loading" class="flex flex-col items-center justify-center p-20 text-fintech-green-600">
           <Loader2 :size="48" class="animate-spin mb-4" />
           <p class="font-bold text-slate-500 tracking-widest uppercase">Fetching Live Market NAV</p>
        </div>
        
        <template v-else>
          <template v-for="cat in categories" :key="cat.id">
            <div v-if="catalog.filter(f => f.category === cat.id).length > 0" class="animate-fade-in-up duration-700">
              <div class="mb-6 flex items-center gap-3 border-b border-slate-200 pb-3">
                <div class="p-2.5 rounded-xl shadow-sm bg-white border border-slate-200">
                  <component :is="cat.icon" :size="20" :class="cat.iconClass" />
                </div>
                <div>
                  <h2 class="text-2xl font-black text-slate-900 tracking-tight">{{ cat.id }} Catalog</h2>
                  <p class="text-slate-500 text-xs font-bold mt-0.5 uppercase tracking-wider">{{ cat.desc }}</p>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <Card 
                  v-for="fund in catalog.filter(f => f.category === cat.id)" 
                  :key="fund.id" 
                  class="p-5 bg-white border border-slate-200 hover:border-fintech-green-400 hover:shadow-lg transition-all cursor-pointer group flex flex-col rounded-2xl h-full" 
                  @click="router.push(`/invest/${fund.id}`)"
                >
                  <div class="flex justify-between items-start mb-4">
                    <span class="text-[9px] font-black px-2 py-1 bg-slate-50 border border-slate-200 text-slate-500 rounded uppercase tracking-widest shadow-sm">{{ fund.risk }}</span>
                    <span class="text-[9px] font-black px-2 py-1 bg-fintech-green-50 text-fintech-green-700 rounded border border-fintech-green-100 shadow-sm uppercase tracking-widest">Growth</span>
                  </div>
                  
                  <h3 class="text-lg font-black text-slate-900 mb-6 group-hover:text-fintech-green-600 transition-colors line-clamp-2 leading-snug">{{ fund.name }}</h3>
                  
                  <div class="grid grid-cols-2 gap-4 mb-6 mt-auto bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div>
                      <p class="text-[9px] font-bold text-slate-400 mb-1 uppercase tracking-widest">3Y CAGR</p>
                      <p class="text-xl font-black text-fintech-green-600 tracking-tighter">+{{ fund.cagr3Y }}%</p>
                    </div>
                    <div class="border-l border-slate-200 pl-4">
                      <p class="text-[9px] font-bold text-slate-400 mb-1 uppercase tracking-widest">NAV</p>
                      <p class="text-xl font-bold text-slate-900 tracking-tighter">₹{{ fund.nav }}</p>
                    </div>
                  </div>

                  <Button class="w-full h-10 text-sm shadow-sm font-bold tracking-wide rounded-xl bg-slate-900 text-white group-hover:bg-fintech-green-600 transition-colors border-none mt-auto">
                    Invest 
                  </Button>
                </Card>
              </div>
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>
