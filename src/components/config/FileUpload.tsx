import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@radix-ui/react-label';
import Image from 'next/image';
import { Card } from '../ui/card';

export default function ImageUploader({ label }: { label: string }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!file) {
      setMessage('Por favor selecciona una imagen');
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/images/upload', {
        method: 'POST',
        body: formData,
      });

      const debugInfo = `
        Status: ${response.status}
        StatusText: ${response.statusText}
        Headers: ${JSON.stringify(Object.fromEntries(response.headers))}
      `;

      const responseText = await response.text();

      if (!responseText) {
        throw new Error('Empty response from server');
      }

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        throw new Error(`Failed to parse server response: ${responseText}`);
      }

      if (response.ok) {
        setMessage('Imagen cargada exitosamente: ' + data.message);
      } else {
        setMessage('Error al cargar la imagen: ' + (data.message || 'Unknown error'));
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