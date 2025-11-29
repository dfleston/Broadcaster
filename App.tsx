import React, { useState } from 'react';
import { WorkflowStatus, SocialContent } from './types';
import { generateStoryFromSeed, repurposeForSocial, generateVisuals } from './services/geminiService';
import { InputSection } from './components/InputSection';
import { StoryCard } from './components/StoryCard';
import { SocialDashboard } from './components/SocialDashboard';
import { VisualsGallery } from './components/VisualsGallery';
import { ProgressBar } from './components/ProgressBar';
import { Boxes } from 'lucide-react';

const App: React.FC = () => {
  const [seed, setSeed] = useState<string>('');
  const [story, setStory] = useState<string>('');
  const [socialContent, setSocialContent] = useState<SocialContent | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [status, setStatus] = useState<WorkflowStatus>(WorkflowStatus.IDLE);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!seed.trim()) return;

    // Reset previous results
    setStory('');
    setSocialContent(null);
    setImages([]);
    setError(null);
    setStatus(WorkflowStatus.GENERATING_STORY);

    try {
      // Step 1: Generate Story
      const generatedStory = await generateStoryFromSeed(seed);
      setStory(generatedStory);
      
      // Step 2: Generate Social Content
      setStatus(WorkflowStatus.GENERATING_SOCIAL);
      const socialData = await repurposeForSocial(generatedStory);
      setSocialContent(socialData);

      // Step 3: Generate Visuals (Comic Strip)
      setStatus(WorkflowStatus.GENERATING_IMAGES);
      const generatedImages = await generateVisuals(generatedStory);
      setImages(generatedImages);

      setStatus(WorkflowStatus.COMPLETED);

    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred in the workflow.");
      setStatus(WorkflowStatus.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-indigo-600 text-white p-1.5 rounded-lg">
              <Boxes size={24} />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              StoryStream ADK
            </h1>
          </div>
          <div className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            Powered by Gemini 2.5 Flash
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 md:px-6 py-10">
        
        {/* Progress Indicator */}
        <ProgressBar status={status} />

        {/* Input Agent */}
        <InputSection 
          seed={seed} 
          setSeed={setSeed} 
          status={status} 
          onGenerate={handleGenerate} 
        />

        {/* Error State */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center justify-center animate-fade-in">
            <p>{error}</p>
          </div>
        )}

        {/* Agent 1 Output: Story */}
        <StoryCard 
          story={story} 
          isVisible={status !== WorkflowStatus.IDLE && status !== WorkflowStatus.GENERATING_STORY} 
        />

        {/* Agent 2 Output: Social Media */}
        <SocialDashboard 
          content={socialContent} 
          isVisible={status === WorkflowStatus.GENERATING_IMAGES || status === WorkflowStatus.COMPLETED} 
        />

        {/* Agent 3 Output: Visuals */}
        <VisualsGallery 
          images={images}
          isVisible={status === WorkflowStatus.COMPLETED}
        />
        
      </main>
    </div>
  );
};

export default App;