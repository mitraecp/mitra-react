import { useEffect, useState } from 'react';
// import { Dashboard } from "@/components/Dashboard";
// import { Button } from "@/components/ui/button";
import DynamicRenderer from "@/components/DynamicRenderer";
import { messageService } from "@/lib/message-service";
import "@/lib/window-types";
import { Loader2 } from "lucide-react";

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

      // Adicionar listener para mensagens RENDER_COMPONENT
      messageService.addListener('RENDER_COMPONENT', (code, componentData) => {
        // Atualizar a variável global componentData
        if (componentData) {
          window.componentData = componentData;
          console.log('Dados do componente recebidos:', window.componentData);
        }

        // Se o code for uma string, é código de componente
        if (typeof code === 'string') {
          console.log('Código de componente recebido');
        }
      });
    }

    // Enviar mensagem de que estamos prontos
    if (isInIframe) {
      messageService.sendMessage('READY', null, null, { timestamp: Date.now() });
    }


  }, []);

  return renderMode === 'default' ? (
    <div className='flex-grow flex items-center justify-center h-full text-muted-foreground'>
    {Loader2 && <Loader2 className="h-6 w-6 mr-2 animate-spin" />}
    Carregando dados...
 </div>
  ) : (
    <DynamicRenderer />
  );
}

export default App;
