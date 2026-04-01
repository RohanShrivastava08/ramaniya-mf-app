<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Newspaper, Clock, Filter, AlertCircle, ExternalLink, Activity } from 'lucide-vue-next'
import Card from '~/components/ui/Card.vue'

const router = useRouter()
const filter = ref('24h')
const news = ref<any[]>([])
const loading = ref(true)
const isUsingFallback = ref(false)

const FALLBACK_NEWS = [
  {
    uuid: '1',
    title: 'Sebi introduces stricter disclosure norms for actively managed equity mutual funds',
    description: 'The market regulator mandated AMCs to clearly define their active stock picking strategies to assure retail investors against benchmark hugging.',
    url: '#',
    published_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: 'Financial Express',
    entities: [{ name: 'SEBI', type: 'Regulator' }, { name: 'Equity Funds', type: 'Asset Class' }]
  },
  {
    uuid: '2',
    title: 'HDFC Bank reports blockbuster Q3 metrics, triggers massive buying spree in banking sector',
    description: 'HDFC Bank exceeded street estimates charting a 25% year-on-year net profit jump, forcing heavy inflow from hybrid and pure equity Mutual Funds.',
    url: '#',
    published_at: new Date(Date.now() - 15 * 60 * 60 * 1000).toISOString(),
    source: 'Moneycontrol',
    entities: [{ name: 'HDFC Bank', type: 'Equity' }, { name: 'Banking', type: 'Sector' }]
  },
  {
    uuid: '3',
    title: 'Foreign Institutional Investors scale up exposure to Mid-Cap IT stocks amidst global volatility',
    description: 'The heavy rotation from large-cap bluechips into specialized IT mid-caps highlights a massive shift in portfolio aggregation styles this quarter.',
    url: '#',
    published_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    source: 'Bloomberg Quint',
    entities: [{ name: 'Mid-Cap IT', type: 'Sector' }, { name: 'FII', type: 'Institution' }]
  },
  {
    uuid: '4',
    title: 'RBI Monetary Policy: Governor maintains repo rate at 6.5%, Debt funds see minor yield adjustments',
    description: 'Reserve Bank of India held its key lending rate steady for the fifth consecutive meeting, signaling an extended plateau for shorter duration debt securities.',
    url: '#',
    published_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    source: 'Livemint',
    entities: [{ name: 'RBI', type: 'Regulator' }, { name: 'Debt Funds', type: 'Asset Class' }]
  }
]

const fetchMarketauxNews = async () => {
  loading.value = true
  isUsingFallback.value = false
  try {
    const config = useRuntimeConfig()
    const apiToken = config.public.marketauxApiToken || import.meta.env.VITE_MARKETAUX_API_TOKEN || ''
    
    let dateRange = ''
    const now = new Date()
    
    if (filter.value === '24h') {
      const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)
      dateRange = `&published_after=${yesterday.toISOString()}`
    } else if (filter.value === '1w') {
      const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      dateRange = `&published_after=${lastWeek.toISOString()}`
    } else if (filter.value === '1m') {
      const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      dateRange = `&published_after=${lastMonth.toISOString()}`
    }

    if (!apiToken) {
       throw new Error("No Marketaux token")
    }

    const url = `https://api.marketaux.com/v1/news/all?countries=in&filter_entities=true&limit=10&language=en${dateRange}&api_token=${apiToken}`
    const response = await fetch(url)
    
    if (!response.ok) {
       throw new Error("HTTP request failed")
    }
    
    const data = await response.json()
    
    if (data && data.data && data.data.length > 0) {
       news.value = data.data
    } else {
       throw new Error("Empty dataset")
    }

  } catch (e) {
    console.warn("Marketaux API Failed/Not configured. Falling back to mocked live-data feeds.", e)
    isUsingFallback.value = true
    
    let filteredFallback = FALLBACK_NEWS
    const nowMs = Date.now()
    
    if (filter.value === '24h') {
       filteredFallback = FALLBACK_NEWS.filter(n => (nowMs - new Date(n.published_at).getTime()) <= 24*60*60*1000)
    } else if (filter.value === '1w') {
       filteredFallback = FALLBACK_NEWS.filter(n => (nowMs - new Date(n.published_at).getTime()) <= 7*24*60*60*1000)
    }
    
    news.value = filteredFallback
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchMarketauxNews()
})

watch(filter, () => {
  fetchMarketauxNews()
})

