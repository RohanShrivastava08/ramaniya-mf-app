<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '~/utils/cn'

interface Props {
  hoverEffect?: boolean
  class?: any
}

const props = withDefaults(defineProps<Props>(), {
  hoverEffect: true
})

const computedClass = computed(() => {
  return cn(
    "rounded-2xl border border-slate-200 bg-white shadow-sm p-6 overflow-hidden transition-all duration-200",
    props.hoverEffect ? "hover:-translate-y-1 hover:shadow-md" : "",
    props.class
  )
})
</script>

<template>
  <div :class="computedClass" v-bind="$attrs">
    <slot />
  </div>
</template>
