<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Navbar from '~/components/layout/Navbar.vue'
import Footer from '~/components/layout/Footer.vue'
import AuthModal from '~/components/ui/AuthModal.vue'

// Global state simulation for the UI replica
const user = useUser()
const isAuthOpen = useAuthModal()

onMounted(async () => {
  await useFetchUser()
})

const handleLogout = async () => {
  try {
    await $fetch('/api/auth/logout', { method: 'POST' })
    user.value = null
    alert("Logged out successfully.")
  } catch(e) {
    console.warn("Logout failed", e)
  }
}

const handleLogin = async () => {
  await useFetchUser()
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navbar injected with global auth state props -->
    <Navbar 
      :user="user" 
      @loginClick="isAuthOpen = true" 
      @logoutClick="handleLogout" 
    />

    <!-- Main Content Area where pages are injected -->
    <main class="flex-grow pt-16">
      <slot />
    </main>

    <Footer />
    
    <!-- Global Auth Modal -->
    <AuthModal 
      :isOpen="isAuthOpen" 
      @close="isAuthOpen = false" 
      @login="handleLogin" 
    />
  </div>
</template>
