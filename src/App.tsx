/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// import { Dashboard } from "@/components/Dashboard";
// import { Button } from "@/components/ui/button";
import DynamicRenderer from "@/components/DynamicRenderer";
import { TweakCNEditor } from "@/components/TweakCNEditor";
import { messageService } from "@/lib/message-service";
import "@/lib/window-types";
// import { Loader2 } from "lucide-react";

function DefaultView() {
  return (
    <div className='flex-grow flex flex-col items-center justify-center h-full text-muted-foreground gap-4'>
      <h1 className="text-2xl font-bold">MITRA React</h1>
      <div className="flex gap-4">
        <Link to="/tweakcn" className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
          Abrir TweakCN Editor
        </Link>
      </div>
    </div>
  );
}

function IframeApp() {
  const [renderMode, setRenderMode] = useState<'default' | 'dynamic'>('default');

  useEffect(() => {
    // Verificar se estamos em um iframe
    const isInIframe = window !== window.parent;

    if (isInIframe) {
      // Se estamos em um iframe, mudar para o modo dinâmico
      setRenderMode('dynamic');

      // Adicionar listener para mensagens de log
      messageService.addListener('LOG', (payload) => {
        console.log('Log do pai:', payload);
      });

      // Configurar o objeto componentData global
      window.componentData = {};
      window.componentId = {};

      // Adicionar listener para mensagens RENDER_COMPONENT
      messageService.addListener('RENDER_COMPONENT', (code, componentData, componentId) => {
        // Atualizar a variável global componentData
        if (componentData) {
          window.componentData = componentData;
          console.log('Dados do componente recebidos:', window.componentData);
        }
        if (componentId) {
          window.componentId = componentId;
          console.log('ID do componente recebido:', window.componentId);
        }

        // Se o code for uma string, é código de componente
        if (typeof code === 'string') {
          console.log('Código de componente recebido');
        }
      });
    }

    // Enviar mensagem de que estamos prontos
    if (isInIframe) {
      messageService.sendMessage('READY', null, null, { timestamp: Date.now()} as any);
    }


  }, []);

  return renderMode === 'default' ? (
    <DefaultView />
  ) : (
    <DynamicRenderer />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IframeApp />} />
        <Route path="/tweakcn" element={<TweakCNEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
