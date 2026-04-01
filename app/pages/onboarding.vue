<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ShieldCheck, Camera, Loader2, CheckCircle2, TrendingUp, Lock, Zap, Focus, Fingerprint } from 'lucide-vue-next'
import Button from '~/components/ui/Button.vue'

definePageMeta({
  layout: false
})

const router = useRouter()
const user = useUser()

const step = ref(1)
const pan = ref('')
const panStatus = ref('idle')
const videoRef = ref<HTMLVideoElement | null>(null)
const stream = ref<MediaStream | null>(null)
const kycStatus = ref('idle')

// Protected Route Guard replica
onMounted(() => {
  if (!user.value) {
    router.replace('/')
  }
})

watch(step, (newVal) => {
  if (newVal === 2) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((s) => {
        stream.value = s
        if (videoRef.value) videoRef.value.srcObject = s
      })
      .catch(err => console.error("Camera denied", err))
  }
})

onUnmounted(() => {
  if (stream.value) stream.value.getTracks().forEach(t => t.stop())
})

const verifyPan = () => {
  if (pan.value.length !== 10) return alert("Please enter a valid 10-character PAN number to verify.")
  panStatus.value = 'verifying'
  setTimeout(() => {
    panStatus.value = 'success'
    setTimeout(() => {
      step.value = 2
    }, 1000)
  }, 1500)
}

const captureKyc = () => {
  kycStatus.value = 'capturing'
  setTimeout(() => {
    kycStatus.value = 'success'
    localStorage.setItem('ramaniya_kyc', 'true')
    setTimeout(() => {
      if (stream.value) stream.value.getTracks().forEach(t => t.stop())
      router.push('/funds')
    }, 2000)
  }, 2000)
}
</script>

