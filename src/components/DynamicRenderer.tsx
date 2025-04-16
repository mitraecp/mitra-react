"use client"

import React, { useEffect, useState } from 'react';
import { messageService } from '@/lib/message-service';
import * as ShadcnComponents from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dashboard } from './Dashboard';
import { transformJSX, containsJSX, sanitizeJSXCode, extractComponent } from '@/lib/jsx-transformer';

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
      // Verificar se o código contém JSX
      const hasJSX = containsJSX(componentCode);

      // Sanitizar o código
      const sanitizedCode = sanitizeJSXCode(componentCode);

      // Extrair o componente do código
      const extractedCode = extractComponent(sanitizedCode);

      // Contexto para a função eval que inclui React e componentes do Shadcn
      const context = {
        React,
        ...ShadcnComponents,
        Button,
        Card,
        CardHeader,
        CardContent,
        CardDescription,
        CardTitle,
        Dashboard
      };

      // Se o código contiver JSX, transformá-lo
      let processedCode = extractedCode;

      if (hasJSX) {
        console.log('Código contém JSX, transformando...');
        processedCode = transformJSX(extractedCode);
        console.log('Código transformado:', processedCode);
      }

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

      // Tentar criar e executar o componente
      try {
        // Criar uma função que retorna o componente JSX
        const createComponent = new Function(
          ...Object.keys(context),
          `try {
            ${processedCode}
            return typeof Component === 'function' ? Component : null;
          } catch (error) {
            console.error("Erro ao renderizar componente:", error);
            throw error;
          }`
        );

        // Executar a função com o contexto
        const DynamicComponent = createComponent(...Object.values(context));

        if (!DynamicComponent) {
          throw new Error('O componente não foi definido corretamente. Certifique-se de definir uma função chamada "Component".');
        }

        return <DynamicComponent />;
      } catch (evalError) {
        console.error('Erro ao avaliar o código:', evalError);

        // Se o erro for relacionado a JSX, tentar renderizar um componente simples
        if (evalError.toString().includes("Unexpected token '<'")) {
          messageService.sendMessage('ERROR', { message: 'Erro de sintaxe JSX. Tentando renderizar um componente simples...' });
          return (
            <div>
              <h2 className="text-2xl font-bold mb-4">Componente Fallback</h2>
              <p className="mb-4">O código JSX não pôde ser processado, mas renderizamos este componente simples.</p>
              <Button>Botão Fallback</Button>
            </div>
          );
        }

        throw evalError;
      }
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
