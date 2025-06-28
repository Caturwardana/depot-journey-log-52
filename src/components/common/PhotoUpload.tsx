
import React, { useRef, useState } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDocuments } from '@/hooks/useApiData';

interface PhotoUploadProps {
  transportId?: string;
  type: string;
  onUploadSuccess?: () => void;
  className?: string;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({
  transportId,
  type,
  onUploadSuccess,
  className = ""
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { uploadPhoto } = useDocuments();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      if (transportId) {
        await uploadPhoto({ file, transportId, type });
      } else {
        // Handle document upload
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', type);
        // This would use uploadDocument instead
      }
      
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        capture="environment"
      />
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleCameraClick}
        disabled={isUploading}
        className="w-full"
      >
        <Camera className="w-4 h-4 mr-2" />
        {isUploading ? 'Uploading...' : 'Take Photo'}
      </Button>
    </div>
  );
};
