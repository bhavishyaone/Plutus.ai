import { UploadCloud, Cpu, CheckSquare } from 'lucide-react';

const steps = [
    {
        number: '01',
        icon: UploadCloud,
        title: 'Upload Borrower Data',
        description:
            'Submit structured financial data — income, liabilities, repayment history, and behavioral signals via API or CSV.',
        iconColor: 'text-slate-300',
        iconBg: 'bg-white/8',
        glow: 'rgba(255,255,255,0.12)',
    },
    {
        number: '02',
        icon: Cpu,
        title: 'AI Risk Analysis',
        description:
            'Our ML pipeline runs feature extraction, class-imbalanced scoring, and probability calibration in under 200ms.',
        iconColor: 'text-violet-400',
        iconBg: 'bg-violet-500/12',
        glow: 'rgba(124,58,237,0.25)',
    },
    {
        number: '03',
        icon: CheckSquare,
        title: 'Smart Lending Decision',
        description:
            'Receive a structured recommendation — approve, decline, or manual review — with a full explainability report.',
        iconColor: 'text-emerald-400',
        iconBg: 'bg-emerald-500/12',
        glow: 'rgba(16,185,129,0.25)',
    },
];

export default function HowItWorksSection() {
    return (
        <section className="py-28 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-700/5 blur-[100px] rounded-full" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-20 space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">
                        How It Works
                    </p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                        From Raw Data to{' '}
                        <span className="gradient-text">Confident Decision</span>
                    </h2>
                    <p className="text-slate-400 max-w-lg mx-auto">
                        Three streamlined steps from data ingestion to a fully explainable lending outcome.
                    </p>
                </div>

                <div className="relative grid md:grid-cols-3 gap-8 lg:gap-4">
                    {steps.map((step, i) => {
                        const Icon = step.icon;
                        return (
                            <div key={step.number} className="relative flex flex-col items-center text-center group animate-fade-up" style={{ animationDelay: `${i * 0.2}s` }}>
                                {i < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-10 left-1/2 w-full h-px connector-line" style={{ left: '65%' }} />
                                )}

                                <div
                                    className={`relative w-20 h-20 rounded-2xl ${step.iconBg} flex items-center justify-center mb-6 transition-all duration-400`}
                                    style={{ boxShadow: `0 0 0 0 ${step.glow}` }}
                                    onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 0 30px ${step.glow}`)}
                                    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = `0 0 0 0 ${step.glow}`)}
                                >
                                    <Icon className={`w-8 h-8 ${step.iconColor}`} />
                                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-violet-600 to-violet-800 text-white text-[10px] font-bold flex items-center justify-center shadow-lg">
                                        {i + 1}
                                    </span>
                                </div>

                                <div className="text-xs font-bold text-slate-600 tracking-widest mb-2">{step.number}</div>
                                <h3 className="text-white font-semibold text-xl mb-3">{step.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed max-w-xs">{step.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
