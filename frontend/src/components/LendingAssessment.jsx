import React, { useRef } from 'react';
import CreditChat from './CreditChat';

const getRiskColor = (risk) => {
  if (!risk) return 'text-slate-400';
  const r = risk.toLowerCase();
  if (r.includes('high') || r.includes('decline')) return 'text-red-400';
  if (r.includes('medium') || r.includes('conditional')) return 'text-yellow-400';
  return 'text-green-400';
};

const getRiskBg = (risk) => {
  if (!risk) return 'border-slate-500/30 bg-slate-500/10';
  const r = risk.toLowerCase();
  if (r.includes('high') || r.includes('decline')) return 'border-red-500/30 bg-red-500/10';
  if (r.includes('medium') || r.includes('conditional')) return 'border-yellow-500/30 bg-yellow-500/10';
  return 'border-green-500/30 bg-green-500/10';
};

const Section = ({ title, icon, children }) => (
  <div className="mb-6">
    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
      <span>{icon}</span>{title}
    </h3>
    <div className="text-sm text-slate-200 leading-relaxed">{children}</div>
  </div>
);

const LendingAssessment = ({ assessment }) => {
  const reportRef = useRef(null);

  if (!assessment) return null;

  const { report, borrower_summary, ml_results, agent_error } = assessment;

  const treeProb = ml_results?.decision_tree?.probability ?? 0;
  const avgProb = treeProb;

  const decision = report?.recommended_lending_decision ?? '';
  const decisionLine = decision.split('.')[0];

  const handleExportPDF = async () => {
    const { default: jsPDF } = await import('https://cdn.jsdelivr.net/npm/jspdf@2.5.1/+esm');

    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const margin = 18;
    const pageW = 210;
    const contentW = pageW - margin * 2;
    let y = 20;

    const addText = (text, opts = {}) => {
      const {
        fontSize = 10,
        bold = false,
        color = [220, 220, 230],
        lineHeight = 6,
        maxW = contentW,
      } = opts;

      doc.setFontSize(fontSize);
      doc.setTextColor(...color);
      doc.setFont('helvetica', bold ? 'bold' : 'normal');

      const lines = doc.splitTextToSize(String(text), maxW);
      lines.forEach((line) => {
        if (y > 275) { doc.addPage(); y = 20; }
        doc.text(line, margin, y);
        y += lineHeight;
      });
    };

    const addDivider = () => {
      doc.setDrawColor(80, 80, 120);
      doc.line(margin, y, pageW - margin, y);
      y += 5;
    };

    doc.setFillColor(10, 12, 35);
    doc.rect(0, 0, 210, 297, 'F');

    doc.setFillColor(30, 20, 60);
    doc.rect(0, 0, 210, 28, 'F');

    addText('PLUTUS.AI', { fontSize: 18, bold: true, color: [180, 130, 255], lineHeight: 8 });
    addText('Lending Assessment Report', { fontSize: 11, color: [160, 160, 200], lineHeight: 10 });
    addDivider();

    addText('ML MODEL OUTPUT', { fontSize: 9, bold: true, color: [130, 100, 220], lineHeight: 7 });
    addText(
      `Decision Tree: ${(treeProb * 100).toFixed(1)}% default probability — ${ml_results?.decision_tree?.risk} Risk`,
      { lineHeight: 5.5 }
    );
    addText(
      `Default Probability: ${(avgProb * 100).toFixed(1)}%`,
      { lineHeight: 8 }
    );
    addDivider();

    if (report) {
      const sections = [
        { title: 'BORROWER PROFILE SUMMARY', key: 'borrower_profile_summary' },
        { title: 'CREDIT RISK ANALYSIS', key: 'credit_risk_analysis' },
        { title: 'RECOMMENDED LENDING DECISION', key: 'recommended_lending_decision' },
      ];

      sections.forEach(({ title, key }) => {
        addText(title, { fontSize: 9, bold: true, color: [130, 100, 220], lineHeight: 6 });
        addText(report[key] ?? 'N/A', { lineHeight: 5.5 });
        y += 3;
      });

      addDivider();

      addText('RISK MITIGATION SUGGESTIONS', { fontSize: 9, bold: true, color: [130, 100, 220], lineHeight: 6 });
      (report.risk_mitigation_suggestions ?? []).forEach((s, i) => {
        addText(`${i + 1}. ${s}`, { lineHeight: 5.5 });
      });
      y += 3;

      addDivider();

      addText('SUPPORTING REFERENCES', { fontSize: 9, bold: true, color: [130, 100, 220], lineHeight: 6 });
      (report.supporting_references ?? []).forEach((r) => {
        addText(`• ${r}`, { lineHeight: 5.5 });
      });
      y += 3;

      addDivider();

      addText('LEGAL & ETHICAL DISCLAIMERS', { fontSize: 9, bold: true, color: [130, 100, 220], lineHeight: 6 });
      addText(report.legal_and_ethical_disclaimers ?? '', { fontSize: 8, color: [150, 150, 180], lineHeight: 5 });
    }

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(7);
      doc.setTextColor(100, 100, 140);
      doc.text(
        `Plutus.ai — Confidential Lending Assessment | Page ${i} of ${pageCount} | Generated: ${new Date().toLocaleDateString()}`,
        margin,
        290
      );
    }

    doc.save('Plutus_Lending_Assessment.pdf');
  };

  return (
    <div ref={reportRef} className="mt-10 space-y-0">
      <div className={`p-5 rounded-t-2xl border ${getRiskBg(decisionLine)} flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4`}>
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">AI Lending Assessment</p>
          <p className={`text-2xl font-bold ${getRiskColor(decisionLine)}`}>{decisionLine}</p>
        </div>
        <button
          onClick={handleExportPDF}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-violet-500/40 bg-violet-500/10 text-violet-300 text-sm font-semibold hover:bg-violet-500/20 transition-all"
        >
          ⬇ Export PDF Report
        </button>
      </div>

      <div className="grid grid-cols-2 border-x border-white/10 bg-white/[0.02]">
        {[
          { label: 'Decision Tree', value: `${(treeProb * 100).toFixed(1)}%`, sub: ml_results?.decision_tree?.risk },
          { label: 'Default Probability', value: `${(avgProb * 100).toFixed(1)}%`, sub: avgProb >= 0.5 ? 'High' : avgProb >= 0.2 ? 'Medium' : 'Low' },
        ].map(({ label, value, sub }) => (
          <div key={label} className="p-4 text-center border-r border-white/10 last:border-r-0">
            <p className="text-xs text-slate-500 mb-1">{label}</p>
            <p className="text-xl font-bold text-white">{value}</p>
            <p className={`text-xs font-semibold ${getRiskColor(sub)}`}>{sub}</p>
          </div>
        ))}
      </div>

      {report && (
        <div className="p-6 sm:p-8 rounded-b-2xl border border-t-0 border-white/10 bg-white/[0.02] space-y-1">

          {agent_error && (
            <div className="mb-4 px-4 py-3 rounded-lg border border-yellow-500/30 bg-yellow-500/10 text-yellow-300 text-xs">
              ⚠ Agent warning: {agent_error}. Showing fallback report.
            </div>
          )}

          <Section title="Borrower Profile Summary" icon="👤">
            {report.borrower_profile_summary}
          </Section>

          <Section title="Credit Risk Analysis" icon="📊">
            {report.credit_risk_analysis}
          </Section>

          <Section title="Recommended Lending Decision" icon="⚖️">
            <span className={`font-bold ${getRiskColor(decisionLine)}`}>{decisionLine}. </span>
            {report.recommended_lending_decision.replace(decisionLine + '.', '').trim()}
          </Section>

          <Section title="Risk Mitigation Suggestions" icon="🛡">
            <ul className="space-y-1.5 mt-1">
              {(report.risk_mitigation_suggestions ?? []).map((s, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-violet-400 font-bold shrink-0">{i + 1}.</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Supporting References" icon="📚">
            <div className="flex flex-wrap gap-2 mt-1">
              {(report.supporting_references ?? []).map((ref, i) => (
                <span key={i} className="px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-medium">
                  {ref}
                </span>
              ))}
            </div>
          </Section>

          <div className="pt-4 mt-4 border-t border-white/10">
            <p className="text-xs text-slate-500 leading-relaxed italic">
              ⚠ {report.legal_and_ethical_disclaimers}
            </p>
          </div>

        </div>
      )}

      <CreditChat assessment={assessment} />
    </div>
  );
};

export default LendingAssessment;
