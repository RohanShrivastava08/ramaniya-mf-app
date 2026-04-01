<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import Section from '~/components/layout/Section.vue'
import Button from '~/components/ui/Button.vue'

const emit = defineEmits(['startClick'])
</script>

<template>
  <Section bg="white" class="pb-32">
    <div class="relative rounded-3xl overflow-hidden bg-slate-900">
      <!-- Background Patterns -->
      <div class="absolute inset-0 z-0">
        <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-fintech-green-900/40 to-transparent"></div>
        <div class="absolute -top-24 -right-24 w-64 h-64 bg-fintech-green-500/30 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-24 -left-24 w-64 h-64 bg-fintech-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      <div class="relative z-10 px-6 py-16 md:py-20 lg:py-24 max-w-4xl mx-auto text-center">
        <h2 class="text-3xl md:text-5xl font-extrabold text-white mb-6">
          Start your investment journey today
        </h2>
        <p class="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
          Join thousands of smart investors who are building their wealth with Ramaniya. Setup your account in under 3 minutes.
        </p>
        
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" class="bg-fintech-green-500 hover:bg-fintech-green-400 text-slate-900 font-bold gap-2" @click="emit('startClick')">
            Create Free Account <ArrowRight :size="20" />
          </Button>
          <Button size="lg" variant="outline" class="border-slate-700 text-white hover:bg-slate-800 hover:border-slate-600 hover:text-white">
            Talk to an Expert
          </Button>
        </div>
        
        <p class="text-sm text-slate-400 mt-8">
          No hidden charges. SEBI Registered. Bank-grade security.
        </p>
      </div>
    </div>
  </Section>
</template>
