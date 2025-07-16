/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, lazy, Suspense } from 'react';
// import { Dashboard } from "@/components/Dashboard";
// import { Button } from "@/components/ui/button";
import { messageService } from "@/lib/message-service";
import "@/lib/window-types";
// import { Loader2 } from "lucide-react";
import { SideBarFull } from '@/components/TesteMitra';

// Lazy load do DynamicRenderer para evitar carregar bibliotecas pesadas desnecessariamente
const DynamicRenderer = lazy(() => import("@/components/DynamicRenderer"));

function App() {
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

      // Enviar mensagem de que estamos prontos
      messageService.sendMessage('READY', null, null, { timestamp: Date.now()} as any);
    }
  }, []);

  return <SideBarFull />;
}

export default App;
