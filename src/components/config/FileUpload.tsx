import React, { useState } from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';

interface FileUploadProps {
  label: string;
  onFileSelect: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ label, onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validar tipo de archivo
      const validTypes = ['image/png', 'image/jpeg', 'image/svg+xml'];
      if (!validTypes.includes(file.type)) {
        setError('Solo se permiten archivos .png, .jpg y .svg');
        return;
      }

      // Validar tamaño del archivo (máximo 1MB)
      const maxSizeInBytes = 1 * 1024 * 1024; // 1MB
      if (file.size > maxSizeInBytes) {
        setError('El archivo no debe pesar más de 1MB');
        return;
      }

      setSelectedFile(file);
      setError(null);
      onFileSelect(file);

      // Crear URL de previsualización
      const fileUrl = URL.createObjectURL(file);
      console.log('fileUrl:', fileUrl);
      setPreviewUrl(fileUrl);

      // Enviar archivo al backend
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });
        const data = await response.json();
        console.log('Archivo subido:', data.filePath);
      } catch (error) {
        console.error('Error al subir el archivo:', error);
        setError('Error al subir el archivo');
      }
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
  };

  return (
    <Card className="file-upload p-4 border border-gray-300 rounded-md shadow-sm">
      <label className="file-upload-label block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <Input 
        type="file" 
        accept=".png,.jpg,.jpeg,.svg" 
        onChange={handleFileChange} 
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        placeholder='Haga clic para cargar su archivo'
      />
      {selectedFile && <p className="mt-2 text-sm text-gray-600">Archivo seleccionado: {selectedFile.name}</p>}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {previewUrl && (
        <CardContent className="relative mt-4 w-fit">
          <p className="text-sm text-gray-600">Previsualización:</p>
          <div className="relative">
            <Image width={150} height={150} src={previewUrl} alt="Previsualización" className="mt-2 max-w-full h-auto border border-gray-300 rounded-md" />
            <Button 
              onClick={handleRemoveFile} 
              className="absolute top-0 h-6 w-6 text-lg right-0 mt-2 mr-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-700 focus:outline-none"
            >
              &times;
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default FileUpload;