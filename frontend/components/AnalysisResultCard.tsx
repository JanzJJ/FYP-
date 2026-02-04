
import React from 'react';
import { AnalysisResult } from '../types';

interface AnalysisResultCardProps {
  result: AnalysisResult;
  onReset: () => void;
}

const AnalysisResultCard: React.FC<AnalysisResultCardProps> = ({ result, onReset }) => {
  return (
    <div className="bg-surface-light dark:bg-surface-dark p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-all animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-display font-bold">AI Analysis Results</h2>
        <span className={`text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest ${result.riskLevel === 'HIGH' ? 'bg-rose-100 text-rose-600' :
          result.riskLevel === 'MEDIUM' ? 'bg-amber-100 text-amber-600' :
            result.riskLevel === 'CLEAR' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
          }`}>
          Risk: {result.riskLevel}
        </span>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">analytics</span>
            Detected Conditions
          </h3>
          <div className="space-y-6">
            {result.matches.map((match, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span>{match.name}</span>
                  <span className={idx === 0 ? "text-primary" : "text-slate-400"}>
                    {match.confidence}%
                  </span>
                </div>
                <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${idx === 0 ? "bg-primary" : "bg-slate-300"}`}
                    style={{ width: `${match.confidence}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-500">medical_services</span>
            Recommended Actions
          </h3>
          <ul className="space-y-3 text-slate-600 dark:text-slate-400 text-sm list-none">
            {result.careAdvice.map((advice, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="w-5 h-5 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold">{idx + 1}</span>
                {advice}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button className="bg-primary text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95">
            Nearest Clinic
          </button>
          <button
            onClick={onReset}
            className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 font-bold py-4 rounded-2xl transition-all hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95"
          >
            Scan Another
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResultCard;
