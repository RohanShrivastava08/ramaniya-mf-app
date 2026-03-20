import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Landmark, Activity, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { fetchLiveFunds } from '../lib/liveData';

export function ExploreFunds() {
  const navigate = useNavigate();
  
  // Track onboarding boundaries dynamically
  const investments = JSON.parse(localStorage.getItem('ramaniya_investments') || '[]');
  const isOnboarding = investments.length === 0;

  const [catalog, setCatalog] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchCatalog = async () => {
      setLoading(true);
      const data = await fetchLiveFunds();
      setCatalog(data);
      setLoading(false);
    };
    fetchCatalog();
  }, []);

  const categories = [
    { id: 'Equity', icon: <TrendingUp size={20} className="text-fintech-green-600" />, desc: "High growth potential over long term horizons." },
    { id: 'Debt', icon: <Landmark size={20} className="text-purple-600" />, desc: "Stable returns, safe fixed-income assets." },
    { id: 'Hybrid', icon: <Activity size={20} className="text-fintech-blue-600" />, desc: "Optimized balanced portfolio buffering equity volatility." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 mb-20">
      <div className="max-w-[1400px] mx-auto">
        
        {isOnboarding ? (
          <div className="flex justify-between items-center mb-8">
            <div className="text-fintech-green-600 font-bold bg-fintech-green-50 px-4 py-1.5 rounded-full text-xs tracking-widest uppercase shadow-sm border border-fintech-green-100">Step 3 of 4: Select Asset</div>
            <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-slate-400 hover:text-slate-700 transition-colors font-bold text-sm tracking-wider uppercase">
               Skip directly to Dashboard
            </button>
          </div>
        ) : (
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-8 transition-colors font-bold uppercase tracking-widest text-xs">
            <ArrowLeft size={16} /> Back to Portfolio
          </button>
        )}
        
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Explore Curated Funds
          </h1>
          <p className="text-slate-500 text-lg font-medium max-w-2xl leading-relaxed">Discover SEBI-verified top-performing indices. Select a fund to project calculations and start your SIP.</p>
        </div>
        
        <div className="space-y-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-20 text-fintech-green-600">
               <Loader2 size={48} className="animate-spin mb-4" />
               <p className="font-bold text-slate-500 tracking-widest uppercase">Fetching Live Market NAV</p>
            </div>
          ) : categories.map(cat => {
            const fundsInCat = catalog.filter(f => f.category === cat.id);
            if (fundsInCat.length === 0) return null;

            return (
              <div key={cat.id} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="mb-6 flex items-center gap-3 border-b border-slate-200 pb-3">
                  <div className={`p-2.5 rounded-xl shadow-sm bg-white border border-slate-200`}>
                    {cat.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">{cat.id} Catalog</h2>
                    <p className="text-slate-500 text-xs font-bold mt-0.5 uppercase tracking-wider">{cat.desc}</p>
                  </div>
                </div>

                {/* Denser 4-Column Grid Array mapping accurately to the explicit user request */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {fundsInCat.map(fund => (
                    <Card key={fund.id} className="p-5 bg-white border border-slate-200 hover:border-fintech-green-400 hover:shadow-lg transition-all cursor-pointer group flex flex-col rounded-2xl h-full" onClick={() => navigate(`/invest/${fund.id}`)}>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[9px] font-black px-2 py-1 bg-slate-50 border border-slate-200 text-slate-500 rounded uppercase tracking-widest shadow-sm">{fund.risk}</span>
                        <span className="text-[9px] font-black px-2 py-1 bg-fintech-green-50 text-fintech-green-700 rounded border border-fintech-green-100 shadow-sm uppercase tracking-widest">Growth</span>
                      </div>
                      
                      <h3 className="text-lg font-black text-slate-900 mb-6 group-hover:text-fintech-green-600 transition-colors line-clamp-2 leading-snug">{fund.name}</h3>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6 mt-auto bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 mb-1 uppercase tracking-widest">3Y CAGR</p>
                          <p className="text-xl font-black text-fintech-green-600 tracking-tighter">+{fund.cagr3Y}%</p>
                        </div>
                        <div className="border-l border-slate-200 pl-4">
                          <p className="text-[9px] font-bold text-slate-400 mb-1 uppercase tracking-widest">NAV</p>
                          <p className="text-xl font-bold text-slate-900 tracking-tighter">₹{fund.nav}</p>
                        </div>
                      </div>

                      <Button className="w-full h-10 text-sm shadow-sm font-bold tracking-wide rounded-xl bg-slate-900 text-white group-hover:bg-fintech-green-600 transition-colors border-none mt-auto">
                        Invest 
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
