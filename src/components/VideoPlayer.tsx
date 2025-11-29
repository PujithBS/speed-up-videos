import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize,
  Upload,
  Gauge
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  videoUrl: string | null;
}

const SPEED_PRESETS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3];

export const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const hideControlsTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!videoRef.current) return;

      switch (e.key) {
        case " ":
          e.preventDefault();
          togglePlayPause();
          break;
        case "ArrowLeft":
          e.preventDefault();
          videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
          break;
        case "ArrowRight":
          e.preventDefault();
          videoRef.current.currentTime = Math.min(
            duration,
            videoRef.current.currentTime + 5
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setVolume((v) => Math.min(1, v + 0.1));
          break;
        case "ArrowDown":
          e.preventDefault();
          setVolume((v) => Math.max(0, v - 0.1));
          break;
        case "m":
          e.preventDefault();
          toggleMute();
          break;
        case "+":
        case "=":
          e.preventDefault();
          changeSpeed(0.25);
          break;
        case "-":
          e.preventDefault();
          changeSpeed(-0.25);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [duration]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const changeSpeed = (delta: number) => {
    const newSpeed = Math.max(0.25, Math.min(3, playbackSpeed + delta));
    setPlaybackSpeed(Math.round(newSpeed * 4) / 4);
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }
    hideControlsTimeout.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  if (!videoUrl) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[500px] gap-4 bg-gradient-to-br from-card via-card to-card/50 border border-border rounded-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-50"></div>
        <div className="relative z-10 text-center space-y-3">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-primary flex items-center justify-center shadow-glow-strong animate-pulse">
            <Upload className="w-12 h-12 text-primary-foreground" />
          </div>
          <p className="text-foreground text-xl font-semibold">No Video Loaded</p>
          <p className="text-muted-foreground">Use the controls below to test the speed settings</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative group bg-black rounded-lg overflow-hidden shadow-glow"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full max-h-[70vh] object-contain"
        onClick={togglePlayPause}
      />

      {/* Controls Overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-overlay transition-opacity duration-300",
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Speed Display */}
        <div className="absolute top-4 right-4 bg-card/80 backdrop-blur-md px-4 py-2 rounded-lg border border-border">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Gauge className="w-4 h-4 text-primary" />
            <span className="text-foreground">{playbackSpeed}x</span>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
          {/* Progress Bar */}
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSeek}
            className="cursor-pointer"
          />

          <div className="flex items-center justify-between gap-4">
            {/* Left Controls */}
            <div className="flex items-center gap-3">
              <Button
                size="icon"
                variant="ghost"
                onClick={togglePlayPause}
                className="hover:bg-primary/20 hover:text-primary"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={toggleMute}
                  className="hover:bg-primary/20 hover:text-primary"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </Button>
                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={1}
                  step={0.01}
                  onValueChange={(v) => {
                    setVolume(v[0]);
                    setIsMuted(false);
                  }}
                  className="w-24"
                />
              </div>

              <span className="text-sm text-foreground font-medium">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                  className="hover:bg-primary/20 hover:text-primary font-medium"
                >
                  Speed: {playbackSpeed}x
                </Button>
                
                {showSpeedMenu && (
                  <div className="absolute bottom-full right-0 mb-2 bg-card/95 backdrop-blur-md border border-border rounded-lg p-2 shadow-glow">
                    <div className="grid grid-cols-5 gap-1 min-w-[280px]">
                      {SPEED_PRESETS.map((speed) => (
                        <Button
                          key={speed}
                          size="sm"
                          variant={playbackSpeed === speed ? "default" : "ghost"}
                          onClick={() => {
                            setPlaybackSpeed(speed);
                            setShowSpeedMenu(false);
                          }}
                          className={cn(
                            "text-xs font-medium",
                            playbackSpeed === speed && "bg-primary text-primary-foreground"
                          )}
                        >
                          {speed}x
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Button
                size="icon"
                variant="ghost"
                onClick={handleFullscreen}
                className="hover:bg-primary/20 hover:text-primary"
              >
                <Maximize className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
