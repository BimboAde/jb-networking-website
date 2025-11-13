'use client';
import { useCallback, useEffect, useRef } from 'react';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cloudinary?: any;
  }
}

type CloudinaryUploadProps = {
  value?: string | null;
  onChange: (val: { url: string; width?: number | null; height?: number | null; publicId?: string }) => void;
  folder?: string;
  label?: string;
  buttonClassName?: string;
  previewClassName?: string;
};

export function CloudinaryUpload({ value, onChange, folder = 'jbns/uploads', label = 'Upload Image', buttonClassName, previewClassName }: CloudinaryUploadProps) {
  const loadingRef = useRef(false);

  const ensureScript = useCallback(async () => {
    if (window.cloudinary) return;
    await new Promise<void>((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://upload-widget.cloudinary.com/latest/global/all.js';
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => reject();
      document.body.appendChild(s);
    });
  }, []);

  const open = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    try {
      await ensureScript();
      const sigRes = await fetch('/api/v1/uploads/cloudinary', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ folder }),
      });
      if (!sigRes.ok) return;
      const { cloudName, apiKey, signature, timestamp } = await sigRes.json();
      const widget = window.cloudinary!.createUploadWidget(
        {
          cloudName,
          apiKey,
          uploadSignature: signature,
          uploadSignatureTimestamp: timestamp,
          folder,
          sources: ['local', 'camera', 'url', 'image_search', 'dropbox', 'google_drive'],
          multiple: false,
          cropping: false,
          showPoweredBy: false,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (_error: unknown, result: any) => {
          if (result?.event === 'success') {
            const info = result.info;
            onChange({
              url: info.secure_url,
              width: info.width || null,
              height: info.height || null,
              publicId: info.public_id,
            });
          }
        }
      );
      widget.open();
    } finally {
      loadingRef.current = false;
    }
  }, [ensureScript, folder, onChange]);

  useEffect(() => {
    // lazy-load script on mount for faster first use
    ensureScript().catch(() => {});
  }, [ensureScript]);

  return (
    <div className="flex items-center gap-4">
      <button type="button" onClick={open} className={buttonClassName || 'px-4 py-2 bg-brand-green text-white rounded hover:bg-brand-light-green'}>
        {label}
      </button>
      {value ? (
        <div className={previewClassName || 'relative h-14 w-20 rounded overflow-hidden ring-1 ring-gray-200'}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Preview" className="h-full w-full object-cover" />
        </div>
      ) : (
        <span className="text-sm text-gray-600">No image selected</span>
      )}
    </div>
  );
}


