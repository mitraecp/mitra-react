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

// Função para aplicar tema dinamicamente
// Aceita variáveis CSS no formato OKLCH (TweakCN) ou qualquer outro formato
function applyTheme(theme: any) {
  console.log('🎨 Aplicando tema:', theme);
  const root = document.documentElement;

  // Se o tema for um objeto com propriedades, aplicar cada uma como variável CSS
  if (theme && typeof theme === 'object') {
    Object.keys(theme).forEach(key => {
      const value = theme[key];

      // Converter chaves para formato CSS variable (--nome-da-variavel)
      // Aceita: "background", "card-foreground", "cardForeground", etc.
      const cssVarName = key.startsWith('--')
        ? key
        : `--${key.replace(/_/g, '-').replace(/([A-Z])/g, '-$1').toLowerCase()}`;

      root.style.setProperty(cssVarName, value);
      console.log(`  ${cssVarName}: ${value}`);
    });

    console.log('✅ Tema aplicado com sucesso!');
  } else {
    console.warn('⚠️ Tema inválido:', theme);
  }
}

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
      messageService.addListener('RENDER_COMPONENT', (code, componentData, componentId, theme) => {
        // Atualizar a variável global componentData
        if (componentData) {
          window.componentData = componentData;
          console.log('Dados do componente recebidos:', window.componentData);
        }
        if (componentId) {
          window.componentId = componentId;
          console.log('ID do componente recebido:', window.componentId);
        }

        // Se recebeu um tema, aplicar as variáveis CSS
        if (theme) {
          console.log('Tema recebido:', theme);
          applyTheme(theme);
        }

        // Se o code for uma string, é código de componente
        if (typeof code === 'string') {
          console.log('Código de componente recebido');
        }
      });

      // Adicionar listener para mensagens UPDATE_THEME (apenas atualiza o tema sem re-renderizar)
      messageService.addListener('UPDATE_THEME', (theme) => {
        if (theme) {
          console.log('🎨 Atualizando tema (sem re-render):', theme);
          applyTheme(theme);
        }
      });
    }

    // Enviar mensagem de que estamos prontos
    if (isInIframe) {
      const componentId =
        new URLSearchParams(window.location.search)
          .get('instance')
          ?.match(/\d+/)?.[0] ?? null;
      messageService.sendMessage('READY', null, null, componentId ? Number(componentId) : { timestamp: Date.now()} as any);
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
