"use client"

import React, { useEffect, useState } from 'react';
import { messageService } from '@/lib/message-service';
// Importar todos os componentes que podem ser usados no código dinâmico
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Dashboard } from './Dashboard';
import * as LucideReact from 'lucide-react';
import { sanitizeJSXCode, transformJSX } from '@/lib/jsx-transformer';

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
      // Sanitizar o código para garantir que seja válido
      const sanitizedCode = sanitizeJSXCode(componentCode);

      // Transpilar o código JSX para JavaScript válido
      let transpiledCode;
      try {
        transpiledCode = transformJSX(sanitizedCode);
        console.log('Código transpilado com sucesso');
      } catch (error) {
        console.error('Erro ao transpilar código com Babel:', error);
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        throw new Error(`Erro ao transpilar código: ${errorMessage}`);
      }

      // Não fazemos mais detecção baseada em texto - processamos diretamente o JSX

      // Abordagem direta: definir o componente diretamente no escopo atual
      try {
        console.log('Processando código JSX...');

        // Criar um componente dinâmico diretamente a partir do código
        // Esta abordagem é mais direta e evita problemas de escopo
        const DynamicComponentWrapper = () => {
          // Definir variáveis para o escopo local
          let Component: React.FC | null = null;

          // Executar o código para definir o Component
          try {
            // eslint-disable-next-line no-new-func
            const defineComponent = new Function(
              'React',
              'Button',
              'Card', 'CardHeader', 'CardContent', 'CardDescription', 'CardTitle', 'CardFooter',
              'Input', 'Label', 'Checkbox',
              'Dashboard',
              'LucideReact',
              `
                // Disponibilizar o LucideReact globalmente para o código do usuário
                window.LucideReact = LucideReact;
                ${transpiledCode}
                return Component;
              `
            );

            Component = defineComponent(
              React,
              Button,
              Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter,
              Input, Label, Checkbox,
              Dashboard,
              LucideReact
            );
          } catch (error) {
            console.error('Erro ao definir o componente:', error);
            throw new Error(`Erro ao definir o componente: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
          }

          // Verificar se Component foi definido
          if (!Component) {
            throw new Error('O componente não foi definido corretamente. Certifique-se de definir uma função chamada "Component".');
          }

          return <Component />;
        };

        // Renderizar o wrapper que contém o componente dinâmico
        return <DynamicComponentWrapper />;
      } catch (evalError) {
        console.error('Erro ao avaliar o código:', evalError);

        // Se o erro for relacionado a JSX, tentar renderizar um componente simples
        if (evalError && evalError.toString().includes("Unexpected token '<'")) {
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
