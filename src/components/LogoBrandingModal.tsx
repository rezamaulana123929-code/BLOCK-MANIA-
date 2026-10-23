import React, { useState } from 'react';
import { 
  X, Download, Eye, Smartphone, Layout, Sparkles, 
  Crown, Palette, Check, Layers, Share2, ZoomIn 
} from 'lucide-react';

interface LogoBrandingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LOGO_SRC = '/src/assets/images/block_mania_logo_1792684222092.jpg';

type PreviewMode = 'raw' | 'android' | 'ios' | 'splash' | 'social';

export const LogoBrandingModal: React.FC<LogoBrandingModalProps> = ({ isOpen, onClose }) => {
  const [previewMode, setPreviewMode] = useState<PreviewMode>('raw');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'specs'>('preview');

  if (!isOpen) return null;

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = LOGO_SRC;
    a.download = 'BLOCK_MANIA_Game_Logo_3D_1x1.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const copyBrandSpecs = () => {
    const specs = `BLOCK MANIA — Mobile Game Identity Specs:
• Primary Typography: BLOCK (Golden Yellow #FBBF24 to Vivid Orange #F97316), MANIA (Electric Cyan #06B6D4 to Royal Blue #2563EB)
• 3D Accents: Metallic Polished Gold Crown (#F59E0B) with Ruby & Emerald Jewels
• Puzzle Blocks: 3D Glossy Candy Finish (Fuchsia, Neon Emerald, Amber, Cyan, Ruby)
• Background: Royal Navy Gradient (#0a1128 to #1e3a8a) with Cinematic Studio Ambient Lighting
• Canvas Ratio: 1:1 Perfect Square (Optimized for Android Adaptive Icon, Splash Screen, & Web)`;
    navigator.clipboard.writeText(specs);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-900 border-2 border-cyan-500/40 rounded-3xl shadow-2xl shadow-cyan-950/80 overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-400/50 text-amber-300">
              <Crown className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-game tracking-wider bg-gradient-to-r from-amber-300 via-orange-300 to-cyan-300 bg-clip-text text-transparent">
                BLOCK MANIA BRAND IDENTITY
              </h2>
              <p className="text-xs text-slate-400">
                Official 1:1 3D Mobile Game Icon & Splash Visuals
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white transition-all shadow-md shadow-cyan-900/50 cursor-pointer"
              title="Download 1:1 High-Res Logo"
            >
              <Download className="w-4 h-4" />
              <span>Download 1:1</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-slate-950/60 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                activeTab === 'preview' 
                  ? 'bg-blue-600/30 text-cyan-300 border border-cyan-500/40' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Icon Simulator
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                activeTab === 'specs' 
                  ? 'bg-blue-600/30 text-cyan-300 border border-cyan-500/40' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              Design & Palette Specs
            </button>
          </div>

          {activeTab === 'preview' && (
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setPreviewMode('raw')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer ${
                  previewMode === 'raw' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                1:1 Raw Square
              </button>
              <button
                onClick={() => setPreviewMode('android')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer ${
                  previewMode === 'android' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Android Squircle
              </button>
              <button
                onClick={() => setPreviewMode('ios')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer ${
                  previewMode === 'ios' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Play Store / App Icon
              </button>
              <button
                onClick={() => setPreviewMode('splash')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer ${
                  previewMode === 'splash' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Splash Screen
              </button>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'preview' ? (
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-2">
              {/* Preview Canvas Area */}
              <div className="relative flex items-center justify-center min-w-[280px] sm:min-w-[340px] p-6 bg-slate-950/80 rounded-2xl border border-slate-800">
                {previewMode === 'raw' && (
                  <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-900/50 border-2 border-cyan-400/30 group">
                    <img 
                      src={LOGO_SRC} 
                      alt="BLOCK MANIA 3D Logo 1:1" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 bg-slate-950/70 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-mono text-cyan-300 border border-cyan-500/30">
                      1:1 • 2048×2048 Native
                    </div>
                  </div>
                )}

                {previewMode === 'android' && (
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative w-56 h-56 rounded-[28%] overflow-hidden shadow-2xl shadow-blue-900/60 border-2 border-white/20 bg-slate-900">
                      <img 
                        src={LOGO_SRC} 
                        alt="BLOCK MANIA Android Icon" 
                        className="w-full h-full object-cover scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-300">
                      Android Adaptive Squircle
                    </span>
                  </div>
                )}

                {previewMode === 'ios' && (
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative w-56 h-56 rounded-[22.5%] overflow-hidden shadow-2xl shadow-blue-900/60 border-2 border-white/20 bg-slate-900">
                      <img 
                        src={LOGO_SRC} 
                        alt="BLOCK MANIA App Store Icon" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-300">
                      Google Play / iOS App Icon
                    </span>
                  </div>
                )}

                {previewMode === 'splash' && (
                  <div className="relative w-52 h-80 rounded-3xl overflow-hidden border-4 border-slate-700 bg-gradient-to-b from-[#0a1128] via-[#0d1e4c] to-[#12285a] shadow-2xl flex flex-col items-center justify-center p-4">
                    <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-xl border border-cyan-400/40 animate-pulse-glow">
                      <img 
                        src={LOGO_SRC} 
                        alt="BLOCK MANIA Splash" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="mt-6 flex flex-col items-center gap-1.5 w-full">
                      <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-400 to-cyan-400 w-3/4 animate-pulse"></div>
                      </div>
                      <span className="text-[10px] text-cyan-300 font-mono tracking-widest uppercase">
                        Loading Blocks...
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Details & Specs Card */}
              <div className="flex flex-col gap-4 max-w-md w-full">
                <div className="bg-slate-800/70 p-4 rounded-2xl border border-slate-700/80">
                  <h3 className="text-sm font-bold font-game text-amber-300 flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Creative Direction & Visual Highlights
                  </h3>
                  <ul className="text-xs text-slate-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span><strong>Chunky 3D Typography:</strong> "BLOCK" in glossy gold-orange bevels; "MANIA" in vivid electric cyan and neon blue.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span><strong>Imperial 3D Golden Crown:</strong> Sits atop the lockup with polished reflections and ruby jewel accents.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span><strong>Isometric Puzzle Backdrop:</strong> Rounded dark navy grid board with floating 3D candy puzzle blocks in all 4 quadrants.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span><strong>Icon Ready:</strong> Generous safe margin padding ensures zero clipping inside Android or iOS launcher masks.</span>
                    </li>
                  </ul>
                </div>

                {/* Color Swatches */}
                <div className="bg-slate-800/70 p-4 rounded-2xl border border-slate-700/80">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Official Color Palette
                  </h4>
                  <div className="grid grid-cols-5 gap-2">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-amber-300 to-orange-500 shadow-md border border-amber-200"></div>
                      <span className="text-[10px] text-slate-300 font-mono">BLOCK</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-cyan-300 to-blue-600 shadow-md border border-cyan-200"></div>
                      <span className="text-[10px] text-slate-300 font-mono">MANIA</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-yellow-300 to-amber-600 shadow-md border border-yellow-200"></div>
                      <span className="text-[10px] text-slate-300 font-mono">CROWN</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-emerald-300 to-green-600 shadow-md border border-emerald-200"></div>
                      <span className="text-[10px] text-slate-300 font-mono">NEON</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-blue-950 to-slate-900 shadow-md border border-blue-500/30"></div>
                      <span className="text-[10px] text-slate-300 font-mono">NAVY</span>
                    </div>
                  </div>
                </div>

                {/* Action Row */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownload}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 font-bold text-sm text-slate-950 shadow-lg shadow-orange-950/60 transition cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    Save Full 1:1 Image
                  </button>
                  <button
                    onClick={copyBrandSpecs}
                    className="flex items-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition cursor-pointer"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                    <span>{copied ? 'Copied!' : 'Copy Specs'}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Detailed Specifications Tab */
            <div className="space-y-4 max-w-2xl mx-auto py-2">
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
                <h3 className="text-base font-bold text-amber-300 font-game mb-2">Design Concept & Philosophy</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The <strong>BLOCK MANIA</strong> identity was crafted as an original, instantly recognizable mobile game brand that evokes the high-energy delight of classic casual block puzzles with premium contemporary 3D toy-like tactile aesthetics.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/70">
                  <h4 className="font-bold text-cyan-300 mb-1">Typography Architecture</h4>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Custom 3D chunky block lettering with deep beveled extrusion, glossy specular highlights, and thick navy shadow outline for maximum legibility at miniature icon scales (32px up to 2048px).
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/70">
                  <h4 className="font-bold text-amber-300 mb-1">Golden Crown Emblem</h4>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Metallic gold crown with embedded rubies and emeralds, establishing clear game mechanics around score mastery, combo achievements, and reaching the Emperor Crown Tier.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/70">
                  <h4 className="font-bold text-emerald-300 mb-1">Toy-Like Gem Blocks</h4>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Candy-coated vibrant puzzle pieces framing the layout in purple, yellow, neon green, electric blue, and ruby orange with sub-surface scatter and rim glows.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/70">
                  <h4 className="font-bold text-indigo-300 mb-1">Target Application Usage</h4>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Designed specifically for Google Play Store icon requirements, Android adaptive icons, splash screens, Web App PWA manifests, and social media avatars.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
