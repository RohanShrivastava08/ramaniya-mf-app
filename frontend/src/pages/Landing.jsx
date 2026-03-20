import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { Trust } from '../components/sections/Trust';
import { HowItWorks } from '../components/sections/HowItWorks';
import { Features } from '../components/sections/Features';
import { FundCategories } from '../components/sections/FundCategories';
import { AppPreview } from '../components/sections/AppPreview';
import { CTASection } from '../components/sections/CTASection';
import { AuthModal } from '../components/ui/AuthModal';

export function Landing() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('ramaniya_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem('ramaniya_user');
    setUser(null);
    alert("Logged out successfully.");
  };

  const handleInvest = (fundName) => {
    if (!user) {
      alert("Please create an account or log in first to start investing.");
      setIsAuthOpen(true);
      return;
    }
    const amount = prompt(`How much would you like to invest in ${fundName}? (₹)`);
    if (amount && !isNaN(amount)) {
      const investments = JSON.parse(localStorage.getItem('ramaniya_investments') || '[]');
      investments.push({ id: crypto.randomUUID(), fundName, amount: Number(amount), date: new Date().toISOString() });
      localStorage.setItem('ramaniya_investments', JSON.stringify(investments));
      alert(`🎉 Successfully invested ₹${amount} in ${fundName}! Portfolio updated securely.`);
    }
  };

  return (
    <>
      <Navbar user={user} onLoginClick={() => setIsAuthOpen(true)} onLogoutClick={handleLogout} />
      <main className="flex-grow">
        <Hero onStartClick={() => setIsAuthOpen(true)} />
        <Trust />
        <HowItWorks />
        <Features />
        <FundCategories onInvest={handleInvest} />
        <AppPreview />
        <CTASection onStartClick={() => setIsAuthOpen(true)} />
      </main>
      <Footer />
      
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onLogin={(u) => setUser(u)} 
      />
    </>
  );
}
