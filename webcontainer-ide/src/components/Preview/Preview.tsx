import { useEffect, useRef } from 'react';
import './Preview.css';

interface PreviewProps {
  url?: string;
  loading?: boolean;
}

const Preview = ({ url, loading = false }: PreviewProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Atualizar o iframe quando a URL mudar
    if (iframeRef.current && url) {
      iframeRef.current.src = url;
    }
  }, [url]);

  return (
    <div className="preview-container">
      {loading ? (
        <div className="preview-loading">
          <div className="spinner"></div>
          <p>Carregando visualização...</p>
        </div>
      ) : url ? (
        <iframe
          ref={iframeRef}
          className="preview-iframe"
          src={url}
          title="Preview"
          sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
          allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone; midi; payment; vr; xr-spatial-tracking"
        ></iframe>
      ) : (
        <div className="preview-placeholder">
          <p>Nenhuma visualização disponível</p>
          <p className="preview-hint">
            Execute um servidor para visualizar sua aplicação
          </p>
        </div>
      )}
    </div>
  );
};

export default Preview;
