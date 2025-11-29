import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Gauge, Zap } from "lucide-react";

interface SpeedSliderProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
}

const SPEED_MIN = 0.25;
const SPEED_MAX = 12;
const SPEED_STEP = 0.25;

export const SpeedSlider = ({ speed, onSpeedChange }: SpeedSliderProps) => {
  const handleChange = (value: number[]) => {
    onSpeedChange(value[0]);
  };

  const getSpeedColor = (speed: number) => {
    if (speed < 1) return "text-blue-400";
    if (speed === 1) return "text-primary";
    if (speed < 2) return "text-yellow-400";
    if (speed < 4) return "text-orange-400";
    return "text-red-400";
  };

  const getSpeedLabel = (speed: number) => {
    if (speed < 1) return "Slow";
    if (speed === 1) return "Normal";
    if (speed < 2) return "Fast";
    if (speed < 4) return "Very Fast";
    return "Extreme";
  };

  const getGlowIntensity = (speed: number) => {
    // Normalize speed to 0-1 range (0.25 to 12)
    const normalized = (speed - SPEED_MIN) / (SPEED_MAX - SPEED_MIN);
    const intensity = Math.min(normalized * 1.5, 1); // Cap at 1 for max glow
    
    return {
      blur: `${20 + intensity * 40}px`,
      opacity: 0.3 + intensity * 0.5,
    };
  };

  return (
    <div className="relative">
      {/* Main Speed Display */}
      <div className="flex items-center justify-center mb-8">
        <div className="relative">
          <div 
            className="absolute inset-0 bg-gradient-primary animate-pulse-glow transition-all duration-500"
            style={{
              filter: `blur(${getGlowIntensity(speed).blur})`,
              opacity: getGlowIntensity(speed).opacity,
            }}
          ></div>
          <div 
            className="relative bg-card/50 backdrop-blur-xl border-2 rounded-3xl px-12 py-8 transition-all duration-500"
            style={{
              borderColor: `hsl(189 94% 55% / ${0.2 + getGlowIntensity(speed).opacity * 0.5})`,
              boxShadow: `0 0 ${30 + getGlowIntensity(speed).opacity * 60}px hsl(189 94% 55% / ${getGlowIntensity(speed).opacity}), 0 0 ${60 + getGlowIntensity(speed).opacity * 100}px hsl(189 94% 55% / ${getGlowIntensity(speed).opacity * 0.6})`,
            }}
          >
            <div className="flex items-center gap-4">
              <Zap className={cn("w-12 h-12", getSpeedColor(speed))} />
              <div>
                <div className={cn("text-6xl font-bold tabular-nums", getSpeedColor(speed))}>
                  {speed.toFixed(2)}x
                </div>
                <div className="text-muted-foreground text-sm font-medium mt-1">
                  {getSpeedLabel(speed)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-primary" />
            <span className="text-foreground font-medium">Playback Speed</span>
          </div>
          <div className="text-muted-foreground">
            {SPEED_MIN}x - {SPEED_MAX}x
          </div>
        </div>

        {/* Custom Styled Slider */}
        <div className="relative py-6">
          <Slider
            value={[speed]}
            min={SPEED_MIN}
            max={SPEED_MAX}
            step={SPEED_STEP}
            onValueChange={handleChange}
            className="relative"
          />
          
          {/* Speed Markers */}
          <div className="flex justify-between mt-3 px-1">
            {[0.25, 0.5, 1, 2, 4, 8, 12].map((marker) => (
              <button
                key={marker}
                onClick={() => onSpeedChange(marker)}
                className={cn(
                  "text-xs font-medium transition-all duration-200 hover:scale-110",
                  Math.abs(speed - marker) < 0.01
                    ? "text-primary scale-110"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {marker}x
              </button>
            ))}
          </div>
        </div>

        {/* Quick Presets */}
        <div className="grid grid-cols-6 gap-2">
          {[0.5, 0.75, 1, 1.5, 2, 3].map((preset) => (
            <button
              key={preset}
              onClick={() => onSpeedChange(preset)}
              className={cn(
                "py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200",
                "border hover:scale-105",
                Math.abs(speed - preset) < 0.01
                  ? "bg-primary text-primary-foreground border-primary shadow-glow"
                  : "bg-secondary/50 text-foreground border-border hover:bg-secondary hover:border-primary/50"
              )}
            >
              {preset}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
