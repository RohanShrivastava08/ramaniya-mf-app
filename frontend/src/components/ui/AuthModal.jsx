import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './Button';

import { useNavigate } from 'react-router-dom';

export function AuthModal({ isOpen, onClose, onLogin }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Please fill in all fields.");
      return;
    }
    const user = { id: crypto.randomUUID(), name, email };
    localStorage.removeItem('ramaniya_kyc');
    localStorage.removeItem('ramaniya_investments');
    localStorage.setItem('ramaniya_user', JSON.stringify(user));
    if (onLogin) onLogin(user);
    onClose();
    navigate('/onboarding');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 overflow-hidden"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors bg-slate-50 hover:bg-slate-100 p-2 rounded-full"
        >
          <X size={20} />
        </button>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Create Free Account</h2>
          <p className="text-slate-500 text-sm">Join the smartest mutual fund platform. This is a secure mock demo.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-fintech-green-500 focus:border-fintech-green-500 transition-all outline-none bg-slate-50 focus:bg-white"
              placeholder="E.g. Rohan Shrivastava"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-fintech-green-500 focus:border-fintech-green-500 transition-all outline-none bg-slate-50 focus:bg-white"
              placeholder="rohan@example.com"
            />
          </div>
          <Button type="submit" size="lg" className="w-full mt-4 font-bold tracking-wide">
            Register & Continue
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