const getTimeAgo = (isoString: string) => {
  const diff = Date.now() - new Date(isoString).getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  if (hours < 24) return `${hours} hours ago`
  const days = Math.floor(hours / 24)
  return `${days} days ago`
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 p-6 md:p-12 mb-20">
    <div class="max-w-[1000px] mx-auto">
      <button @click="router.back()" class="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-8 transition-colors font-bold uppercase tracking-wider text-sm">
        <ArrowLeft :size="16" /> Back to Platform
      </button>

      <div class="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-6 border-b border-slate-200 pb-8">
        <div>
          <h1 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight flex items-center gap-3">
             <Newspaper class="text-fintech-green-600" :size="40" /> Market Signals
          </h1>
          <p class="text-slate-500 text-lg font-medium">Real-time aggregate feed for Indian Mutual Funds and key Equity assets.</p>
        </div>
        
        <div class="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
           <span class="text-[10px] font-bold text-slate-400 tracking-widest pl-2 pr-3 uppercase flex items-center gap-1.5"><Filter :size="12"/> Time Filter</span>
           <button @click="filter = '24h'" :class="`px-4 py-2 text-xs font-bold rounded-xl transition-all ${filter === '24h' ? 'bg-fintech-green-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`">
              Past 24 Hours
           </button>
           <button @click="filter = '1w'" :class="`px-4 py-2 text-xs font-bold rounded-xl transition-all ${filter === '1w' ? 'bg-fintech-green-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`">
              Past 7 Days
           </button>
           <button @click="filter = '1m'" :class="`px-4 py-2 text-xs font-bold rounded-xl transition-all ${filter === '1m' ? 'bg-fintech-green-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`">
              All Month
           </button>
        </div>
      </div>

      <div v-if="isUsingFallback" class="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-2xl flex items-start gap-4 text-yellow-800">
         <AlertCircle :size="20" class="shrink-0 mt-0.5 text-yellow-600" />
         <div>
            <p class="text-sm font-bold">API Token Missing</p>
            <p class="text-xs font-medium mt-1 opacity-80">Currently displaying aggregated fallback market data. Supply VITE_MARKETAUX_API_TOKEN in .env to connect live production feeds natively.</p>
         </div>
      </div>

      <div v-if="loading" class="flex flex-col items-center justify-center p-32 text-fintech-green-600 animate-pulse">
          <Activity :size="48" class="mb-4" />
          <span class="font-bold tracking-widest uppercase text-slate-500">Querying Marketaux Engine...</span>
      </div>
      
      <div v-else-if="news.length === 0" class="text-center p-20 bg-white border border-slate-200 rounded-3xl">
          <p class="text-xl font-bold text-slate-500">No market alerts found for this duration.</p>
      </div>

      <div v-else class="space-y-6">
        <template v-for="(item, index) in news" :key="item.uuid || index">
          <Card class="p-6 md:p-8 bg-white border border-slate-200 hover:border-fintech-green-300 hover:shadow-xl transition-all flex flex-col group rounded-3xl">
             <div class="flex justify-between items-start mb-5">
                <span class="px-3 py-1 bg-fintech-blue-50 text-fintech-blue-700 text-[10px] font-black rounded uppercase tracking-widest border border-fintech-blue-100 shadow-sm">
                   {{ item.source }}
                </span>
                <span class="text-[11px] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wide">
                   <Clock :size="12"/> {{ getTimeAgo(item.published_at) }}
                </span>
             </div>

             <h2 class="text-2xl font-black text-slate-900 group-hover:text-fintech-green-600 transition-colors mb-3 leading-snug">
                {{ item.title }}
             </h2>
             
             <p class="text-slate-600 text-sm font-medium leading-relaxed mb-6 line-clamp-3">
                {{ item.description }}
             </p>

             <div class="flex flex-wrap items-center justify-between gap-4 mt-auto pt-6 border-t border-slate-100">
                <div class="flex items-center gap-2">
                  <template v-if="item.entities">
                     <span v-for="(entity, i) in item.entities.slice(0,3)" :key="i" class="text-[9px] font-bold px-2 py-1 bg-slate-100 text-slate-600 rounded uppercase tracking-widest">
                        {{ entity.name }}
                     </span>
                  </template>
                </div>
                
                <a 
                   :href="item.url" 
                   target="_blank" 
                   rel="noreferrer"
                   class="flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-fintech-green-600 uppercase tracking-widest transition-colors"
                >
                   Read Source <ExternalLink :size="14"/>
                </a>
             </div>
          </Card>
        </template>
      </div>
    </div>
  </div>
</template>
