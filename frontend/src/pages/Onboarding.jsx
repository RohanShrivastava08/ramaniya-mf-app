import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Camera, Loader2, CheckCircle2, TrendingUp, Lock, Zap, Focus, Fingerprint } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [pan, setPan] = useState('');
  const [panStatus, setPanStatus] = useState('idle');
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [kycStatus, setKycStatus] = useState('idle');

  useEffect(() => {
    let currentStream = null;
    if (step === 2) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((s) => {
          currentStream = s;
          setStream(s);
          if (videoRef.current) videoRef.current.srcObject = s;
        })
        .catch(err => console.error("Camera denied", err));
    }
    return () => {
      if (currentStream) currentStream.getTracks().forEach(t => t.stop());
    };
  }, [step]);

  const verifyPan = () => {
    if (pan.length !== 10) return alert("Please enter a valid 10-character PAN number to verify.");
    setPanStatus('verifying');
    setTimeout(() => {
      setPanStatus('success');
      setTimeout(() => {
        setStep(2);
      }, 1000);
    }, 1500);
  };

  const captureKyc = () => {
    setKycStatus('capturing');
    setTimeout(() => {
      setKycStatus('success');
      localStorage.setItem('ramaniya_kyc', 'true');
      setTimeout(() => {
        if (stream) stream.getTracks().forEach(t => t.stop());
        navigate('/funds');
      }, 2000);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50">
      {/* Dynamic Left Sidebar */}
      <div className="w-full lg:w-5/12 bg-slate-900 text-white p-8 lg:p-16 flex flex-col relative overflow-hidden shrink-0 shadow-2xl z-10">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-fintech-green-900/40 via-transparent to-transparent z-0"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-fintech-blue-600/30 rounded-full blur-[100px] z-0"></div>
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[80px] z-0"></div>

        <div className="relative z-10 flex items-center gap-3 mb-16 lg:mb-24 cursor-pointer" onClick={() => navigate('/')}>
          <div className="bg-gradient-to-tr from-fintech-green-500 to-fintech-green-400 p-2.5 rounded-2xl text-slate-900 shadow-xl shadow-fintech-green-900/20">
            <TrendingUp size={24} strokeWidth={3} />
          </div>
          <span className="text-3xl font-black tracking-tighter text-white">Ramaniya</span>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest uppercase mb-6 text-slate-300 w-fit backdrop-blur-md">
            <Fingerprint size={14} className="text-fintech-green-400" /> Secure Onboarding
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-black mb-6 leading-[1.15] tracking-tight">
            Verify identity.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fintech-green-400 to-emerald-200">
              Build wealth.
            </span>
          </h2>
          <p className="text-slate-400 text-lg mb-12 leading-relaxed font-medium">
            Complete a swift 2-step verification framework to securely unlock curated premium mutual funds, analytics, and auto-pilot investing.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-5 group">
              <div className="p-3.5 bg-white/5 rounded-2xl text-fintech-green-400 border border-white/10 group-hover:bg-fintech-green-500/10 transition-colors shadow-lg shadow-black/20"><Lock size={24} /></div>
              <div>
                <h4 className="font-bold text-lg text-white mb-1">Bank-Grade Encryption</h4>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">256-bit secure demographic tunneling ensuring your data never leaks.</p>
              </div>
            </div>
            <div className="flex items-start gap-5 group">
              <div className="p-3.5 bg-white/5 rounded-2xl text-fintech-blue-400 border border-white/10 group-hover:bg-fintech-blue-500/10 transition-colors shadow-lg shadow-black/20"><Zap size={24} /></div>
              <div>
                <h4 className="font-bold text-lg text-white mb-1">Lightning Fast Verification</h4>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">Automated central live CKYC database fetching approves you instantly.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 mt-16 pt-8 border-t border-white/10">
          <p className="text-xs text-slate-500 font-medium">© 2026 Ramaniya Financial Services. SEBI Reg: INZ000000000</p>
        </div>
      </div>

      {/* Right Side (Active Form) */}
      <div className="w-full lg:w-7/12 p-6 md:p-12 lg:p-20 flex flex-col justify-center items-center bg-slate-50 relative z-0">
        <div className="absolute top-8 right-8 hidden md:inline-flex items-center gap-2 bg-white text-slate-500 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase border border-slate-200 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-fintech-green-500 animate-pulse border border-fintech-green-200"></div>
          Step {step} of 4
        </div>
        
        <div className="w-full max-w-md">
          {/* Progress Indicator */}
          <div className="flex gap-3 mb-12">
            <div className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${step >= 1 ? 'bg-fintech-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]' : 'bg-slate-200'}`}></div>
            <div className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${step >= 2 ? 'bg-fintech-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]' : 'bg-slate-200'}`}></div>
          </div>

          {step === 1 ? (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
              <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center mb-8 shadow-sm text-fintech-blue-600">
                <ShieldCheck size={32} />
              </div>
              <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Verify your PAN</h1>
              <p className="text-slate-500 mb-10 font-medium leading-relaxed text-lg">As per strict SEBI security guidelines, a valid Permanent Account Number is required to initiate portfolios.</p>
              
              <div className="mb-8">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 pl-1">10-Digit Demat PAN Number</label>
                <input 
                  type="text"
                  maxLength={10}
                  placeholder="e.g. ABCDE1234F"
                  value={pan}
                  onChange={(e) => setPan(e.target.value.toUpperCase())}
                  className="w-full text-3xl font-black uppercase px-6 py-5 rounded-2xl border-2 border-slate-200 focus:border-fintech-green-500 focus:ring-4 focus:ring-fintech-green-500/20 outline-none transition-all shadow-sm bg-white tracking-[0.2em] placeholder-slate-200"
                  disabled={panStatus !== 'idle'}
                />
              </div>

              <Button 
                onClick={verifyPan} 
                size="lg" 
                className="w-full h-16 text-lg font-bold shadow-lg rounded-2xl transition-all hover:-translate-y-1"
                disabled={pan.length !== 10 || panStatus !== 'idle'}
              >
                {panStatus === 'verifying' ? <span className="flex items-center justify-center gap-3"><Loader2 className="animate-spin" size={24}/> Linking SEBI Network...</span> : 
                 panStatus === 'success' ? <span className="flex items-center justify-center gap-3"><CheckCircle2 size={24}/> Verified Successfully</span> : 
                 'Confirm PAN & Continue'}
              </Button>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-8 duration-700 text-center fill-mode-both w-full">
              {kycStatus === 'success' ? (
                <div className="py-16">
                  <div className="w-28 h-28 bg-fintech-green-50 text-fintech-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border-4 border-white ring-1 ring-fintech-green-100">
                    <CheckCircle2 size={56} />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Biometrics Verified!</h2>
                  <p className="text-slate-500 font-medium text-lg max-w-sm mx-auto">Your identity is geometrically confirmed. Moving you securely to our active multi-asset tracking catalog.</p>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm text-fintech-green-600">
                    <Focus size={32} />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">Live Video CKYC</h1>
                  <p className="text-slate-500 mb-10 font-medium px-4 leading-relaxed text-lg max-w-sm mx-auto">
                    Position your face perfectly within the frame. (Demo recording solely isolated natively to your device logic).
                  </p>
                  
                  <div className="relative w-64 h-64 mx-auto mb-12 rounded-full overflow-hidden border-[10px] border-white shadow-2xl bg-slate-100 flex items-center justify-center ring-4 ring-fintech-green-100 group">
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline 
                      muted 
                      className="absolute inset-0 w-full h-full object-cover transform scale-[1.35] group-hover:scale-125 transition-transform duration-700"
                    />
                    {!stream && <Camera size={40} className="text-slate-300 animate-pulse" />}
                    
                    {/* Scanning Overlay Effect */}
                    {stream && kycStatus === 'idle' && (
                       <div className="absolute inset-0 border-2 border-fintech-green-400 rounded-full scale-90 opacity-50 animate-[ping_3s_ease-in-out_infinite]"></div>
                    )}

                    {kycStatus === 'capturing' && (
                      <div className="absolute inset-0 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center text-fintech-green-700">
                        <Loader2 size={40} className="animate-spin mb-3" />
                        <span className="font-bold text-sm tracking-widest uppercase">Scanning...</span>
                      </div>
                    )}
                  </div>

                  <Button 
                    onClick={captureKyc} 
                    size="lg" 
                    className="w-full h-16 text-lg font-bold shadow-lg rounded-2xl bg-slate-900 hover:bg-slate-800 text-white transition-all hover:-translate-y-1"
                    disabled={!stream || kycStatus !== 'idle'}
                  >
                    {kycStatus === 'capturing' ? <span className="flex items-center justify-center gap-3"><Loader2 className="animate-spin" size={24}/> Authenticating Geometric Data...</span> : 'Capture Feed & Proceed'}
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
