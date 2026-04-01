<script setup lang="ts">
import { UserCheck, Search, IndianRupee } from 'lucide-vue-next'
import Section from '~/components/layout/Section.vue'

const steps = [
  {
    num: "01",
    icon: UserCheck,
    title: "Complete KYC in minutes",
    description: "Paperless onboarding via Aadhaar. Fast, secure, and hassle-free."
  },
  {
    num: "02",
    icon: Search,
    title: "Choose mutual funds",
    description: "Discover top-rated equity, debt, and hybrid funds using our smart tools."
  },
  {
    num: "03",
    icon: IndianRupee,
    title: "Invest via UPI / Netbanking",
    description: "Start a SIP or invest a lump sum using simple payment methods."
  }
]
</script>

<template>
  <Section bg="gray" id="how-it-works">
    <div class="text-center max-w-3xl mx-auto mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Simple, transparent investing</h2>
      <p class="text-slate-600 text-lg">Your wealth creation journey starts in three easy steps.</p>
    </div>

    <div class="relative">
      <!-- Connecting Line -->
      <div class="hidden md:block absolute top-[45px] left-[15%] right-[15%] h-0.5 bg-slate-200 border-t-2 border-dashed border-slate-300"></div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div v-for="(step, idx) in steps" :key="idx" class="relative z-10 flex flex-col items-center text-center">
          <div class="w-24 h-24 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-6 relative">
            <div class="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-fintech-green-100 text-fintech-green-700 font-bold text-sm flex items-center justify-center shadow-sm">
              {{ step.num }}
            </div>
            <div class="text-fintech-blue-600">
              <component :is="step.icon" :size="32" />
            </div>
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-2">{{ step.title }}</h3>
          <p class="text-slate-600">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </Section>
</template>