<template>
  <div class="min-h-screen flex flex-col lg:flex-row bg-slate-50" v-if="user">
    <!-- Dynamic Left Sidebar -->
    <div class="w-full lg:w-5/12 bg-slate-900 text-white p-8 lg:p-16 flex flex-col relative overflow-hidden shrink-0 shadow-2xl z-10">
      <!-- Animated Background Gradients -->
      <div class="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-fintech-green-900/40 via-transparent to-transparent z-0"></div>
      <div class="absolute -bottom-32 -left-32 w-96 h-96 bg-fintech-blue-600/30 rounded-full blur-[100px] z-0"></div>
      <div class="absolute top-1/4 -right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[80px] z-0"></div>

      <div class="relative z-10 flex items-center gap-3 mb-16 lg:mb-24 cursor-pointer" @click="router.push('/')">
        <div class="bg-gradient-to-tr from-fintech-green-500 to-fintech-green-400 p-2.5 rounded-2xl text-slate-900 shadow-xl shadow-fintech-green-900/20">
          <TrendingUp :size="24" :strokeWidth="3" />
        </div>
        <span class="text-3xl font-black tracking-tighter text-white">Ramaniya</span>
      </div>

      <div class="relative z-10 flex-1 flex flex-col justify-center max-w-md">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest uppercase mb-6 text-slate-300 w-fit backdrop-blur-md">
          <Fingerprint :size="14" class="text-fintech-green-400" /> Secure Onboarding
        </div>
        
        <h2 class="text-4xl lg:text-5xl font-black mb-6 leading-[1.15] tracking-tight">
          Verify identity.<br/>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-fintech-green-400 to-emerald-200">
            Build wealth.
          </span>
        </h2>
        <p class="text-slate-400 text-lg mb-12 leading-relaxed font-medium">
          Complete a swift 2-step verification framework to securely unlock curated premium mutual funds, analytics, and auto-pilot investing.
        </p>

        <div class="space-y-8">
          <div class="flex items-start gap-5 group">
            <div class="p-3.5 bg-white/5 rounded-2xl text-fintech-green-400 border border-white/10 group-hover:bg-fintech-green-500/10 transition-colors shadow-lg shadow-black/20"><Lock :size="24" /></div>
            <div>
              <h4 class="font-bold text-lg text-white mb-1">Bank-Grade Encryption</h4>
              <p class="text-slate-400 text-sm font-medium leading-relaxed">256-bit secure demographic tunneling ensuring your data never leaks.</p>
            </div>
          </div>
          <div class="flex items-start gap-5 group">
            <div class="p-3.5 bg-white/5 rounded-2xl text-fintech-blue-400 border border-white/10 group-hover:bg-fintech-blue-500/10 transition-colors shadow-lg shadow-black/20"><Zap :size="24" /></div>
            <div>
              <h4 class="font-bold text-lg text-white mb-1">Lightning Fast Verification</h4>
              <p class="text-slate-400 text-sm font-medium leading-relaxed">Automated central live CKYC database fetching approves you instantly.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="relative z-10 mt-16 pt-8 border-t border-white/10">
        <p class="text-xs text-slate-500 font-medium">© 2026 Ramaniya Financial Services. SEBI Reg: INZ000000000</p>
      </div>
    </div>

    <!-- Right Side (Active Form) -->
    <div class="w-full lg:w-7/12 p-6 md:p-12 lg:p-20 flex flex-col justify-center items-center bg-slate-50 relative z-0">
      <div class="absolute top-8 right-8 hidden md:inline-flex items-center gap-2 bg-white text-slate-500 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase border border-slate-200 shadow-sm">
        <div class="w-2 h-2 rounded-full bg-fintech-green-500 animate-pulse border border-fintech-green-200"></div>
        Step {{ step }} of 4
      </div>
      
      <div class="w-full max-w-md">
        <!-- Progress Indicator -->
        <div class="flex gap-3 mb-12">
          <div :class="`h-1.5 flex-1 rounded-full transition-colors duration-500 ${step >= 1 ? 'bg-fintech-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]' : 'bg-slate-200'}`"></div>
          <div :class="`h-1.5 flex-1 rounded-full transition-colors duration-500 ${step >= 2 ? 'bg-fintech-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]' : 'bg-slate-200'}`"></div>
        </div>

        <div v-if="step === 1" class="animate-fade-in-up duration-700 fill-mode-both">
          <div class="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center mb-8 shadow-sm text-fintech-blue-600">
            <ShieldCheck :size="32" />
          </div>
          <h1 class="text-4xl font-black text-slate-900 mb-4 tracking-tight">Verify your PAN</h1>
          <p class="text-slate-500 mb-10 font-medium leading-relaxed text-lg">As per strict SEBI security guidelines, a valid Permanent Account Number is required to initiate portfolios.</p>
          
          <div class="mb-8">
            <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 pl-1">10-Digit Demat PAN Number</label>
            <input 
              type="text"
              maxlength="10"
              placeholder="e.g. ABCDE1234F"
              v-model="pan"
              @input="pan = pan.toUpperCase()"
              class="w-full text-3xl font-black uppercase px-6 py-5 rounded-2xl border-2 border-slate-200 focus:border-fintech-green-500 focus:ring-4 focus:ring-fintech-green-500/20 outline-none transition-all shadow-sm bg-white tracking-[0.2em] placeholder-slate-200"
              :disabled="panStatus !== 'idle'"
            />
          </div>

          <Button 
            @click="verifyPan" 
            size="lg" 
            class="w-full h-16 text-lg font-bold shadow-lg rounded-2xl transition-all hover:-translate-y-1"
            :disabled="pan.length !== 10 || panStatus !== 'idle'"
          >
            <span v-if="panStatus === 'verifying'" class="flex items-center justify-center gap-3"><Loader2 class="animate-spin" :size="24"/> Linking SEBI Network...</span>
            <span v-else-if="panStatus === 'success'" class="flex items-center justify-center gap-3"><CheckCircle2 :size="24"/> Verified Successfully</span>
            <span v-else>Confirm PAN & Continue</span>
          </Button>
        </div>
        
        <div v-else class="animate-fade-in-up duration-700 text-center fill-mode-both w-full">
          <div v-if="kycStatus === 'success'" class="py-16">
            <div class="w-28 h-28 bg-fintech-green-50 text-fintech-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border-4 border-white ring-1 ring-fintech-green-100">
              <CheckCircle2 :size="56" />
            </div>
            <h2 class="text-3xl font-black text-slate-900 mb-4 tracking-tight">Biometrics Verified!</h2>
            <p class="text-slate-500 font-medium text-lg max-w-sm mx-auto">Your identity is geometrically confirmed. Moving you securely to our active multi-asset tracking catalog.</p>
          </div>
          <div v-else>
            <div class="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm text-fintech-green-600">
              <Focus :size="32" />
            </div>
            <h1 class="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">Live Video CKYC</h1>
            <p class="text-slate-500 mb-10 font-medium px-4 leading-relaxed text-lg max-w-sm mx-auto">
              Position your face perfectly within the frame. (Demo recording solely isolated natively to your device logic).
            </p>
            
            <div class="relative w-64 h-64 mx-auto mb-12 rounded-full overflow-hidden border-[10px] border-white shadow-2xl bg-slate-100 flex items-center justify-center ring-4 ring-fintech-green-100 group">
              <video 
                ref="videoRef" 
                autoplay 
                playsinline 
                muted 
                class="absolute inset-0 w-full h-full object-cover transform scale-[1.35] group-hover:scale-125 transition-transform duration-700"
              />
              <Camera v-if="!stream" :size="40" class="text-slate-300 animate-pulse" />
              
              <!-- Scanning Overlay Effect -->
              <div v-if="stream && kycStatus === 'idle'" class="absolute inset-0 border-2 border-fintech-green-400 rounded-full scale-90 opacity-50 animate-[ping_3s_ease-in-out_infinite]"></div>

              <div v-if="kycStatus === 'capturing'" class="absolute inset-0 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center text-fintech-green-700">
                <Loader2 :size="40" class="animate-spin mb-3" />
                <span class="font-bold text-sm tracking-widest uppercase">Scanning...</span>
              </div>
            </div>

            <Button 
              @click="captureKyc" 
              size="lg" 
              class="w-full h-16 text-lg font-bold shadow-lg rounded-2xl bg-slate-900 hover:bg-slate-800 text-white transition-all hover:-translate-y-1"
              :disabled="!stream || kycStatus !== 'idle'"
            >
              <span v-if="kycStatus === 'capturing'" class="flex items-center justify-center gap-3"><Loader2 class="animate-spin" :size="24"/> Authenticating Geometric Data...</span>
              <span v-else>Capture Feed & Proceed</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
