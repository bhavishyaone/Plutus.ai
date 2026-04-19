import { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';

export default function Navbar({ onNavigateHome, onNavigatePredict, currentView }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? 'bg-[oklch(0.06_0.02_265/0.92)] backdrop-blur-xl border-b border-white/8 shadow-lg shadow-black/20'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={onNavigateHome}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center shadow-lg shadow-violet-800/20">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">Plutus</span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={onNavigateHome}
              className={`text-sm hover:text-white transition-colors duration-200 font-medium ${currentView === 'home' ? 'text-white' : 'text-slate-400'}`}
            >
              Home
            </button>
            <button
              onClick={onNavigatePredict}
              className={`text-sm hover:text-white transition-colors duration-200 font-medium ${currentView === 'predict' ? 'text-white' : 'text-slate-400'}`}
            >
              Predict
            </button>
            <a
              href="#documentation"
              className="text-sm text-slate-400 hover:text-white transition-colors duration-200 font-medium"
            >
              Documentation
            </a>
          </div>

          {/* CTA */}
          <button
            onClick={onNavigatePredict}
            className="btn-primary hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm cursor-pointer border-none"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
