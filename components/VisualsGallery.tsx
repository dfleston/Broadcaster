import React from 'react';
import { Image as ImageIcon, Download } from 'lucide-react';

interface VisualsGalleryProps {
  images: string[];
  isVisible: boolean;
}

export const VisualsGallery: React.FC<VisualsGalleryProps> = ({ images, isVisible }) => {
  if (!isVisible || !images || images.length === 0) return null;

  return (
    <div className={`mt-8 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-700 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 hidden'}`}>
      <div className="bg-fuchsia-50 border-b border-fuchsia-100 p-4 flex items-center gap-3">
        <div className="bg-fuchsia-100 text-fuchsia-600 p-1.5 rounded-md">
          <ImageIcon size={18} />
        </div>
        <h3 className="font-semibold text-fuchsia-900">Agent 3 Output: Visual Comic Strip</h3>
      </div>
      
      <div className="p-6 md:p-8">
        <p className="text-sm text-slate-500 mb-4">
          Generated visual panels optimized for Instagram Carousel format (1:1 aspect ratio).
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {images.map((imgSrc, index) => (
            <div key={index} className="group relative aspect-square bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
              <img 
                src={imgSrc} 
                alt={`Comic Panel ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end justify-between p-3 opacity-0 group-hover:opacity-100">
                <span className="bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                  Panel {index + 1}
                </span>
                <a 
                  href={imgSrc} 
                  download={`story-panel-${index + 1}.png`}
                  className="bg-white text-slate-900 p-1.5 rounded-md hover:bg-slate-100 transition-colors shadow-sm"
                  title="Download Image"
                >
                  <Download size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};