<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { X } from 'lucide-vue-next'
import Button from '~/components/ui/Button.vue'

interface Props {
  isOpen: boolean
}
const props = defineProps<Props>()
const emit = defineEmits(['close', 'login'])

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const isLoginMode = ref(false)
const isLoading = ref(false)

const handleSubmit = async () => {
  if (!email.value || !password.value) {
    alert("Please fill in required fields.")
    return
  }
  
  try {
    isLoading.value = true
    let res;
    if (isLoginMode.value) {
      res = await $fetch('/api/auth/login', {
        method: 'POST',
        body: { email: email.value, password: password.value }
      })
    } else {
      if (!name.value) return alert("Please provide your Full Name to register.")
      res = await $fetch('/api/auth/register', {
        method: 'POST',
        body: { name: name.value, email: email.value, password: password.value }
      })
    }
    
    // Purge local artifacts for safety
    localStorage.removeItem('ramaniya_kyc')
    localStorage.removeItem('ramaniya_investments')
    
    emit('login')
    emit('close')
    
    router.push('/onboarding')
  } catch (e: any) {
    alert(e.data?.statusMessage || "Authentication failed. Make sure credentials are correct.")
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div 
      class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      @click="emit('close')"
    ></div>
    
    <!-- Modal -->
    <div class="animate-fade-in-up relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 overflow-hidden z-10">
      <button 
        @click="emit('close')"
        class="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors bg-slate-50 hover:bg-slate-100 p-2 rounded-full"
      >
        <X :size="20" />
      </button>
      
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-slate-900 mb-2">{{ isLoginMode ? 'Welcome Back' : 'Create Secure Account' }}</h2>
        <p class="text-slate-500 text-sm">Join the smartest mutual fund platform. End-to-end encrypted.</p>
      </div>
      
      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div v-if="!isLoginMode">
          <label class="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
          <input 
            type="text" 
            v-model="name"
            class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-fintech-green-500 focus:border-fintech-green-500 transition-all outline-none bg-slate-50 focus:bg-white"
            placeholder="E.g. Rohan Shrivastava"
          />
        </div>
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
          <input 
            type="email" 
            v-model="email"
            class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-fintech-green-500 focus:border-fintech-green-500 transition-all outline-none bg-slate-50 focus:bg-white"
            placeholder="rohan@example.com"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
          <input 
            type="password" 
            v-model="password"
            class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-fintech-green-500 focus:border-fintech-green-500 transition-all outline-none bg-slate-50 focus:bg-white"
            placeholder="Min 8 characters"
            required
          />
        </div>
        <Button type="submit" size="lg" class="w-full mt-4 font-bold tracking-wide" :disabled="isLoading">
          {{ isLoading ? 'Processing...' : (isLoginMode ? 'Secure Login' : 'Register & Continue') }}
        </Button>

        <div class="text-center mt-4">
          <button type="button" @click="isLoginMode = !isLoginMode" class="text-sm font-bold text-fintech-green-600 hover:text-fintech-green-700 transition-colors">
            {{ isLoginMode ? 'Need an account? Sign up' : 'Already have an account? Login' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
