'use client'

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@radix-ui/react-label';
import Image from 'next/image';
import { Card } from '../ui/card';
import { useDispatch, useSelector } from 'react-redux';
import { setLogoUrl } from '@/redux/features/account/accountSlice';

export default function ImageUploader({ label }: { label: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const dispatch = useDispatch();
  const experience = useSelector((state: any) => state.account.company);

  useEffect(() => {
    const storedImageUrl = JSON.parse(localStorage.getItem('logoUrl') || '{}');
    if (storedImageUrl) {
      setImagePreview(storedImageUrl.url);
      fetch(storedImageUrl.url)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
          setFile(file);
        });
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage('Por favor selecciona una imagen');
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('company', experience.name)
      formData.append('image', file);

      const response = await fetch('/api/images/upload', {
        method: 'POST',
        body: formData,
      });

      const responseText = await response.text();

      let data;
      try {
        data = JSON.parse(responseText);
        dispatch(setLogoUrl(data.url));
        localStorage.setItem('logoUrl', JSON.stringify({ url: data.url }));
      } catch (parseError) {
        throw new Error(`Failed to parse server response: ${responseText}`);
      }

      if (response.ok) {
        setMessage('Imagen cargada exitosamente: ' + data.message);
      } else {
        setMessage('Error al cargar la imagen: ' + (data.message || 'Error desconocido'));
      }
    } catch (error: any) {
      setMessage('Error: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-row-reverse gap-12 items-center justify-end">
      <div className='flex flex-col gap-2.5 '>
        <Label htmlFor="file">{label}</Label>
        <Input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          disabled={uploading}
          className='bg-white'
        />
        <Button onClick={handleSubmit} type="submit" disabled={uploading}>
          {uploading ? 'Cargando...' : 'Subir Imagen'}
        </Button>

        {message && (
          <Alert className="mt-4">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
      </div>
      <div className='flex flex-col gap-2'>
        <Label className='font-medium'>Vista previa de su logo</Label>
        <Card className='p-4 h-42 w-48'>
          {imagePreview ? (
            <div style={{ flex: 1, textAlign: 'center' }}>
              <Image width={150} height={150} src={imagePreview} alt="Vista previa" style={{ maxWidth: '100%' }} />
            </div>
          ) : (
            <div className='h-36 w-40 flex items-center justify-center text-gray-400'>
              <p style={{ flex: 1, textAlign: 'center' }}>Aquí verá su logo cuando lo cargue</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}