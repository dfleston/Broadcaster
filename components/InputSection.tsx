import React from 'react';
import { WorkflowStatus } from '../types';
import { Sparkles, Send } from 'lucide-react';

interface InputSectionProps {
  seed: string;
  setSeed: (seed: string) => void;
  status: WorkflowStatus;
  onGenerate: () => void;
}

export const InputSection: React.FC<InputSectionProps> = ({ seed, setSeed, status, onGenerate }) => {
  const isProcessing = status === WorkflowStatus.GENERATING_STORY || status === WorkflowStatus.GENERATING_SOCIAL;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 transition-all duration-300">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
          <Sparkles size={20} />
        </div>
        <h2 className="text-xl font-semibold text-slate-800">Step 1: The Spark</h2>
      </div>
      
      <p className="text-slate-500 mb-4 text-sm">
        Enter a rough idea, a concept, or a "what if" scenario. Our agents will take it from here.
      </p>

      <textarea
        value={seed}
        onChange={(e) => setSeed(e.target.value)}
        placeholder="e.g., A robot who discovers it loves gardening on Mars..."
        className="w-full h-32 p-4 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all resize-none text-slate-700 placeholder:text-slate-400 outline-none"
        disabled={isProcessing}
      />

      <div className="mt-4 flex justify-end">
        <button
          onClick={onGenerate}
          disabled={!seed.trim() || isProcessing}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all transform active:scale-95
            ${!seed.trim() || isProcessing 
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg'}
          `}
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </span>
          ) : (
            <>
              Launch Workflow
              <Send size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};