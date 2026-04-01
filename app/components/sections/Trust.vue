<script setup lang="ts">
import { ShieldCheck, Lock, Activity, Award } from 'lucide-vue-next'
import Section from '~/components/layout/Section.vue'

const badges = [
  { icon: Lock, title: "Secure & Encrypted", subtitle: "256-bit bank grade security" },
  { icon: Award, title: "Trusted Platform", subtitle: "Over 50+ AMC partners" },
  { icon: ShieldCheck, title: "SEBI Compliant", subtitle: "Fully regulated & secure" },
  { icon: Activity, title: "Seamless KYC", subtitle: "100% paperless onboarding" },
]
</script>

<template>
  <Section bg="white" class="border-y border-slate-100 py-12">
    <div class="text-center mb-8">
      <p class="text-sm font-semibold text-slate-400 uppercase tracking-wider">
        Trusted by millions of investors across India
      </p>
    </div>
    
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
      <div v-for="(badge, idx) in badges" :key="idx" class="flex flex-col items-center text-center p-4">
        <div class="w-12 h-12 rounded-2xl bg-slate-50 text-slate-700 flex items-center justify-center mb-4">
          <component :is="badge.icon" :size="24" />
        </div>
        <h3 class="font-semibold text-slate-900 mb-1">{{ badge.title }}</h3>
        <p class="text-xs text-slate-500">{{ badge.subtitle }}</p>
      </div>
    </div>
  </Section>
</template>
