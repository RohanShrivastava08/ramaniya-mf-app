<script setup lang="ts">
import { ref } from 'vue'
import { X, ShieldCheck, CreditCard, Landmark, Smartphone, Loader2, CheckCircle2, ChevronLeft } from 'lucide-vue-next'
import Button from '~/components/ui/Button.vue'

const props = defineProps<{
  isOpen: boolean
  amount: string | number
  fundName: string
}>()

const emit = defineEmits(['close', 'success'])

const status = ref('idle')
const method = ref<string | null>(null)
  
const upiId = ref('')
const cardNumber = ref('')
const expiry = ref('')
const cvv = ref('')

const handlePay = () => {
  if (method.value === 'upi' && upiId.value.length < 5) return alert("Security Error: Invalid UPI ID structure.")
  if (method.value === 'card') {
    if (cardNumber.value.replace(/\s/g, '').length !== 16) return alert("Security Error: Card Number must be exactly 16 digits.")
    if (cvv.value.length !== 3) return alert("Security Error: CVV must be exactly 3 digits.")
    if (expiry.value.length !== 5) return alert("Security Error: Expiry must match MM/YY format.")
  }

  status.value = 'processing'
  setTimeout(() => {
    status.value = 'success'
    setTimeout(() => {
      emit('success')
      setTimeout(() => {
        status.value = 'idle'
        method.value = null
        upiId.value = ''
        cardNumber.value = ''
      }, 500)
    }, 1500) 
  }, 2500) 
}

const handleMethodSelect = (m: string) => {
  method.value = m
  status.value = 'method_selected'
}

