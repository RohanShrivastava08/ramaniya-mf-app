<script setup lang="ts">
import { Lightbulb, CalendarClock, PieChart, Sparkles } from 'lucide-vue-next'
import Section from '~/components/layout/Section.vue'
import Card from '~/components/ui/Card.vue'

const features = [
  {
    icon: Lightbulb,
    iconClass: "text-fintech-blue-600",
    title: "Smart Fund Discovery",
    description: "Our algorithm ranks funds based on consistent performance, lower volatility, and expert ratings.",
    color: "bg-fintech-blue-50"
  },
  {
    icon: CalendarClock,
    iconClass: "text-fintech-green-600",
    title: "SIP & Lump Sum",
    description: "Automate your investments with weekly or monthly SIPs. Or invest lump sums when the market drops.",
    color: "bg-fintech-green-50"
  },
  {
    icon: PieChart,
    iconClass: "text-purple-600",
    title: "Real-time Tracking",
    description: "Monitor your portfolio's performance with beautiful graphs and actionable insights in real-time.",
    color: "bg-purple-50"
  },
  {
    icon: Sparkles,
    iconClass: "text-amber-600",
    title: "AI-powered Insights",
    description: "Get personalized rebalancing alerts and tax-saving opportunities tailored specifically for you.",
    color: "bg-amber-50"
  }
]
</script>

<template>
  <Section id="features" bg="white">
    <div class="text-center max-w-3xl mx-auto mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need to grow wealth</h2>
      <p class="text-slate-600 text-lg">Powerful features wrapped in a beautifully simple interface.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card v-for="(feature, idx) in features" :key="idx" class="border-slate-100 flex flex-col h-full">
        <div :class="`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feature.color}`">
          <component :is="feature.icon" :size="24" :class="feature.iconClass" />
        </div>
        <h3 class="text-xl font-bold text-slate-900 mb-3">{{ feature.title }}</h3>
        <p class="text-slate-600 leading-relaxed flex-1">{{ feature.description }}</p>
      </Card>
    </div>
  </Section>
</template>
