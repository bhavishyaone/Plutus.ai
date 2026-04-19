import React, { useRef } from 'react';
import CreditChat from './CreditChat';

const getRiskColor = (risk) => {
  if (!risk) return 'text-slate-400';
  const r = risk.toLowerCase();
  if (r.includes('high') || r.includes('decline')) return 'text-red-400';
  if (r.includes('medium') || r.includes('conditional')) return 'text-yellow-400';
  return 'text-green-400';
};


