/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
// import { Dashboard } from "@/components/Dashboard";
// import { Button } from "@/components/ui/button";
import DynamicRenderer from "@/components/DynamicRenderer";
import SandpackIDE from "@/components/sandpack-ide/SandpackIDE";
import { messageService } from "@/lib/message-service";
import "@/lib/window-types";
import { Loader2 } from "lucide-react";

function App() {
  const [renderMode, setRenderMode] = useState<'default' | 'dynamic' | 'ide'>('default');

  useEffect(() => {
    // Check URL parameters for mode
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');

    if (mode === 'ide') {
      setRenderMode('ide');
      return;
    }

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

  if (renderMode === 'default') {
    return (
      <div className='flex-grow flex items-center justify-center h-full text-muted-foreground'>
        {Loader2 && <Loader2 className="h-6 w-6 mr-2 animate-spin" />}
        Carregando dados...
      </div>
    );
  } else if (renderMode === 'ide') {
    return <SandpackIDE />;
  } else {
    return <DynamicRenderer />;
  }
}

export default App;
