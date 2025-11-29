import React from 'react';
import { WorkflowStatus } from '../types';
import { CheckCircle2, Loader2, Circle } from 'lucide-react';

interface ProgressBarProps {
  status: WorkflowStatus;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ status }) => {
  const isVisualActive = status === WorkflowStatus.GENERATING_IMAGES;
  const isSocialActive = status === WorkflowStatus.GENERATING_SOCIAL;
  const isStoryActive = status === WorkflowStatus.GENERATING_STORY;
  const isComplete = status === WorkflowStatus.COMPLETED;

  const steps = [
    { 
      id: 'input', 
      label: 'Seed Input', 
      status: 'done' 
    },
    { 
      id: 'story', 
      label: 'Story Agent', 
      status: isStoryActive ? 'active' : (isSocialActive || isVisualActive || isComplete) ? 'done' : 'waiting' 
    },
    { 
      id: 'social', 
      label: 'Social Agent', 
      status: isSocialActive ? 'active' : (isVisualActive || isComplete) ? 'done' : 'waiting' 
    },
    { 
      id: 'visual', 
      label: 'Visual Agent', 
      status: isVisualActive ? 'active' : isComplete ? 'done' : 'waiting' 
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex items-center justify-between relative px-2">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-slate-200 -z-10"></div>
        
        {steps.map((step, idx) => (
          <div key={step.id} className="flex flex-col items-center bg-slate-50 px-2 min-w-[80px]">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-all duration-500 z-10
              ${step.status === 'done' ? 'bg-green-500 text-white scale-110' : 
                step.status === 'active' ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 scale-110' : 
                'bg-slate-200 text-slate-400 border-2 border-slate-50'}
            `}>
              {step.status === 'done' && <CheckCircle2 size={16} />}
              {step.status === 'active' && <Loader2 size={16} className="animate-spin" />}
              {step.status === 'waiting' && <Circle size={16} />}
            </div>
            <span className={`text-xs font-medium whitespace-nowrap ${step.status === 'waiting' ? 'text-slate-400' : 'text-slate-700'}`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};