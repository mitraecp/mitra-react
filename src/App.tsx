import { useEffect, useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { Button } from "@/components/ui/button";
import DynamicRenderer from "@/components/DynamicRenderer";
import { messageService } from "@/lib/message-service";

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
    }

    // Enviar mensagem de que estamos prontos
    if (isInIframe) {
      messageService.sendMessage('READY', { timestamp: Date.now() });
    }
  }, []);

  return (
    <div className="container mx-auto py-10">
      {renderMode === 'default' ? (
        // Renderização padrão quando não estamos em um iframe
        <>
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Visualização de dados com gráficos de barras e área</p>
          </header>

          <Dashboard />

          <div className="mt-8 flex justify-end">
            <Button onClick={() => messageService.sendMessage('LOG', { message: 'Botão clicado' })}>
              Atualizar Dados
            </Button>
          </div>
        </>
      ) : (
        // Renderização dinâmica quando estamos em um iframe
        <DynamicRenderer />
      )}
    </div>
  );
}

export default App;
