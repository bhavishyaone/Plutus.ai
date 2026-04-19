import { api } from '@/lib/utils';
import React, { useState } from 'react';
import LendingAssessment from './LendingAssessment';

const CreditRiskPredictor = () => {
  const [formData, setFormData] = useState({
    rev_util: '',
    age: '',
    late_30_59: '',
    debt_ratio: '',
    monthly_inc: '',
    open_credit: '',
    late_90: '',
    real_estate: '',
    late_60_89: '',
    dependents: '',
  });

  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingStep, setLoadingStep] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAssessment(null);

    try {
      setLoadingStep('Running ML models...');
      await new Promise((r) => setTimeout(r, 400));

      setLoadingStep('Retrieving lending regulations...');
      await new Promise((r) => setTimeout(r, 400));

      setLoadingStep('Generating AI assessment report...');
      const response = await api.post('/assess', formData);

      setAssessment(response.data);
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.detail ??
        'Something went wrong. Please check the backend is running and your GROQ_API_KEY is set.'
      );
    } finally {
      setLoading(false);
      setLoadingStep('');
    }
  };

  const fields = [
    { name: 'rev_util', label: 'Revol. Util. of Unsecured Lines', placeholder: 'e.g., 0.766' },
    { name: 'age', label: 'Age', placeholder: 'e.g., 45' },
    { name: 'late_30_59', label: 'Times 30-59 Days Past Due', placeholder: 'e.g., 2' },
    { name: 'debt_ratio', label: 'Debt Ratio', placeholder: 'e.g., 0.80' },
    { name: 'monthly_inc', label: 'Monthly Income ($)', placeholder: 'e.g., 9120' },
    { name: 'open_credit', label: 'Open Credit Lines & Loans', placeholder: 'e.g., 13' },
    { name: 'late_90', label: 'Times 90+ Days Late', placeholder: 'e.g., 0' },
    { name: 'real_estate', label: 'Real Estate Loans or Lines', placeholder: 'e.g., 2' },
    { name: 'late_60_89', label: 'Times 60-89 Days Past Due', placeholder: 'e.g., 0' },
    { name: 'dependents', label: 'Number of Dependents', placeholder: 'e.g., 2' },
  ];

  return (
    <section className="relative w-full min-h-screen flex items-start justify-center overflow-hidden py-24 px-6">
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ background: 'linear-gradient(160deg, oklch(0.07 0.025 270) 0%, #050c1f 45%, oklch(0.06 0.02 265) 100%)' }}
      />
      <div
        className="absolute w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ top: '-20%', left: '-10%', background: 'radial-gradient(ellipse, rgba(109,40,217,0.07) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto animate-fade-up">
        <div className="glass-cardp p-8 sm:p-10 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-2xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-semibold mb-4">
              ✦ Milestone 2 — Agentic AI
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
              Credit Risk Predictor
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Enter borrower details below. Our AI agent will run ML models, retrieve relevant lending regulations,
              and generate a full structured lending assessment report.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              {fields.map((field) => (
                <div key={field.name} className="flex flex-col space-y-1.5">
                  <label htmlFor={field.name} className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    type="number"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                    step="any"
                    placeholder={field.placeholder}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/40 transition-all"
                  />
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10 flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    {loadingStep}
                  </>
                ) : (
                  '✦ Generate AI Lending Assessment'
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-6 px-4 py-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-300 text-sm">
              ⚠ {error}
            </div>
          )}
        </div>

        {assessment && <LendingAssessment assessment={assessment} />}
      </div>
    </section>
  );
};

export default CreditRiskPredictor;