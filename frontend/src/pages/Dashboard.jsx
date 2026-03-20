import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  Wallet, 
  PieChart, 
  ArrowRight, 
  Trash2,
  CheckCircle2,
  AlertCircle,
  PlayCircle,
  LogOut,
  ChevronRight,
  TrendingDown
} from 'lucide-react';
import { getFundDB } from '../lib/liveData';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('ramaniya_user') || '{"name": "Guest"}');
  const [investments, setInvestments] = useState(() => 
    JSON.parse(localStorage.getItem('ramaniya_investments') || '[]')
  );

  const kycDone = localStorage.getItem('ramaniya_kyc') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('ramaniya_user');
    localStorage.removeItem('ramaniya_kyc');
    localStorage.removeItem('ramaniya_investments');
    navigate('/');
  };

  const deleteInvestment = (id) => {
    const updated = investments.filter(inv => inv.id !== id);
    setInvestments(updated);
    localStorage.setItem('ramaniya_investments', JSON.stringify(updated));
  };

  // Math Setup
  let totalInvested = 0;
  let currentValue = 0;
  let allocation = { Equity: 0, Debt: 0, Hybrid: 0 };
  const FUND_DB = getFundDB();

  investments.forEach(inv => {
    totalInvested += inv.amount;
    const fundDetails = FUND_DB.find(f => f.name === inv.fundName);
    // Add simulated P&L locally
    const simulatedReturn = fundDetails ? (inv.amount * (Number(fundDetails.currentReturn) / 100)) : (inv.amount * 0.05); 
    currentValue += inv.amount + simulatedReturn;
    
    // Allocation tracking
    if (fundDetails) {
      if (allocation[fundDetails.category] !== undefined) {
         allocation[fundDetails.category] += inv.amount;
      }
    }
  });

  const totalReturn = currentValue - totalInvested;
  const returnPercentage = totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;
  
  const eqPct = totalInvested > 0 ? (allocation.Equity / totalInvested) * 100 : 0;
  const dtPct = totalInvested > 0 ? (allocation.Debt / totalInvested) * 100 : 0;
  const hbPct = totalInvested > 0 ? (allocation.Hybrid / totalInvested) * 100 : 0;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-fintech-green-600 p-2 rounded-xl text-white shadow-md">
              <TrendingUp size={22} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">Ramaniya</span>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors font-bold text-sm tracking-widest uppercase bg-slate-100 hover:bg-red-50 px-4 py-2 rounded-lg"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 md:py-16">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3 tracking-tight">
            Welcome back, <span className="text-fintech-green-600">{user.name.split(' ')[0]}</span>!
          </h1>
          <p className="text-xl text-slate-500 font-medium">Here is the real-time overview of your wealth portfolio.</p>
        </div>

        {investments.length === 0 ? (
          // Empty State / Getting Started
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4">Getting Started Checklist</h2>
            
            <div className="space-y-6">
              {/* KYC Step */}
              <div className={`p-6 rounded-2xl border-2 flex items-center gap-6 transition-all ${kycDone ? 'border-fintech-green-100 bg-fintech-green-50/30' : 'border-slate-200 bg-white hover:border-fintech-blue-300'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm ${kycDone ? 'bg-fintech-green-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                  {kycDone ? <CheckCircle2 size={24} /> : <span className="font-bold">1</span>}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900">Complete CKYC & PAN Status</h3>
                  <p className="text-slate-500 text-sm font-medium mt-1">Legally required verified routing.</p>
                </div>
                {!kycDone && (
                  <Button onClick={() => navigate('/onboarding')} className="shrink-0 bg-slate-900 text-white rounded-xl font-bold shadow-md">Complete Setup</Button>
                )}
              </div>

              {/* Browse Funds Step */}
              <div className={`p-6 rounded-2xl border-2 flex items-center gap-6 transition-all border-slate-200 bg-white hover:border-fintech-blue-300`}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm bg-slate-100 text-slate-400 font-bold">2</div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900">Explore Mutual Funds</h3>
                  <p className="text-slate-500 text-sm font-medium mt-1">Browse high-return categorized indices.</p>
                </div>
                <Button onClick={() => navigate('/funds')} className="shrink-0 font-bold shadow-md rounded-xl" disabled={!kycDone}>Explore Catalog</Button>
              </div>
            </div>
          </div>
        ) : (
          // Active Portfolio Grid
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             
            {/* Left Column: Metrics & Graphics */}
            <div className="lg:col-span-1 space-y-8">
               <Card className="bg-slate-900 text-white p-8 rounded-3xl shadow-2xl overflow-hidden relative border-none">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-fintech-green-500/10 rounded-full blur-3xl"></div>
                 <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-fintech-blue-500/20 rounded-full blur-2xl"></div>
                 
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3 relative z-10 flex items-center gap-2">
                   <Wallet size={14}/> Current Value
                 </p>
                 <h2 className="text-5xl font-black mb-10 tracking-tighter relative z-10">
                   <span className="text-slate-500 text-3xl mr-1">₹</span>
                   {currentValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                 </h2>

                 <div className="space-y-6 relative z-10">
                   <div>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Invested</p>
                     <p className="text-xl font-bold">₹{totalInvested.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                   </div>
                   <div className="border-t border-slate-800 pt-6">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Absolute Returns</p>
                     <div className="flex items-center gap-3">
                       <p className={`text-2xl font-black tracking-tight ${totalReturn >= 0 ? 'text-fintech-green-400' : 'text-red-400'}`}>
                         {totalReturn >= 0 ? '+' : '-'}₹{Math.abs(totalReturn).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                       </p>
                       <span className={`px-2.5 py-1 text-xs font-black rounded-lg ${totalReturn >= 0 ? 'bg-fintech-green-500/20 text-fintech-green-400' : 'bg-red-500/20 text-red-400'}`}>
                         {totalReturn >= 0 ? '+' : ''}{returnPercentage.toFixed(2)}%
                       </span>
                     </div>
                   </div>
                 </div>
               </Card>

               <Card className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                 <h3 className="text-sm font-black text-slate-900 mb-6 uppercase tracking-widest flex items-center gap-2">
                   <PieChart size={18} className="text-fintech-blue-600" /> Asset Allocation
                 </h3>

                 {/* Bar Chart mapping */}
                 <div className="w-full h-4 rounded-full flex overflow-hidden mb-6 bg-slate-100">
                   {eqPct > 0 && <div style={{width: `${eqPct}%`}} className="bg-fintech-green-500 h-full"></div>}
                   {dtPct > 0 && <div style={{width: `${dtPct}%`}} className="bg-purple-500 h-full"></div>}
                   {hbPct > 0 && <div style={{width: `${hbPct}%`}} className="bg-fintech-blue-500 h-full"></div>}
                 </div>

                 <div className="space-y-4">
                   <div className="flex justify-between items-center text-sm font-bold">
                     <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-fintech-green-500"></div> Equity</div>
                     <span className="text-slate-900">{eqPct.toFixed(1)}%</span>
                   </div>
                   <div className="flex justify-between items-center text-sm font-bold">
                     <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-purple-500"></div> Debt</div>
                     <span className="text-slate-900">{dtPct.toFixed(1)}%</span>
                   </div>
                   <div className="flex justify-between items-center text-sm font-bold">
                     <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-fintech-blue-500"></div> Hybrid</div>
                     <span className="text-slate-900">{hbPct.toFixed(1)}%</span>
                   </div>
                 </div>
               </Card>
            </div>

            {/* Right Column: Ledger Log */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                <h3 className="font-black text-xl text-slate-900">Your Active Holdings</h3>
                <Button onClick={() => navigate('/funds')} className="gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold shadow-none rounded-xl">
                  Invest More <ChevronRight size={16}/>
                </Button>
              </div>

              <div className="space-y-4">
                {investments.map(inv => {
                   const fd = FUND_DB.find(f => f.name === inv.fundName);
                   const isProfitable = Number(fd?.currentReturn || 5) > 0;
                   const returnText = isProfitable ? `+${fd?.currentReturn || 5}%` : `${fd?.currentReturn || '-5'}%`;

                   return (
                     <Card key={inv.id} className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-6 hover:shadow-md transition-shadow">
                       <div className="flex-1 w-full">
                         <div className="flex justify-between items-start mb-2">
                           <span className="px-3 py-1 bg-slate-50 border border-slate-100 text-slate-500 text-[10px] font-bold rounded-lg uppercase tracking-widest">{inv.type} Mandate</span>
                           <span className="text-[10px] font-bold text-slate-400 tracking-wider">{new Date(inv.date).toLocaleDateString()}</span>
                         </div>
                         <h4 className="text-xl font-black text-slate-900 mb-6 tracking-tight line-clamp-1">{inv.fundName}</h4>
                         
                         <div className="flex flex-wrap gap-8 md:gap-12">
                           <div>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Invested</p>
                             <p className="text-xl font-bold text-slate-900">₹{inv.amount.toLocaleString()}</p>
                           </div>
                           <div className="border-l border-slate-100 pl-8 md:pl-12">
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Unrealized P&L</p>
                             <div className="flex items-center gap-2">
                               <p className={`text-xl font-black tracking-tight ${isProfitable ? 'text-fintech-green-600' : 'text-red-500'}`}>
                                 {returnText}
                               </p>
                               {isProfitable ? <TrendingUp size={16} className="text-fintech-green-500"/> : <TrendingDown size={16} className="text-red-500"/>}
                             </div>
                           </div>
                         </div>
                       </div>
                       
                       <div className="w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-slate-100 md:pl-6">
                         <button 
                           onClick={() => deleteInvestment(inv.id)}
                           className="flex w-full md:w-auto items-center justify-center gap-2 text-red-500 hover:text-white hover:bg-red-500 px-4 py-3 rounded-xl transition-colors font-bold text-xs uppercase tracking-widest"
                         >
                           <Trash2 size={16} /> Withdraw
                         </button>
                       </div>
                     </Card>
                   )
                })}
              </div>

            </div>
          </div>
        )}
      </main>
    </div>
  );
}
