
import React, { useState, useMemo } from 'react';
import { SupplyIcon, DemandIcon, PriceBlockIcon } from './components/Icons';

const App: React.FC = () => {
  const [supply, setSupply] = useState<number>(50);
  const [demand, setDemand] = useState<number>(50);

  // Calculate tilt angle: Range from -25 (tilted to supply/left) to 25 (tilted to demand/right)
  const tiltAngle = useMemo(() => {
    const diff = demand - supply;
    // Normalized to a maximum of 25 degrees
    return (diff / 90) * 25;
  }, [supply, demand]);

  // Calculate sliding position for the price block along the plank
  // 0% is center, -40% is far left, 40% is far right
  const slideOffset = useMemo(() => {
    const diff = demand - supply;
    return (diff / 90) * 40; 
  }, [supply, demand]);

  const priceValue = useMemo(() => Math.round(100 + (demand - supply)), [supply, demand]);

  const educationalMessage = useMemo(() => {
    if (Math.abs(supply - demand) < 5) {
      return "目前供給與需求達到了平衡，市場價格非常穩定喔！";
    } else if (demand > supply) {
      return "想買的人比貨物還要多！大家都在搶，所以價格上升了！";
    } else {
      return "貨物堆得跟山一樣多，但想買的人卻變少了，價格正在下跌呢。";
    }
  }, [supply, demand]);

  const priceTrendColor = useMemo(() => {
    if (Math.abs(supply - demand) < 5) return "text-gray-600";
    return demand > supply ? "text-red-500 font-bold" : "text-blue-500 font-bold";
  }, [supply, demand]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 md:p-8 bg-sky-100">
      {/* Header */}
      <header className="text-center mt-4">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2 font-black tracking-tight">供給與需求翹翹板</h1>
        <p className="text-slate-600 text-lg">調整滑桿，觀察價格方塊如何隨供需傾斜！</p>
      </header>

      {/* Main Simulation Area */}
      <main className="relative w-full max-w-4xl flex-grow flex flex-col items-center justify-center">
        
        {/* The Seesaw System Container */}
        <div className="relative w-full max-w-2xl h-96 flex items-end justify-center">
          
          {/* Fulcrum (The triangle base) */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-0">
            <svg width="100" height="100" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="baseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#94a3b8' }} />
                  <stop offset="100%" style={{ stopColor: '#475569' }} />
                </linearGradient>
              </defs>
              <path d="M10 100 L50 10 L90 100 Z" fill="url(#baseGrad)" stroke="#1e293b" strokeWidth="2" />
              {/* Pivot Point Circle */}
              <circle cx="50" cy="15" r="5" fill="#334155" />
            </svg>
          </div>

          {/* Seesaw Plank (The rotating part) positioned on top of the fulcrum apex */}
          <div 
            className="absolute bottom-[85px] w-full h-6 bg-[#92400e] rounded-sm transition-transform duration-1000 ease-in-out origin-center z-10 border-b-4 border-amber-950 shadow-xl flex items-start justify-center"
            style={{ transform: `rotate(${tiltAngle}deg)` }}
          >
            {/* Supply Side Visual (Left end of plank) */}
            <div className="absolute -top-28 left-4 md:left-8 flex flex-col items-center">
               <div className="transform transition-transform duration-1000" style={{ transform: `rotate(${-tiltAngle}deg)` }}>
                 <SupplyIcon value={supply} />
               </div>
               <div className="mt-2 px-3 py-1 bg-green-500 text-white rounded-full text-xs font-bold shadow-sm uppercase tracking-wider">供給 (貨物)</div>
            </div>

            {/* Demand Side Visual (Right end of plank) */}
            <div className="absolute -top-28 right-4 md:right-8 flex flex-col items-center">
               <div className="transform transition-transform duration-1000" style={{ transform: `rotate(${-tiltAngle}deg)` }}>
                 <DemandIcon value={demand} />
               </div>
               <div className="mt-2 px-3 py-1 bg-orange-500 text-white rounded-full text-xs font-bold shadow-sm uppercase tracking-wider">需求 (顧客)</div>
            </div>

            {/* Price Block - Slides horizontally on the plank */}
            <div 
              className="absolute -top-[70px] transition-all duration-1000 ease-in-out flex flex-col items-center"
              style={{ 
                left: `calc(50% + ${slideOffset}%)`, 
                transform: `translateX(-50%) rotate(${-tiltAngle}deg)` 
              }}
            >
              <PriceBlockIcon color={demand > supply ? "#f87171" : (supply > demand ? "#60a5fa" : "#facc15")} />
              <div className={`mt-1 px-3 py-1 bg-white/90 rounded-lg shadow-lg border border-slate-200 transition-colors whitespace-nowrap ${priceTrendColor}`}>
                價格：{priceValue}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Controls & Feedback */}
      <footer className="w-full max-w-3xl bg-white/90 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl mb-4 border border-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          {/* Supply Slider */}
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-green-800 font-bold text-lg flex items-center">
                <span className="w-4 h-4 bg-green-500 rounded-sm mr-2 inline-block shadow-sm"></span>
                貨物產量 (供給)
              </label>
              <span className="text-2xl font-black text-green-600 bg-green-50 px-3 py-1 rounded-xl border border-green-200">{supply}</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="100" 
              value={supply} 
              onChange={(e) => setSupply(parseInt(e.target.value))}
              className="w-full h-3 bg-green-100 rounded-lg appearance-none cursor-pointer accent-green-600 hover:accent-green-700 transition-all"
            />
            <p className="text-sm text-slate-500 italic">當工廠生產更多貨物時，供給量會增加。</p>
          </div>

          {/* Demand Slider */}
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-orange-800 font-bold text-lg flex items-center">
                <span className="w-4 h-4 bg-orange-500 rounded-sm mr-2 inline-block shadow-sm"></span>
                購買熱度 (需求)
              </label>
              <span className="text-2xl font-black text-orange-600 bg-orange-50 px-3 py-1 rounded-xl border border-orange-200">{demand}</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="100" 
              value={demand} 
              onChange={(e) => setDemand(parseInt(e.target.value))}
              className="w-full h-3 bg-orange-100 rounded-lg appearance-none cursor-pointer accent-orange-600 hover:accent-orange-700 transition-all"
            />
            <p className="text-sm text-slate-500 italic">當每個人都想要這件商品時，需求量會增加。</p>
          </div>
        </div>

        {/* Educational Feedback Message */}
        <div className="text-center p-5 bg-slate-100/50 rounded-2xl border-2 border-dashed border-slate-300 transition-all">
          <p className="text-lg md:text-xl text-slate-800 font-medium leading-relaxed">
             {educationalMessage}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
