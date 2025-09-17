import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileText, X, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  status: "uploading" | "processed" | "error";
  progress?: number;
}

interface DocumentUploadProps {
  onFileUpload: (files: File[]) => Promise<void>;
  supportedFormats?: string[];
}

export const DocumentUpload = ({ 
  onFileUpload, 
  supportedFormats = [".pdf", ".docx", ".txt", ".md", ".html", ".xlsx", ".csv"] 
}: DocumentUploadProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const validateFile = (file: File): boolean => {
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    return supportedFormats.includes(fileExtension);
  };

  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return;

    const validFiles: File[] = [];
    const invalidFiles: string[] = [];

    Array.from(files).forEach(file => {
      if (validateFile(file)) {
        validFiles.push(file);
      } else {
        invalidFiles.push(file.name);
      }
    });

    if (invalidFiles.length > 0) {
      toast({
        title: "Unsupported file format",
        description: `These files are not supported: ${invalidFiles.join(", ")}. Supported formats: ${supportedFormats.join(", ")}`,
        variant: "destructive",
      });
    }

    if (validFiles.length === 0) return;

    // Add files to upload list
    const newFiles: UploadedFile[] = validFiles.map(file => ({
      id: `${file.name}-${Date.now()}`,
      name: file.name,
      size: file.size,
      status: "uploading",
      progress: 0,
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    try {
      // Simulate upload progress
      for (const newFile of newFiles) {
        for (let progress = 0; progress <= 100; progress += 25) {
          await new Promise(resolve => setTimeout(resolve, 200));
          setUploadedFiles(prev => 
            prev.map(f => 
              f.id === newFile.id 
                ? { ...f, progress }
                : f
            )
          );
        }
      }

      await onFileUpload(validFiles);

      // Mark as processed
      setUploadedFiles(prev => 
        prev.map(f => 
          newFiles.some(nf => nf.id === f.id)
            ? { ...f, status: "processed", progress: 100 }
            : f
        )
      );

      toast({
        title: "Files uploaded successfully",
        description: `${validFiles.length} file(s) have been processed and added to the knowledge base.`,
      });

    } catch (error) {
      // Mark as error
      setUploadedFiles(prev => 
        prev.map(f => 
          newFiles.some(nf => nf.id === f.id)
            ? { ...f, status: "error" }
            : f
        )
      );

      toast({
        title: "Upload failed",
        description: "There was an error processing your files. Please try again.",
        variant: "destructive",
      });
    }
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card 
        className={`p-8 border-2 border-dashed transition-colors cursor-pointer ${
          isDragOver 
            ? "border-primary bg-primary/5" 
            : "border-border hover:border-primary/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <div className="text-center space-y-4">
          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
          <div>
            <h3 className="text-lg font-semibold">Upload documents</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Upload Confluence pages, SharePoint documents, training materials, or other documentation
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Supported formats: {supportedFormats.join(", ")}
            </p>
          </div>
          <Button variant="secondary" size="lg">
            Choose Files
          </Button>
        </div>
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={supportedFormats.join(",")}
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
        aria-label="Select files to upload"
      />

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Uploaded Files</h3>
          {uploadedFiles.map((file) => (
            <Card key={file.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  
                  {/* Status Indicator */}
                  <div className="flex items-center space-x-2">
                    {file.status === "uploading" && (
                      <>
                        <div className="w-16 bg-secondary rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${file.progress || 0}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {file.progress}%
                        </span>
                      </>
                    )}
                    
                    {file.status === "processed" && (
                      <div className="flex items-center space-x-1 text-success">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-xs">Processed</span>
                      </div>
                    )}
                    
                    {file.status === "error" && (
                      <div className="flex items-center space-x-1 text-destructive">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-xs">Error</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(file.id);
                  }}
                  className="ml-2"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove {file.name}</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};