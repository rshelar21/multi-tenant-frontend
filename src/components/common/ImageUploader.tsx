'use client';
import React, { useState, useRef } from 'react';
import { Button } from '../ui/button';
import { FormLabel, FormMessage } from '../ui/form';
import { Trash, Upload } from 'lucide-react';
import Image from 'next/image';

interface ImageUploaderProps {
  onChange: (e: File | null) => void;
}

const fileSizeLimit = 3 * 1024 * 1024; // 3Mb

export const ImageUploader = ({ onChange }: ImageUploaderProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const file = e.target.files?.[0];
    if (file) {
      if (file.size >= fileSizeLimit) {
        setError('File size should not exceed 3MB');
        return;
      }
      setImage(file);
      setPreview(URL.createObjectURL(file));
      onChange(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
    onChange(null);
  };

  return (
    <div className="w-full">
      <FormLabel className="pb-2 text-base">Product Image</FormLabel>
      {!preview && (
        <div className="border-muted-foreground/25 hover:border-muted-foreground/50 rounded-lg border-2 border-dashed p-4 text-center transition-colors">
          <Upload className="text-muted-foreground mx-auto mb-2 size-6" />
          <p className="text-muted-foreground mb-2 text-sm">
            Click to upload or drag and drop
          </p>
          <p className="text-muted-foreground text-xs">
            PNG, JPG, GIF up to 10MB
          </p>
          <label htmlFor="image-upload" className="inline-block cursor-pointer">
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            <Button
              variant="elevated"
              size="sm"
              type="button"
              className="mt-2"
              onClick={handleButtonClick}
            >
              Choose File
            </Button>
          </label>
        </div>
      )}
      {image && preview && (
        <div className="relative h-48 w-full overflow-hidden rounded-lg transition-all">
          <Image alt={preview} fill src={preview} className="object-cover" />

          <div className="absolute inset-0 z-[999] flex cursor-pointer items-center justify-center bg-[rgba(0,0,0,0.4)] opacity-0 transition-all hover:opacity-100">
            <Button
              onClick={handleRemoveImage}
              className="rounded-full border-red-400 bg-red-100 hover:bg-red-200"
              variant="ghost"
            >
              <Trash className="size-6 text-red-700" />
            </Button>
          </div>
        </div>
      )}
      {error && <FormMessage>{error}</FormMessage>}
    </div>
  );
};
