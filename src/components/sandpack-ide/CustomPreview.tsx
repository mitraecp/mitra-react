import React, { useEffect, useRef, useState } from 'react';
import { useSandpack } from '@codesandbox/sandpack-react';

interface CustomPreviewProps {
  className?: string;
  style?: React.CSSProperties;
}

export const CustomPreview: React.FC<CustomPreviewProps> = ({ className, style }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { sandpack } = useSandpack();
  const { files } = sandpack;
  const [loading, setLoading] = useState(true);
  const [key, setKey] = useState(Date.now());

  // Função para gerar o HTML básico
  const generateHtml = () => {
    // Obter o conteúdo do HTML principal
    let htmlContent = files['/index.html']?.code || `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Preview</title>
        </head>
        <body>
          <div id="root">
            <h1>Preview</h1>
            <p>Edite o código para ver as alterações.</p>
          </div>
        </body>
      </html>
    `;

    // Inserir os estilos no HTML
    const styleTags = [];

    // Adicionar todos os arquivos CSS como estilos
    Object.keys(files).forEach(path => {
      if (path.endsWith('.css')) {
        const content = files[path].code;
        const styleId = path.replace(/[^\w]/g, '_');
        styleTags.push(`<style id="${styleId}">${content}</style>`);
      }
    });

    // Inserir os estilos antes do </head>
    htmlContent = htmlContent.replace('</head>', `${styleTags.join('\n')}\n</head>`);

    return htmlContent;
  };

  // Função para atualizar o preview
  const updatePreview = () => {
    if (iframeRef.current) {
      setLoading(true);
      
      try {
        // Gerar o HTML básico
        const html = generateHtml();
        
        // Criar um Blob com o HTML
        const blob = new Blob([html], { type: 'text/html' });
        
        // Criar uma URL para o Blob
        const url = URL.createObjectURL(blob);
        
        // Atualizar o src do iframe
        iframeRef.current.src = url;
        
        // Limpar a URL quando o iframe carregar
        iframeRef.current.onload = () => {
          URL.revokeObjectURL(url);
          setLoading(false);
        };
        
        // Se houver erro ao carregar, mostrar o erro
        iframeRef.current.onerror = (error) => {
          console.error('Erro ao carregar o preview:', error);
          setLoading(false);
        };
      } catch (error) {
        console.error('Erro ao gerar o preview:', error);
        setLoading(false);
      }
    }
  };

  // Atualizar o preview quando os arquivos mudarem ou a chave mudar
  useEffect(() => {
    updatePreview();
  }, [key]);

  // Função para forçar a atualização do preview
  const refreshPreview = () => {
    setKey(Date.now());
  };

  return (
    <div className={`relative w-full h-full ${className || ''}`} style={style}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <div className="text-gray-200">Carregando preview...</div>
          </div>
        </div>
      )}
      <div className="w-full h-full">
        <iframe
          ref={iframeRef}
          className="w-full h-full border-0"
          title="Preview"
          sandbox="allow-scripts allow-modals allow-forms allow-same-origin allow-popups"
        />
      </div>
      <div className="absolute top-2 right-2">
        <button
          onClick={refreshPreview}
          className="bg-gray-700 text-white p-2 rounded hover:bg-gray-600 focus:outline-none"
          title="Refresh Preview"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 4v6h-6"></path>
            <path d="M1 20v-6h6"></path>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"></path>
            <path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
