"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Avatar que funciona apenas com fallback para evitar problemas com window.Image
const Avatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = "Avatar"

// Componente de imagem que tenta carregar a imagem de forma segura
const AvatarImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement> & {
    onLoadingStatusChange?: (status: 'idle' | 'loading' | 'loaded' | 'error') => void;
  }
>(({ className, src, alt, onLoadingStatusChange, ...props }, ref) => {
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'loaded' | 'error'>('idle');
  
  React.useEffect(() => {
    if (!src) {
      setStatus('error');
      onLoadingStatusChange?.('error');
      return;
    }
    
    setStatus('loading');
    onLoadingStatusChange?.('loading');
    
    // Criar imagem de forma segura sem usar new Image()
    const img = document.createElement('img');
    
    const handleLoad = () => {
      setStatus('loaded');
      onLoadingStatusChange?.('loaded');
    };
    
    const handleError = () => {
      setStatus('error');
      onLoadingStatusChange?.('error');
    };
    
    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);
    
    img.src = src;
    
    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [src, onLoadingStatusChange]);
  
  if (status !== 'loaded') {
    return null;
  }
  
  return (
    <img
      ref={ref}
      className={cn("aspect-square h-full w-full", className)}
      src={src}
      alt={alt}
      {...props}
    />
  );
});
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = "AvatarFallback"

// Componente composto que gerencia o estado de carregamento
const AvatarWithFallback = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    src?: string;
    alt?: string;
    fallback: React.ReactNode;
  }
>(({ className, src, alt, fallback, ...props }, ref) => {
  const [imageStatus, setImageStatus] = React.useState<'idle' | 'loading' | 'loaded' | 'error'>('idle');
  
  return (
    <Avatar ref={ref} className={className} {...props}>
      {src && (
        <AvatarImage 
          src={src} 
          alt={alt} 
          onLoadingStatusChange={setImageStatus}
        />
      )}
      {(!src || imageStatus === 'error' || imageStatus === 'idle') && (
        <AvatarFallback>{fallback}</AvatarFallback>
      )}
    </Avatar>
  );
});
AvatarWithFallback.displayName = "AvatarWithFallback"

export { Avatar, AvatarImage, AvatarFallback, AvatarWithFallback }
