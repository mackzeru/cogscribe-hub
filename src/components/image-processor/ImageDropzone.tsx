import { useCallback } from "react";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface ImageDropzoneProps {
  onFileSelect: (file: File) => void;
  className?: string;
}

export const ImageDropzone = ({ onFileSelect, className = "" }: ImageDropzoneProps) => {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        onFileSelect(file);
        toast.success("Image uploaded successfully");
      } else {
        toast.error("Please upload a valid image file");
      }
    },
    [onFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleClick = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        if (!file.type.startsWith("image/")) {
          toast.error("Please upload a valid image file");
          return;
        }
        onFileSelect(file);
        toast.success("Image uploaded successfully");
      }
    };
    input.click();
  }, [onFileSelect]);

  return (
    <div
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-primary hover:bg-accent/50 ${className}`}
    >
      <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
      <p className="text-sm font-medium mb-1">Drag and drop your image here</p>
      <p className="text-xs text-muted-foreground">or click to browse</p>
    </div>
  );
};
