<script setup lang="ts">
import Hero from '~/components/sections/Hero.vue'
import Trust from '~/components/sections/Trust.vue'
import HowItWorks from '~/components/sections/HowItWorks.vue'
import Features from '~/components/sections/Features.vue'
import FundCategories from '~/components/sections/FundCategories.vue'
import AppPreview from '~/components/sections/AppPreview.vue'
import CTASection from '~/components/sections/CTASection.vue'

useHead({
  title: "Ramaniya | Invest Smarter, Grow Wealth"
})

const isAuthOpen = useAuthModal()
const user = useUser()

const handleStartClick = () => {
  isAuthOpen.value = true
}

const handleInvest = (fundName: string) => {
  if (!user.value) {
    alert("Please create an account or log in first to start investing.")
    isAuthOpen.value = true
    return
  }
  
  const amount = prompt(`How much would you like to invest in ${fundName}? (₹)`)
  if (amount && !isNaN(Number(amount))) {
    const investments = JSON.parse(localStorage.getItem('ramaniya_investments') || '[]')
    investments.push({ id: crypto.randomUUID(), fundName, amount: Number(amount), date: new Date().toISOString() })
    localStorage.setItem('ramaniya_investments', JSON.stringify(investments))
    alert(`🎉 Successfully invested ₹${amount} in ${fundName}! Portfolio updated securely.`)
  }
}
</script>

<template>
  <div class="flex-grow">
    <Hero @startClick="handleStartClick" />
    <Trust />
    <HowItWorks />
    <Features />
    <FundCategories @investClick="handleInvest" />
    <AppPreview />
    <CTASection @startClick="handleStartClick" />
  </div>
</template>
