import React, { useState, useEffect } from 'react';
import { Menu, X, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export function Navbar({ user, onLoginClick, onLogoutClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/50 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-fintech-green-600 p-2 rounded-xl text-white">
            <TrendingUp size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">Ramaniya</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <a href="/#how-it-works" className="hover:text-fintech-green-600 transition-colors">How it Works</a>
          <a href="/#features" className="hover:text-fintech-green-600 transition-colors">Features</a>
          <Link to="/news" className="hover:text-fintech-green-600 transition-colors flex items-center gap-1">
             News <span className="bg-fintech-blue-50 text-fintech-blue-600 text-[8px] uppercase tracking-widest font-black px-1.5 py-0.5 rounded shadow-sm">Live</span>
          </Link>
          <a href="/#funds" className="hover:text-fintech-green-600 transition-colors">Funds</a>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm font-semibold text-fintech-green-700 bg-fintech-green-50 px-3 py-1.5 rounded-full">Hi, {user.name.split(' ')[0]}</span>
              <Button variant="ghost" onClick={onLogoutClick}>Log Out</Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={onLoginClick}>Log In</Button>
              <Button variant="primary" onClick={onLoginClick}>Start Investing</Button>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button 
          className="md:hidden text-slate-900 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-lg py-4 px-4 flex flex-col gap-4">
          <a href="/#how-it-works" className="block font-medium text-slate-700 py-2">How it Works</a>
          <a href="/#features" className="block font-medium text-slate-700 py-2">Features</a>
          <Link to="/news" className="block font-medium text-slate-700 py-2 flex items-center gap-2">
             News <span className="bg-fintech-blue-50 text-fintech-blue-600 text-[8px] uppercase tracking-widest font-black px-1.5 py-0.5 rounded shadow-sm">Live</span>
          </Link>
          <a href="/#funds" className="block font-medium text-slate-700 py-2">Funds</a>
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            {user ? (
              <>
                <div className="text-center text-sm font-semibold text-fintech-green-700 bg-fintech-green-50 py-2 rounded-lg">Welcome, {user.name}</div>
                <Button variant="outline" className="w-full justify-center" onClick={onLogoutClick}>Log Out</Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="w-full justify-center" onClick={onLoginClick}>Log In</Button>
                <Button variant="primary" className="w-full justify-center" onClick={onLoginClick}>Start Investing</Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
