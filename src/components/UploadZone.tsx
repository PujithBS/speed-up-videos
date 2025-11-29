import { useCallback } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  onVideoSelect: (file: File) => void;
}

export const UploadZone = ({ onVideoSelect }: UploadZoneProps) => {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("video/")) {
        onVideoSelect(file);
      }
    },
    [onVideoSelect]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onVideoSelect(file);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={cn(
        "relative border-2 border-dashed border-border rounded-lg p-12",
        "hover:border-primary transition-colors duration-300",
        "cursor-pointer group"
      )}
    >
      <input
        type="file"
        accept="video/*"
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Upload className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">
            Drop your video here
          </h3>
          <p className="text-muted-foreground">
            or click to browse your files
          </p>
          <p className="text-sm text-muted-foreground">
            Supports MP4, WebM, MOV and more
          </p>
        </div>
      </div>
    </div>
  );
};
