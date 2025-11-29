import React from 'react';
import { BookOpen } from 'lucide-react';

interface StoryCardProps {
  story: string;
  isVisible: boolean;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story, isVisible }) => {
  if (!isVisible && !story) return null;

  return (
    <div className={`mt-8 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 hidden'}`}>
      <div className="bg-amber-50 border-b border-amber-100 p-4 flex items-center gap-3">
        <div className="bg-amber-100 text-amber-600 p-1.5 rounded-md">
          <BookOpen size={18} />
        </div>
        <h3 className="font-semibold text-amber-900">Agent 1 Output: The Narrative</h3>
      </div>
      <div className="p-6 md:p-8">
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
          {story}
        </div>
      </div>
    </div>
  );
};