const goBack = () => {
  method.value = null
  status.value = 'idle'
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-0">
        <!-- Backdrop -->
        <div 
          class="absolute inset-0 bg-slate-900/60 backdrop-blur-md" 
          @click="(status === 'idle' || status === 'method_selected') ? emit('close') : undefined"
        ></div>
        
        <!-- Modal -->
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-8"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-8"
        >
          <div v-if="isOpen" class="relative bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] w-full max-w-[420px] overflow-hidden flex flex-col border border-slate-100">
            
            <div v-if="status === 'success'" class="p-16 flex flex-col items-center justify-center text-center animate-fade-in-up duration-500 bg-white">
              <div class="w-24 h-24 bg-fintech-green-50 text-fintech-green-500 rounded-full flex items-center justify-center mb-8 shadow-inner ring-8 ring-fintech-green-50/50">
                <CheckCircle2 :size="48" :strokeWidth="3" />
              </div>
              <h2 class="text-3xl font-black text-slate-900 mb-3 tracking-tight">Payment Successful</h2>
              <p class="text-slate-500 font-medium text-lg">Authorizing secure mandate securely...</p>
            </div>
            
            <template v-else>
              <!-- Header -->
              <div class="bg-[#0c1c38] p-6 text-white relative shadow-md z-10">
                <button 
                  @click="emit('close')"
                  class="absolute top-5 right-5 text-white/40 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-1.5 rounded-full"
                  :disabled="status === 'processing'"
                >
                  <X :size="20" />
                </button>
                
                <div class="flex items-center gap-3 mb-6">
                  <button v-if="status === 'method_selected'" @click="goBack" class="mr-1 hover:bg-white/10 p-1.5 rounded-full transition-colors"><ChevronLeft :size="20"/></button>
                  <div class="w-10 h-10 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-xl flex items-center justify-center text-white font-black tracking-tighter shadow-md border border-blue-400/50 text-xl">R</div>
                  <div class="font-bold text-xl tracking-wide">Razorpay <span class="text-white/30 font-medium ml-1">| Demo</span></div>
                </div>
                
                <div class="text-blue-200 text-[10px] font-black uppercase tracking-widest mb-2 bg-blue-900/50 inline-block px-3 py-1 rounded-full border border-blue-400/20">{{ fundName }}</div>
                <div class="text-4xl font-black flex items-center gap-1.5 tracking-tight mt-1">
                  <span class="text-white/40 text-3xl font-normal">₹</span> {{ Number(amount).toLocaleString() }}
                </div>
              </div>

              <!-- Methods Body -->
              <div class="bg-slate-50 p-6 flex-1 relative min-h-[340px]">
                <div v-if="status === 'processing'" class="absolute inset-0 bg-slate-50/90 backdrop-blur-md flex flex-col items-center justify-center z-10 animate-fade-in-up">
                  <Loader2 :size="56" class="text-blue-600 animate-spin mb-6" />
                  <p class="text-slate-900 font-black text-2xl tracking-tight mb-2">Processing Securely</p>
                  <p class="text-slate-500 text-sm font-bold bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm mt-2">Do not close this window</p>
                </div>

                <div v-if="status === 'idle'" class="animate-fade-in-up duration-300">
                  <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Supported Payment Networks</p>
                  
                  <div class="space-y-3">
                    <button @click="handleMethodSelect('upi')" class="w-full bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all group">
                      <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm"><Smartphone :size="24"/></div>
                      <div class="text-left">
                        <p class="font-black text-slate-900 text-base">UPI / QR Scan</p>
                        <p class="text-xs text-slate-500 font-semibold mt-0.5">Google Pay, PhonePe, Paytm</p>
                      </div>
                    </button>
                    
                    <button @click="handleMethodSelect('card')" class="w-full bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all group">
                      <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm"><CreditCard :size="24"/></div>
                      <div class="text-left">
                        <p class="font-black text-slate-900 text-base">Credit / Debit Card</p>
                        <p class="text-xs text-slate-500 font-semibold mt-0.5">Visa, MasterCard, RuPay</p>
                      </div>
                    </button>

                    <button @click="handleMethodSelect('netbanking')" class="w-full bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all group">
                      <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm"><Landmark :size="24"/></div>
                      <div class="text-left">
                        <p class="font-black text-slate-900 text-base">Netbanking</p>
                        <p class="text-xs text-slate-500 font-semibold mt-0.5">All Indian banks supported</p>
                      </div>
                    </button>
                  </div>
                </div>

                <div v-if="status === 'method_selected' && method === 'upi'" class="animate-fade-in-up duration-300">
                   <p class="text-base font-black text-slate-900 mb-6 flex items-center gap-2"><Smartphone :size="20" class="text-blue-600"/> Pay with UPI Gateway</p>
                   <div class="mb-8">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block pl-1">Target VPA / UPI ID</label>
                      <input 
                        type="text" 
                        placeholder="e.g. yourname@okhdfcbank" 
                        v-model="upiId"
                        class="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none font-bold text-lg shadow-sm placeholder-slate-300 transition-all" 
                      />
                   </div>
                   <Button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-16 shadow-lg shadow-blue-600/20 rounded-2xl text-lg hover:-translate-y-1 transition-all" @click="handlePay">Pay securely ₹{{ Number(amount).toLocaleString() }}</Button>
                </div>

                <div v-if="status === 'method_selected' && method === 'card'" class="animate-fade-in-up duration-300">
                   <p class="text-base font-black text-slate-900 mb-6 flex items-center gap-2"><CreditCard :size="20" class="text-blue-600"/> Add New Card Payload</p>
                   <div class="space-y-5 mb-8">
                      <div>
                        <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block pl-1">Card Number</label>
                        <input 
                          type="text" 
                          placeholder="4111 2222 3333 4444" 
                          v-model="cardNumber"
                          maxlength="16"
                          class="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none font-black text-lg font-mono tracking-widest shadow-sm placeholder-slate-200 transition-all" 
                        />
                      </div>
                      <div class="flex gap-4">
                        <div class="flex-1">
                          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block pl-1">Expiry</label>
                          <input 
                            type="text" 
                            placeholder="MM/YY" 
                            v-model="expiry"
                            maxlength="5"
                            class="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none font-bold text-lg shadow-sm placeholder-slate-200 transition-all text-center" 
                          />
                        </div>
                        <div class="flex-[0.8]">
                          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block pl-1">CVV</label>
                          <input 
                            type="password" 
                            placeholder="***" 
                            maxlength="4"
                            v-model="cvv"
                            class="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none font-bold text-lg font-mono tracking-[0.3em] shadow-sm placeholder-slate-200 text-center transition-all" 
                          />
                        </div>
                      </div>
                   </div>
                   <Button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-16 shadow-lg shadow-blue-600/20 rounded-2xl text-lg hover:-translate-y-1 transition-all" @click="handlePay">Pay securely ₹{{ Number(amount).toLocaleString() }}</Button>
                </div>

                <div v-if="status === 'method_selected' && method === 'netbanking'" class="animate-fade-in-up duration-300 text-center py-6">
                   <Landmark :size="56" class="text-slate-300 mx-auto mb-6" />
                   <p class="text-base font-bold text-slate-700 mb-8 max-w-xs mx-auto">Redirecting to banking portal is securely mocked for this structural frontend demo.</p>
                   <Button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-16 shadow-lg shadow-blue-600/20 rounded-2xl text-lg hover:-translate-y-1 transition-all" @click="handlePay">Simulate Validation ₹{{ Number(amount).toLocaleString() }}</Button>
                </div>
              </div>
              
              <div class="bg-slate-100 border-t border-slate-200 p-4 flex items-center justify-between text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] rounded-b-2xl">
                <span class="flex items-center gap-1.5"><ShieldCheck :size="16" class="text-blue-500" /> SECURED BY RAZORPAY</span>
                <span>PCI DSS Compliant</span>
              </div>
            </template>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
