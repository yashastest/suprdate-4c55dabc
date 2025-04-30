
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Camera, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PhotoUploadProps {
  photos: string[];
  onPhotosChange: (photos: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export function PhotoUpload({ photos, onPhotosChange, onNext, onBack }: PhotoUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const MAX_PHOTOS = 5;
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };
  
  const handleFiles = (files: FileList) => {
    const remainingSlots = MAX_PHOTOS - photos.length;
    if (remainingSlots <= 0) return;
    
    const filesToProcess = Array.from(files).slice(0, remainingSlots);
    
    filesToProcess.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onPhotosChange([...photos, e.target.result.toString()]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  
  const removePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    onPhotosChange(newPhotos);
  };
  
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="text-center">
        <h2 className="text-2xl font-bold gradient-text">Add Your Photos</h2>
        <p className="text-muted-foreground mt-2">Add 3-5 photos to create your profile</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mt-6">
        {photos.map((photo, index) => (
          <div key={index} className="relative aspect-[3/4]">
            <img 
              src={photo} 
              alt={`Photo ${index + 1}`} 
              className="w-full h-full object-cover rounded-xl"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 rounded-full"
              onClick={() => removePhoto(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        
        {photos.length < MAX_PHOTOS && (
          <Card
            className={cn(
              "aspect-[3/4] flex flex-col items-center justify-center border-dashed border-2 cursor-pointer hover:border-primary transition-colors rounded-xl",
              isDragging ? "border-primary bg-primary/5" : "border-muted"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('photo-upload')?.click()}
          >
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
            <Plus className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">Add Photo</p>
          </Card>
        )}
      </div>
      
      <div className="pt-4 text-center text-sm text-muted-foreground">
        <Camera className="inline h-4 w-4 mr-1" />
        <span>Photos should clearly show your face</span>
      </div>
      
      <div className="flex justify-between gap-4 mt-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1"
        >
          Back
        </Button>
        <Button
          className="gradient-bg hover:opacity-90 flex-1"
          onClick={onNext}
          disabled={photos.length < 3}
        >
          {photos.length < 3 ? `Add ${3 - photos.length} More` : "Continue"}
        </Button>
      </div>
    </div>
  );
}
