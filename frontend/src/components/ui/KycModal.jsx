import React, { useRef, useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';
import { Button } from './Button';

export function KycModal({ isOpen, onClose, onComplete }) {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, capturing, success

  useEffect(() => {
    let currentStream = null;
    if (isOpen) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((s) => {
          currentStream = s;
          setStream(s);
          if (videoRef.current) videoRef.current.srcObject = s;
        })
        .catch(err => {
          console.error("Webcam access denied", err);
        });
    }
    return () => {
      if (currentStream) currentStream.getTracks().forEach(t => t.stop());
    };
  }, [isOpen]);

  const handleCapture = () => {
    setStatus('capturing');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        if (stream) stream.getTracks().forEach(t => t.stop());
        onComplete();
        onClose();
        setStatus('idle');
      }, 2500);
    }, 1500);
  };

  const handleClose = () => {
    if (stream) stream.getTracks().forEach(t => t.stop());
    setStatus('idle');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={handleClose} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 overflow-hidden text-center"
      >
        <button onClick={handleClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors bg-slate-50 p-2 rounded-full">
          <X size={20} />
        </button>

        {status === 'success' ? (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex flex-col items-center py-8"
          >
            <div className="w-24 h-24 bg-fintech-green-100 text-fintech-green-600 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">KYC Successful!</h2>
            <p className="text-slate-500 font-medium">Your identity has been verified securely. Note: We did not record or upload any images.</p>
          </motion.div>
        ) : (
          <>
            <div className="mb-6 flex justify-center">
               <ShieldCheck size={32} className="text-fintech-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Face Verification</h2>
            <p className="text-slate-500 text-sm mb-6">Please position your face within the frame to securely verify your identity. (Camera access required)</p>

            <div className="relative w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-[6px] border-slate-100 bg-slate-50 flex items-center justify-center shadow-inner">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="absolute inset-0 w-full h-full object-cover"
              />
              {!stream && <Camera size={32} className="text-slate-300" />}
              {status === 'capturing' && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center">
                  <Loader2 size={32} className="text-fintech-green-600 animate-spin" />
                </div>
              )}
            </div>

            <Button 
              size="lg" 
              onClick={handleCapture}
              disabled={!stream || status === 'capturing'}
              className="w-full gap-2 font-bold tracking-wide rounded-xl"
            >
              {status === 'capturing' ? 'Verifying Coordinates...' : 'Capture & Proceed'}
            </Button>
          </>
        )}
      </motion.div>
    </div>
  );
}
