<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '~/utils/cn'

interface Props {
  id?: string
  bg?: 'transparent' | 'white' | 'gray' | 'dark' | 'blue'
  class?: any
}

const props = withDefaults(defineProps<Props>(), {
  bg: 'transparent'
})

const bgClasses: Record<string, string> = {
  transparent: "",
  white: "bg-white",
  gray: "bg-slate-50",
  dark: "bg-slate-900 text-white",
  blue: "bg-fintech-blue-50"
}

const computedClass = computed(() => {
  return cn("py-20 md:py-28", bgClasses[props.bg], props.class)
})
</script>

<template>
  <section :id="id" :class="computedClass">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <slot />
    </div>
  </section>
</template>
