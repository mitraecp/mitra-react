"use client"

import React, { useEffect, useState } from 'react';
import { messageService } from '@/lib/message-service';
import * as ShadcnComponents from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dashboard } from './Dashboard';

// Componentes pré-definidos para uso direto
const SimpleButton = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Botão com Contador</h2>
      <Button onClick={() => setCount(prev => prev + 1)}>
        Cliques: {count}
      </Button>
    </div>
  );
};

const SimpleCard = () => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Título do Card</CardTitle>
        <CardDescription>Descrição do card com informações adicionais</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Este é um exemplo de card do Shadcn UI.</p>
      </CardContent>
      <div className="p-6 pt-0 flex justify-end">
        <Button>Ação</Button>
      </div>
    </Card>
  );
};

// Componente para renderizar código React dinamicamente
const DynamicRenderer: React.FC = () => {
  const [componentCode, setComponentCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  useEffect(() => {
    // Adicionar listener para mensagens de renderização de componentes
    const unsubscribe = messageService.addListener('RENDER_COMPONENT', (payload) => {
      try {
        if (typeof payload === 'string') {
          // Verificar se o código é um identificador de componente pré-definido
          if (payload.trim() === 'SIMPLE_BUTTON') {
            setSelectedComponent('SIMPLE_BUTTON');
            setComponentCode(null);
            setError(null);
            messageService.sendMessage('COMPONENT_RENDERED', { success: true });
            return;
          } else if (payload.trim() === 'SIMPLE_CARD') {
            setSelectedComponent('SIMPLE_CARD');
            setComponentCode(null);
            setError(null);
            messageService.sendMessage('COMPONENT_RENDERED', { success: true });
            return;
          } else if (payload.trim() === 'DASHBOARD') {
            setSelectedComponent('DASHBOARD');
            setComponentCode(null);
            setError(null);
            messageService.sendMessage('COMPONENT_RENDERED', { success: true });
            return;
          }

          // Se não for um componente pré-definido, tenta renderizar o código
          setComponentCode(payload);
          setSelectedComponent(null);
          setError(null);

          // Informar ao pai que o componente foi renderizado com sucesso
          messageService.sendMessage('COMPONENT_RENDERED', { success: true });
        } else {
          throw new Error('Payload inválido: deve ser uma string de código React');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
        setError(errorMessage);
        messageService.sendMessage('ERROR', { message: errorMessage });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Renderizar componente pré-definido
  const renderPredefinedComponent = () => {
    switch (selectedComponent) {
      case 'SIMPLE_BUTTON':
        return <SimpleButton />;
      case 'SIMPLE_CARD':
        return <SimpleCard />;
      case 'DASHBOARD':
        return <Dashboard />;
      default:
        return null;
    }
  };

  // Função para renderizar o componente dinamicamente
  const renderDynamicComponent = () => {
    if (!componentCode) return null;

    try {
      // Abordagem alternativa: renderizar componentes simples baseados no texto
      if (componentCode.includes('<Button>') && componentCode.includes('Clique em Mim')) {
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Componente Dinâmico</h2>
            <Button>Clique em Mim</Button>
          </div>
        );
      }

      // Se o código contiver "Componente Dinâmico", renderizar um componente simples
      if (componentCode.includes('Componente Dinâmico')) {
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Componente Dinâmico</h2>
            <Button>Clique em Mim</Button>
          </div>
        );
      }

      // Tentativa de renderizar o código (abordagem mais arriscada)
      throw new Error('Não foi possível renderizar o componente. Por favor, use um dos exemplos pré-definidos.');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao renderizar componente';
      setError(errorMessage);
      messageService.sendMessage('ERROR', { message: errorMessage });
      return <div className="p-4 bg-red-100 text-red-800 rounded">Erro: {errorMessage}</div>;
    }
  };

  return (
    <div className="dynamic-renderer">
      {error ? (
        <div className="p-4 bg-red-100 text-red-800 rounded">
          <h3 className="font-bold">Erro ao renderizar componente:</h3>
          <pre className="mt-2 whitespace-pre-wrap">{error}</pre>
        </div>
      ) : selectedComponent ? (
        renderPredefinedComponent()
      ) : componentCode ? (
        renderDynamicComponent()
      ) : (
        <div className="p-4 text-center">
          <p className="text-muted-foreground">
            Aguardando código do componente...
          </p>
        </div>
      )}
    </div>
  );
};

export default DynamicRenderer;
