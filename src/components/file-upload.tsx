"use client";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/server/uploadthing"; // Ensure correct import for your UploadThing setup
import type { UploadResponse } from "@/server/uploadthing"; // Adjust this import based on your actual response type

interface FileUploadProps {
  onChange: (urls: string[]) => void;
}

export function FileUpload({ onChange }: FileUploadProps): JSX.Element {
  const handleUploadComplete = (res: UploadResponse[]): void => {
    onChange(res.map(({ url }) => url));
  };

  const handleUploadError = (error: Error): void => {
    console.error("Upload error:", error);
  };

  return (
    <UploadButton<OurFileRouter, UploadResponse>
      endpoint="bountyAttachment"
      onClientUploadComplete={handleUploadComplete}
      onUploadError={handleUploadError}
    />
  );
}