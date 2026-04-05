"use client";

import { useState, useRef, useCallback } from "react";
import { Camera, XIcon, Upload, ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface PetPhotoUploadProps {
  currentPhotoUrl?: string | null;
  onFileSelected: (file: File) => void;
  onRemove?: () => void;
  isUploading?: boolean;
  previewOnly?: boolean;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function PetPhotoUpload({
  currentPhotoUrl,
  onFileSelected,
  onRemove,
  isUploading = false,
  previewOnly = false,
}: PetPhotoUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const displayUrl = preview ?? currentPhotoUrl ?? null;

  const validateAndProcess = useCallback(
    (file: File) => {
      setError(null);

      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError("Please upload a JPG, PNG, or WebP image.");
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setError("Image must be under 5MB.");
        return;
      }

      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      onFileSelected(file);
    },
    [onFileSelected]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndProcess(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) validateAndProcess(file);
  };

  const handleRemove = () => {
    setPreview(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
    onRemove?.();
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`relative w-36 h-36 rounded-[2rem] border-4 transition-all overflow-hidden ${
          dragActive
            ? "border-[#F4D06F] bg-[#F4D06F]/20 scale-105 shadow-[6px_6px_0px_#4A3B32]"
            : displayUrl
            ? "border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32]"
            : "border-dashed border-[#4A3B32]/30 bg-[#FFF9F2] hover:border-[#4A3B32]/60"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        {displayUrl ? (
          <>
            <Image
              src={displayUrl}
              alt="Pet photo"
              fill
              className="object-cover"
              unoptimized={preview !== null}
            />
            {isUploading && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            {!previewOnly && !isUploading && (
              <motion.button
                type="button"
                onClick={handleRemove}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-1.5 right-1.5 bg-[#E88D72] text-white w-7 h-7 rounded-full border-2 border-[#4A3B32] shadow-[2px_2px_0px_#4A3B32] flex items-center justify-center"
              >
                <XIcon className="w-4 h-4" strokeWidth={3} />
              </motion.button>
            )}
          </>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="w-full h-full flex flex-col items-center justify-center gap-2 cursor-pointer group"
          >
            <AnimatePresence mode="wait">
              {dragActive ? (
                <motion.div
                  key="drop"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                >
                  <Upload className="w-8 h-8 text-[#F4D06F]" strokeWidth={3} />
                </motion.div>
              ) : (
                <motion.div
                  key="camera"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="flex flex-col items-center gap-1"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#4A3B32]/10 flex items-center justify-center group-hover:bg-[#F4D06F]/30 transition-colors">
                    <Camera className="w-7 h-7 text-[#4A3B32]/40 group-hover:text-[#4A3B32]/70" strokeWidth={2.5} />
                  </div>
                  <span className="text-[10px] font-bold text-[#4A3B32]/40 uppercase tracking-wider">
                    Upload
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        )}
      </div>

      {!displayUrl && !previewOnly && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-1.5 text-xs font-bold text-[#4A3B32]/50 hover:text-[#4A3B32] transition-colors"
        >
          <ImageIcon className="w-3.5 h-3.5" />
          Choose photo
        </button>
      )}

      {displayUrl && !previewOnly && !isUploading && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-1.5 text-xs font-bold text-[#4A3B32]/50 hover:text-[#4A3B32] transition-colors"
        >
          <Camera className="w-3.5 h-3.5" />
          Change photo
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && (
        <p className="text-xs font-bold text-[#E88D72] bg-[#E88D72]/10 px-3 py-1 rounded-full border-2 border-[#E88D72]">
          {error}
        </p>
      )}
    </div>
  );
}
