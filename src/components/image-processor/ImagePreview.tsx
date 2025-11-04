import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ImagePreviewProps {
  title: string;
  imageUrl: string | null;
  fileSize?: number;
}

export const ImagePreview = ({ title, imageUrl, fileSize }: ImagePreviewProps) => {
  if (!imageUrl) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">{title}</CardTitle>
        {fileSize && (
          <p className="text-xs text-muted-foreground">
            Size: {(fileSize / 1024 / 1024).toFixed(2)} MB
          </p>
        )}
      </CardHeader>
      <CardContent>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-auto max-h-64 object-contain rounded-md border"
        />
      </CardContent>
    </Card>
  );
};
