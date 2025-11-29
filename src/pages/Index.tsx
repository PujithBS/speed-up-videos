import { useState } from "react";
import { VideoPlayer } from "@/components/VideoPlayer";
import { SpeedSlider } from "@/components/SpeedSlider";
import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gauge, Sparkles, Zap, Clock, Settings } from "lucide-react";

const Index = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-mesh opacity-30 pointer-events-none"></div>
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-background/50 pointer-events-none"></div>

      {/* Header */}
      <header className="relative border-b border-border/50 bg-card/30 backdrop-blur-xl sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary blur-lg opacity-50"></div>
                <div className="relative w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                  <Gauge className="w-7 h-7 text-primary-foreground" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Video Speed Controller
                </h1>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Ultra-precise playback control
                </p>
              </div>
            </div>

            <input
              type="file"
              id="video-upload"
              accept="video/*"
              onChange={handleFileInput}
              className="hidden"
            />
            <Button
              onClick={() => document.getElementById('video-upload')?.click()}
              className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-glow"
            >
              Load Video
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          {/* Video Section */}
          <div className="space-y-6">
            <VideoPlayer videoUrl={videoUrl} />

            {/* Speed Control Card */}
            <Card className="p-8 bg-card/50 backdrop-blur-xl border-border/50 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-primary opacity-10 blur-3xl rounded-full"></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
                    <Settings className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Speed Control</h2>
                </div>
                <SpeedSlider speed={playbackSpeed} onSpeedChange={setPlaybackSpeed} />
              </div>
            </Card>

            {/* Features Stats */}
            <div className="grid sm:grid-cols-3 gap-4">
              <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-glow group">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-primary text-2xl font-bold">0.25x - 12x</div>
                    <div className="text-sm text-muted-foreground">Speed Range</div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-glow group">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-secondary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-primary text-2xl font-bold">48</div>
                    <div className="text-sm text-muted-foreground">Speed Steps</div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-glow group">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                    <Clock className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-primary text-2xl font-bold">0.25x</div>
                    <div className="text-sm text-muted-foreground">Precision</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <KeyboardShortcuts />
            
            <Card className="p-6 bg-gradient-to-br from-card via-card to-card/50 border-border/50 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-secondary opacity-20 blur-2xl rounded-full"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground text-lg">Features</h3>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2 group">
                    <span className="text-primary mt-0.5 group-hover:scale-125 transition-transform">▸</span>
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                      Ultra-wide speed range from 0.25x to 12x
                    </span>
                  </li>
                  <li className="flex items-start gap-2 group">
                    <span className="text-primary mt-0.5 group-hover:scale-125 transition-transform">▸</span>
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                      48 precise speed steps (0.25x intervals)
                    </span>
                  </li>
                  <li className="flex items-start gap-2 group">
                    <span className="text-primary mt-0.5 group-hover:scale-125 transition-transform">▸</span>
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                      Quick preset buttons for common speeds
                    </span>
                  </li>
                  <li className="flex items-start gap-2 group">
                    <span className="text-primary mt-0.5 group-hover:scale-125 transition-transform">▸</span>
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                      Keyboard shortcuts for efficient control
                    </span>
                  </li>
                  <li className="flex items-start gap-2 group">
                    <span className="text-primary mt-0.5 group-hover:scale-125 transition-transform">▸</span>
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                      Real-time speed visualization
                    </span>
                  </li>
                  <li className="flex items-start gap-2 group">
                    <span className="text-primary mt-0.5 group-hover:scale-125 transition-transform">▸</span>
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                      Smooth playback adjustments
                    </span>
                  </li>
                </ul>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-primary/5 via-card to-card border-primary/30 shadow-glow">
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  Speed Guide
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-400 font-medium">0.25x - 0.75x</span>
                    <span className="text-muted-foreground">Slow Motion</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-medium">1.0x</span>
                    <span className="text-muted-foreground">Normal Speed</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-400 font-medium">1.25x - 1.75x</span>
                    <span className="text-muted-foreground">Fast</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-orange-400 font-medium">2.0x - 3.75x</span>
                    <span className="text-muted-foreground">Very Fast</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-red-400 font-medium">4.0x - 12x</span>
                    <span className="text-muted-foreground">Extreme Speed</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
