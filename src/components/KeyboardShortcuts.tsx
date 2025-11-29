import { Card } from "@/components/ui/card";
import { Keyboard } from "lucide-react";

export const KeyboardShortcuts = () => {
  const shortcuts = [
    { key: "Space", action: "Play / Pause" },
    { key: "← / →", action: "Skip 5s backward / forward" },
    { key: "↑ / ↓", action: "Volume up / down" },
    { key: "+ / -", action: "Speed up / down (0.25x)" },
    { key: "M", action: "Mute / Unmute" },
  ];

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Keyboard className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">Keyboard Shortcuts</h2>
      </div>
      
      <div className="space-y-3">
        {shortcuts.map(({ key, action }) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">{action}</span>
            <kbd className="px-3 py-1 bg-secondary border border-border rounded text-xs font-mono text-foreground">
              {key}
            </kbd>
          </div>
        ))}
      </div>
    </Card>
  );
};
