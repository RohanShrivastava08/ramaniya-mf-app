import React from 'react';
import { TrendingUp, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-800 pb-12 mb-8">
          
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-fintech-green-600 p-2 rounded-xl text-white">
                <TrendingUp size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Ramaniya</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Simple, fast, and secure mutual fund investing platform designed for modern India.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Investments</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-fintech-green-400 transition-colors">Mutual Funds</a></li>
              <li><a href="#" className="hover:text-fintech-green-400 transition-colors">Equity Funds</a></li>
              <li><a href="#" className="hover:text-fintech-green-400 transition-colors">Debt Funds</a></li>
              <li><a href="#" className="hover:text-fintech-green-400 transition-colors">Hybrid Funds</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-fintech-green-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-fintech-green-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-fintech-green-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-fintech-green-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-fintech-green-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-fintech-green-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-fintech-green-400 transition-colors">Refund Policy</a></li>
              <li><a href="#" className="hover:text-fintech-green-400 transition-colors">Trust & Security</a></li>
            </ul>
          </div>

        </div>

        <div className="text-sm">
          <p className="mb-4">
            <strong>Disclaimer:</strong> Mutual Fund investments are subject to market risks, read all scheme related documents carefully. The NAVs of the schemes may go up or down depending upon the factors and forces affecting the securities market including the fluctuations in the interest rates. The past performance of the mutual funds is not necessarily indicative of future performance of the schemes.
          </p>
          <p className="mb-2 text-slate-500">
            Ramaniya Platform is SEBI compliant and partnered with major AMCs.
          </p>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-4 border-t border-slate-800 text-slate-500">
            <p>&copy; {new Date().getFullYear()} Ramaniya Technologies. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
