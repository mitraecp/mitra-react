import React from 'react';
import { ImageRoot, Image, ImageFallback } from '@/components/ui/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export const ImageExample: React.FC = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Imagem com Fallback</CardTitle>
        </CardHeader>
        <CardContent>
          <ImageRoot className="w-full h-48 rounded-md overflow-hidden">
            <Image 
              src="https://images.unsplash.com/photo-1682687982501-1e58ab814714" 
              alt="Exemplo de imagem"
              fallback={
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              }
            />
          </ImageRoot>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Imagem com Erro</CardTitle>
        </CardHeader>
        <CardContent>
          <ImageRoot className="w-full h-48 rounded-md overflow-hidden">
            <Image 
              src="https://invalid-url-that-will-fail.jpg" 
              alt="Imagem com erro"
              fallback={
                <ImageFallback>
                  <span className="text-muted-foreground">Imagem não disponível</span>
                </ImageFallback>
              }
            />
          </ImageRoot>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Imagem Responsiva</CardTitle>
        </CardHeader>
        <CardContent>
          <ImageRoot className="w-full h-48 rounded-md overflow-hidden">
            <Image 
              src="https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=500&auto=format&fit=crop" 
              alt="Imagem responsiva"
              className="object-cover"
              fallback={
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              }
            />
          </ImageRoot>
        </CardContent>
      </Card>
    </div>
  );
};
