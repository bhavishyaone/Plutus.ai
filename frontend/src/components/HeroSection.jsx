import { UploadCloud, PlayCircle, ShieldCheck, TrendingUp, CheckCircle } from 'lucide-react';

const riskFactors = [
    { label: 'Payment History', value: 'Excellent', color: 'text-emerald-400' },
    { label: 'Credit Utilization', value: '18%', color: 'text-emerald-400' },
    { label: 'Debt-to-Income', value: '0.32', color: 'text-amber-400' },
    { label: 'Account Age', value: '7.2 yrs', color: 'text-emerald-400' },
];

function DashboardMockup() {
    return (
        <div className="relative w-full max-w-[480px] animate-float" style={{ animationDelay: '0.3s' }}>
            <div
                className="absolute -inset-8 rounded-3xl pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at 60% 50%, rgba(109,40,217,0.14) 0%, rgba(139,92,246,0.06) 45%, transparent 70%)',
                    filter: 'blur(24px)',
                }}
            />

            <div className="relative glass-card p-7 space-y-5 animate-count-up" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
                        <span className="text-xs text-slate-400 font-medium tracking-widest uppercase">Risk Analysis</span>
                    </div>
                    <span className="text-xs text-slate-500 bg-white/5 border border-white/8 px-2.5 py-1 rounded-lg">Live</span>
                </div>

                <div className="text-center py-4">
                    <div
                        className="text-[84px] font-bold leading-none tabular-nums"
                        style={{
                            background: 'linear-gradient(135deg, #93c5fd 0%, #a78bfa 40%, #c084fc 70%, #818cf8 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            filter: 'drop-shadow(0 0 24px rgba(139,92,246,0.45))',
                        }}
                    >
                        742
                    </div>
                    <div className="text-slate-400 text-sm mt-1 tracking-wide">Credit Risk Score</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/4 border border-white/6 rounded-xl p-3.5 transition-all duration-300 ease-out hover:bg-white/6">
                        <div className="text-xs text-slate-500 mb-1.5">Risk Category</div>
                        <div className="flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span className="text-emerald-400 font-semibold text-sm">Low Risk</span>
                        </div>
                    </div>
                    <div className="bg-white/4 border border-white/6 rounded-xl p-3.5 transition-all duration-300 ease-out hover:bg-white/6">
                        <div className="text-xs text-slate-500 mb-1.5">Prob. of Default</div>
                        <div className="flex items-center gap-1.5">
                            <TrendingUp className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                            <span className="text-violet-400 font-semibold text-sm">3.2%</span>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-2">
                        <span>300</span>
                        <span className="text-slate-300 font-semibold">742 / 850</span>
                        <span>850</span>
                    </div>
                    <div className="h-2 bg-white/6 rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full"
                            style={{
                                width: '87%',
                                background: 'linear-gradient(90deg, #6d28d9, #7c3aed, #a855f7)',
                                boxShadow: '0 0 12px rgba(139,92,246,0.45)',
                                transition: 'width 1.8s cubic-bezier(0.16,1,0.3,1)',
                            }}
                        />
                    </div>
                </div>

                <div>
                    <div className="text-xs text-slate-600 uppercase tracking-widest mb-3">Key Risk Factors</div>
                    <div className="space-y-2.5">
                        {riskFactors.map((f) => (
                            <div key={f.label} className="flex items-center justify-between">
                                <span className="text-xs text-slate-400">{f.label}</span>
                                <span className={`text-xs font-semibold ${f.color}`}>{f.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-emerald-500/8 border border-emerald-400/20 rounded-xl px-4 py-3 flex items-center gap-2.5 transition-all duration-300 ease-out">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs text-emerald-300 font-medium">Recommended: Approve at standard rate</span>
                </div>
            </div>
        </div>
    );
}

export default function HeroSection({ onNavigate }) {
    return (
        <section
            id="home"
            className="relative w-full min-h-screen flex items-center overflow-hidden"
        >
            <div
                className="absolute inset-0 w-full h-full"
                style={{ background: 'linear-gradient(160deg, oklch(0.07 0.025 270) 0%, #050c1f 45%, oklch(0.06 0.02 265) 100%)' }}
            />

            <div
                className="absolute w-[900px] h-[900px] rounded-full pointer-events-none animate-orb-a"
                style={{
                    top: 0, right: 0,
                    background: 'radial-gradient(ellipse, rgba(139,92,246,0.07) 0%, rgba(99,102,241,0.03) 50%, transparent 75%)',
                    filter: 'blur(10px)',
                }}
            />

            <div
                className="absolute w-[700px] h-[700px] rounded-full pointer-events-none animate-orb-b"
                style={{
                    bottom: 0, left: 0,
                    background: 'radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, rgba(139,92,246,0.03) 50%, transparent 75%)',
                    filter: 'blur(10px)',
                }}
            />

            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    opacity: 0.12,
                }}
            />

            <div className="relative z-10 w-full px-12 lg:px-20 pt-28 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-10 items-center">

                    <div className="flex flex-col gap-8">
                        <div className="animate-fade-up">
                            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-violet-300 tracking-wide"
                                style={{
                                    background: 'rgba(109,40,217,0.12)',
                                    border: '1px solid rgba(139,92,246,0.25)',
                                    boxShadow: '0 0 20px rgba(109,40,217,0.08)',
                                }}
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse inline-block" />
                                AI-Native Credit Intelligence
                            </span>
                        </div>

                        <h1
                            className="animate-fade-up delay-100 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white"
                            style={{ lineHeight: 1.06 }}
                        >
                            AI-Powered Credit Risk Intelligence for{' '}
                            <span className="gradient-text-vivid whitespace-nowrap">Smarter Lending</span>{' '}
                            Decisions
                        </h1>

                        <p className="animate-fade-up delay-200 text-lg lg:text-xl text-slate-400 leading-relaxed max-w-[520px]">
                            Predict borrower risk, analyze financial behavior, and generate structured lending recommendations using advanced machine learning.
                        </p>

                        <div className="animate-fade-up delay-300 flex flex-wrap items-center gap-4">
                            <button
                                id="upload-data-btn"
                                className="btn-primary flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm"
                            >
                                <UploadCloud className="w-4 h-4" />
                                Upload Data
                            </button>
                            <button
                                id="view-demo-btn"
                                onClick={onNavigate}
                                className="btn-secondary flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm"
                            >
                                <PlayCircle className="w-4 h-4" />
                                View Demo
                            </button>
                        </div>

                        <div className="animate-fade-up delay-400 flex items-center gap-0 pt-2">
                            {[
                                { value: '99.1%', label: 'Model Accuracy' },
                                { value: '0.94', label: 'ROC-AUC Score' },
                                { value: '<200ms', label: 'Inference Time' },
                            ].map((stat, i) => (
                                <div
                                    key={stat.label}
                                    className={`flex-1 ${i > 0 ? 'border-l border-white/8 pl-6 ml-6' : ''}`}
                                >
                                    <div className="text-2xl font-bold text-white tracking-tight">{stat.value}</div>
                                    <div className="text-xs text-slate-500 mt-0.5 tracking-wide">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center lg:justify-end items-center animate-fade-in delay-300">
                        <DashboardMockup />
                    </div>
                </div>
            </div>

            <div
                className="absolute bottom-0 inset-x-0 h-40 pointer-events-none"
                style={{ background: 'linear-gradient(to top, oklch(0.06 0.02 265) 0%, transparent 100%)' }}
            />
        </section>
    );
}
