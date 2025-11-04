import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Loader2 } from "lucide-react";
import imageCompression from "browser-image-compression";
import { toast } from "sonner";
import { ImageDropzone } from "@/components/image-processor/ImageDropzone";
import { ImagePreview } from "@/components/image-processor/ImagePreview";

type ImageFormat = "jpeg" | "png" | "webp" | "gif";

const ImageProcessor = () => {
  const [processing, setProcessing] = useState(false);

  // Tab 1: Resizer
  const [resizerFile, setResizerFile] = useState<File | null>(null);
  const [resizerPreview, setResizerPreview] = useState<string | null>(null);
  const [resizerProcessed, setResizerProcessed] = useState<string | null>(null);
  const [resizerProcessedSize, setResizerProcessedSize] = useState<number | null>(null);
  const [resizerFormat, setResizerFormat] = useState<ImageFormat>("jpeg");
  const [targetSize, setTargetSize] = useState<number>(1);

  // Tab 2: Converter
  const [converterFile, setConverterFile] = useState<File | null>(null);
  const [converterPreview, setConverterPreview] = useState<string | null>(null);
  const [converterProcessed, setConverterProcessed] = useState<string | null>(null);
  const [converterProcessedSize, setConverterProcessedSize] = useState<number | null>(null);
  const [converterFormat, setConverterFormat] = useState<ImageFormat>("webp");

  // Tab 3: Combined
  const [combinedFile, setCombinedFile] = useState<File | null>(null);
  const [combinedPreview, setCombinedPreview] = useState<string | null>(null);
  const [combinedProcessed, setCombinedProcessed] = useState<string | null>(null);
  const [combinedProcessedSize, setCombinedProcessedSize] = useState<number | null>(null);
  const [combinedFormat, setCombinedFormat] = useState<ImageFormat>("jpeg");
  const [targetWidth, setTargetWidth] = useState<number>(1920);
  const [targetHeight, setTargetHeight] = useState<number>(1080);
  const [combinedTargetSize, setCombinedTargetSize] = useState<number>(1);

  const handleResizerFileSelect = (file: File) => {
    setResizerFile(file);
    setResizerProcessed(null);
    setResizerProcessedSize(null);
    const url = URL.createObjectURL(file);
    setResizerPreview(url);
  };

  const handleConverterFileSelect = (file: File) => {
    setConverterFile(file);
    setConverterProcessed(null);
    setConverterProcessedSize(null);
    const url = URL.createObjectURL(file);
    setConverterPreview(url);
  };

  const handleCombinedFileSelect = (file: File) => {
    setCombinedFile(file);
    setCombinedProcessed(null);
    setCombinedProcessedSize(null);
    const url = URL.createObjectURL(file);
    setCombinedPreview(url);
  };

  const downloadImage = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Tab 1: Resize to target file size
  const handleResize = async () => {
    if (!resizerFile) {
      toast.error("Please upload an image first");
      return;
    }

    setProcessing(true);
    try {
      const targetSizeKB = targetSize * 1024; // Convert MB to KB
      
      const options = {
        maxSizeMB: targetSize,
        maxWidthOrHeight: 4096,
        useWebWorker: true,
        fileType: `image/${resizerFormat}`,
        initialQuality: 0.9,
      };

      const compressedFile = await imageCompression(resizerFile, options);
      
      const processedUrl = URL.createObjectURL(compressedFile);
      setResizerProcessed(processedUrl);
      setResizerProcessedSize(compressedFile.size);
      
      if (compressedFile.size > targetSizeKB * 1024) {
        toast.warning(`Achieved ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB (target: ${targetSize}MB)`);
      } else {
        toast.success(`Resized to ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`);
      }

      const filename = `resized_${resizerFile.name.split('.')[0]}.${resizerFormat}`;
      downloadImage(compressedFile, filename);
    } catch (error) {
      console.error("Resize error:", error);
      toast.error("Failed to resize image");
    } finally {
      setProcessing(false);
    }
  };

  // Tab 2: Convert format
  const handleConvert = async () => {
    if (!converterFile) {
      toast.error("Please upload an image first");
      return;
    }

    setProcessing(true);
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = URL.createObjectURL(converterFile);
      });

      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const processedUrl = URL.createObjectURL(blob);
            setConverterProcessed(processedUrl);
            setConverterProcessedSize(blob.size);
            
            const filename = `converted_${converterFile.name.split('.')[0]}.${converterFormat}`;
            downloadImage(blob, filename);
            toast.success(`Converted to ${converterFormat.toUpperCase()}`);
          }
          setProcessing(false);
        },
        `image/${converterFormat}`,
        0.95
      );
    } catch (error) {
      console.error("Convert error:", error);
      toast.error("Failed to convert image");
      setProcessing(false);
    }
  };

  // Tab 3: Combined resize and convert
  const handleCombinedProcess = async () => {
    if (!combinedFile) {
      toast.error("Please upload an image first");
      return;
    }

    setProcessing(true);
    try {
      // First, resize dimensions
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = URL.createObjectURL(combinedFile);
      });

      canvas.width = targetWidth;
      canvas.height = targetHeight;
      ctx?.drawImage(img, 0, 0, targetWidth, targetHeight);

      // Convert to blob
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob(
          (blob) => resolve(blob!),
          `image/${combinedFormat}`,
          0.95
        );
      });

      // Then compress to target size
      const file = new File([blob], `temp.${combinedFormat}`, { type: `image/${combinedFormat}` });
      
      const options = {
        maxSizeMB: combinedTargetSize,
        maxWidthOrHeight: Math.max(targetWidth, targetHeight),
        useWebWorker: true,
        fileType: `image/${combinedFormat}`,
        initialQuality: 0.9,
      };

      const compressedFile = await imageCompression(file, options);
      
      const processedUrl = URL.createObjectURL(compressedFile);
      setCombinedProcessed(processedUrl);
      setCombinedProcessedSize(compressedFile.size);
      
      const filename = `processed_${combinedFile.name.split('.')[0]}.${combinedFormat}`;
      downloadImage(compressedFile, filename);
      
      toast.success(
        `Processed: ${targetWidth}x${targetHeight}, ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`
      );
    } catch (error) {
      console.error("Combined process error:", error);
      toast.error("Failed to process image");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Image Resizer and Converter</CardTitle>
          <CardDescription>
            Process your images with advanced resizing, conversion, and optimization tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="resize" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="resize">Image Resizer</TabsTrigger>
              <TabsTrigger value="convert">Image Converter</TabsTrigger>
              <TabsTrigger value="combined">Resize & Convert</TabsTrigger>
            </TabsList>

            {/* Tab 1: Image Resizer */}
            <TabsContent value="resize" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div>
                  <Label>Upload Image</Label>
                  <div className="mt-2">
                    <ImageDropzone onFileSelect={handleResizerFileSelect} />
                    {resizerFile && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {resizerFile.name} ({(resizerFile.size / 1024 / 1024).toFixed(2)}MB)
                      </p>
                    )}
                  </div>
                </div>

                {resizerPreview && (
                  <div className="grid grid-cols-2 gap-4">
                    <ImagePreview 
                      title="Original Image" 
                      imageUrl={resizerPreview} 
                      fileSize={resizerFile?.size}
                    />
                    {resizerProcessed && (
                      <ImagePreview 
                        title="Processed Image" 
                        imageUrl={resizerProcessed}
                        fileSize={resizerProcessedSize || undefined}
                      />
                    )}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="resize-format">Output Format</Label>
                    <Select value={resizerFormat} onValueChange={(v) => setResizerFormat(v as ImageFormat)}>
                      <SelectTrigger id="resize-format">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jpeg">JPG</SelectItem>
                        <SelectItem value="png">PNG</SelectItem>
                        <SelectItem value="webp">WEBP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="target-size">Target Size (MB)</Label>
                    <Select value={targetSize.toString()} onValueChange={(v) => setTargetSize(Number(v))}>
                      <SelectTrigger id="target-size">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.5">0.5 MB</SelectItem>
                        <SelectItem value="1">1 MB</SelectItem>
                        <SelectItem value="2">2 MB</SelectItem>
                        <SelectItem value="5">5 MB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={handleResize} disabled={!resizerFile || processing} className="w-full">
                  {processing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Resize & Download
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>

            {/* Tab 2: Image Converter */}
            <TabsContent value="convert" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div>
                  <Label>Upload Image</Label>
                  <div className="mt-2">
                    <ImageDropzone onFileSelect={handleConverterFileSelect} />
                    {converterFile && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {converterFile.name}
                      </p>
                    )}
                  </div>
                </div>

                {converterPreview && (
                  <div className="grid grid-cols-2 gap-4">
                    <ImagePreview 
                      title="Original Image" 
                      imageUrl={converterPreview}
                      fileSize={converterFile?.size}
                    />
                    {converterProcessed && (
                      <ImagePreview 
                        title="Converted Image" 
                        imageUrl={converterProcessed}
                        fileSize={converterProcessedSize || undefined}
                      />
                    )}
                  </div>
                )}

                <div>
                  <Label htmlFor="converter-format">Output Format</Label>
                  <Select value={converterFormat} onValueChange={(v) => setConverterFormat(v as ImageFormat)}>
                    <SelectTrigger id="converter-format">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jpeg">JPG</SelectItem>
                      <SelectItem value="png">PNG</SelectItem>
                      <SelectItem value="webp">WEBP</SelectItem>
                      <SelectItem value="gif">GIF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleConvert} disabled={!converterFile || processing} className="w-full">
                  {processing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Convert & Download
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>

            {/* Tab 3: Resize & Convert */}
            <TabsContent value="combined" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div>
                  <Label>Upload Image</Label>
                  <div className="mt-2">
                    <ImageDropzone onFileSelect={handleCombinedFileSelect} />
                    {combinedFile && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {combinedFile.name}
                      </p>
                    )}
                  </div>
                </div>

                {combinedPreview && (
                  <div className="grid grid-cols-2 gap-4">
                    <ImagePreview 
                      title="Original Image" 
                      imageUrl={combinedPreview}
                      fileSize={combinedFile?.size}
                    />
                    {combinedProcessed && (
                      <ImagePreview 
                        title="Processed Image" 
                        imageUrl={combinedProcessed}
                        fileSize={combinedProcessedSize || undefined}
                      />
                    )}
                  </div>
                )}

                <div>
                  <Label htmlFor="combined-format">Output Format</Label>
                  <Select value={combinedFormat} onValueChange={(v) => setCombinedFormat(v as ImageFormat)}>
                    <SelectTrigger id="combined-format">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jpeg">JPG</SelectItem>
                      <SelectItem value="png">PNG</SelectItem>
                      <SelectItem value="webp">WEBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="width">Width (px)</Label>
                    <Input
                      id="width"
                      type="number"
                      value={targetWidth}
                      onChange={(e) => setTargetWidth(Number(e.target.value))}
                      min={1}
                    />
                  </div>

                  <div>
                    <Label htmlFor="height">Height (px)</Label>
                    <Input
                      id="height"
                      type="number"
                      value={targetHeight}
                      onChange={(e) => setTargetHeight(Number(e.target.value))}
                      min={1}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="combined-size">Maximum File Size (MB)</Label>
                  <Input
                    id="combined-size"
                    type="number"
                    value={combinedTargetSize}
                    onChange={(e) => setCombinedTargetSize(Number(e.target.value))}
                    min={0.1}
                    step={0.1}
                  />
                </div>

                <Button onClick={handleCombinedProcess} disabled={!combinedFile || processing} className="w-full">
                  {processing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Convert and Resize
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageProcessor;
