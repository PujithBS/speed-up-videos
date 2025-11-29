import { useState } from "react";
import { VideoPlayer } from "@/components/VideoPlayer";
import { UploadZone } from "@/components/UploadZone";
import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";
import { Gauge } from "lucide-react";

const Index = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleVideoSelect = (file: File) => {
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
              <Gauge className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Video Speed Controller
              </h1>
              <p className="text-sm text-muted-foreground">
                Control playback speed with precision
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          {/* Video Section */}
          <div className="space-y-6">
            {!videoUrl ? (
              <UploadZone onVideoSelect={handleVideoSelect} />
            ) : (
              <>
                <VideoPlayer videoUrl={videoUrl} />
                <div className="flex justify-center">
                  <button
                    onClick={() => setVideoUrl(null)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Upload a different video
                  </button>
                </div>
              </>
            )}

            {/* Features */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="text-primary text-2xl font-bold mb-1">0.25x - 3x</div>
                <div className="text-sm text-muted-foreground">Speed Range</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="text-primary text-2xl font-bold mb-1">10+</div>
                <div className="text-sm text-muted-foreground">Speed Presets</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="text-primary text-2xl font-bold mb-1">5+</div>
                <div className="text-sm text-muted-foreground">Shortcuts</div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <KeyboardShortcuts />
            
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-3">Features</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Custom playback speeds from 0.25x to 3x</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>10 quick speed presets for instant changes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Full keyboard control for efficiency</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Drag & drop video upload</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Fullscreen mode support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Volume and progress controls</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
