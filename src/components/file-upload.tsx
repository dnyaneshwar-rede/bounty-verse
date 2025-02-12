// components/file-upload.tsx
"use client";
import { UploadButton } from "@uploadthing/react";

// Define the expected response type from the upload
interface UploadResponse {
  url: string;
}

// Define the expected input type for the upload
interface UploadInput {
  // Define the properties that your upload input should have
  file: File; // Example property, adjust according to your needs
}

export function FileUpload({
  onChange,
}: {
  onChange: (urls: string[]) => void;
}) {
  const handleUploadComplete = (res: UploadResponse[]) => {
    onChange(res.map((file) => file.url));
  };

  const handleUploadError = (error: Error) => {
    console.error("Upload error:", error);
  };

  return (
    <UploadButton<UploadInput, UploadResponse>
      endpoint="bountyAttachment"
      onClientUploadComplete={handleUploadComplete}
      onUploadError={handleUploadError}
    />
  );
}