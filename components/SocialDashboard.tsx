import React from 'react';
import { SocialContent } from '../types';
import { Twitter, Instagram, Youtube, Copy, Check } from 'lucide-react';

interface SocialDashboardProps {
  content: SocialContent | null;
  isVisible: boolean;
}

export const SocialDashboard: React.FC<SocialDashboardProps> = ({ content, isVisible }) => {
  if (!isVisible || !content) return null;

  return (
    <div className={`mt-8 space-y-6 transition-all duration-700 delay-200 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 hidden'}`}>
      <div className="flex items-center gap-3 mb-2">
        <div className="h-px bg-slate-200 flex-1"></div>
        <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Agent 2 Output: Multi-Channel</span>
        <div className="h-px bg-slate-200 flex-1"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* X / Twitter Card */}
        <SocialCard 
          icon={<Twitter size={20} />} 
          title="X (Twitter)" 
          colorClass="bg-black text-white" 
          content={content.twitter}
        />

        {/* Instagram Card */}
        <SocialCard 
          icon={<Instagram size={20} />} 
          title="Instagram" 
          colorClass="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 text-white" 
          content={content.instagram}
        />

        {/* YouTube Card */}
        <SocialCard 
          icon={<Youtube size={20} />} 
          title="YouTube" 
          colorClass="bg-red-600 text-white" 
          content={content.youtube}
        />
      </div>
    </div>
  );
};

const SocialCard: React.FC<{ icon: React.ReactNode; title: string; colorClass: string; content: string }> = ({ 
  icon, title, colorClass, content 
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
      <div className={`${colorClass} p-3 flex items-center justify-between`}>
        <div className="flex items-center gap-2 font-semibold">
          {icon}
          <span>{title}</span>
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap flex-1">
          {content}
        </p>
        <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end">
          <button 
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-indigo-600 transition-colors"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
};