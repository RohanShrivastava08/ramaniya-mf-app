<script setup lang="ts">
import { TrendingUp, Shield, ActivitySquare, ArrowRight } from 'lucide-vue-next'
import Section from '~/components/layout/Section.vue'
import Card from '~/components/ui/Card.vue'

const emit = defineEmits(['investClick'])

const categories = [
  {
    title: "Equity Funds",
    icon: TrendingUp,
    iconClass: "text-fintech-blue-600",
    risk: "High Risk",
    expectedReturn: "12-18%",
    description: "Invest in shares of proven companies. Best for long-term wealth creation and beating inflation.",
    color: "bg-fintech-blue-50"
  },
  {
    title: "Debt Funds",
    icon: Shield,
    iconClass: "text-fintech-green-600",
    risk: "Low Risk",
    expectedReturn: "6-8%",
    description: "Invest in government bonds and stable securities. Best for steady income and short-term goals.",
    color: "bg-fintech-green-50"
  },
  {
    title: "Hybrid Funds",
    icon: ActivitySquare,
    iconClass: "text-purple-600",
    risk: "Moderate Risk",
    expectedReturn: "8-12%",
    description: "A balanced mix of equity and debt. Best for first-time investors seeking stable growth.",
    color: "bg-purple-50"
  }
]
</script>

<template>
  <Section id="funds" bg="gray">
    <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
      <div class="max-w-2xl">
        <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Funds for every goal</h2>
        <p class="text-slate-600 text-lg">Whether you're saving for a home, retirement, or just beating inflation, we have the right funds for you.</p>
      </div>
      <button class="text-fintech-green-600 font-medium flex items-center gap-2 hover:text-fintech-green-700 transition-colors whitespace-nowrap">
        View all categories <ArrowRight :size="16" />
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <Card v-for="(cat, idx) in categories" :key="idx" :hoverEffect="true" class="group cursor-pointer border-slate-200 hover:border-fintech-green-200 transition-colors" @click="emit('investClick', cat.title)">
        <div :class="`w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${cat.color}`">
          <component :is="cat.icon" :size="24" :class="cat.iconClass" />
        </div>
        
        <h3 class="text-2xl font-bold text-slate-900 mb-2">{{ cat.title }}</h3>
        <p class="text-slate-600 mb-6">{{ cat.description }}</p>
        
        <div class="grid grid-cols-2 gap-4 py-4 border-t border-slate-100">
          <div>
            <div class="text-xs text-slate-500 mb-1">Expected Return</div>
            <div class="font-bold text-fintech-green-600">{{ cat.expectedReturn }}</div>
          </div>
          <div>
            <div class="text-xs text-slate-500 mb-1">Risk Profile</div>
            <div class="font-semibold text-slate-700">{{ cat.risk }}</div>
          </div>
        </div>
      </Card>
    </div>
  </Section>
</template>
