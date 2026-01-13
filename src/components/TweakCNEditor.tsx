import { useEffect, useState } from 'react';

// Importar componentes do TweakCN
// Nota: Alguns componentes podem precisar de ajustes para funcionar com Vite/React ao invés de Next.js

export function TweakCNEditor() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">Carregando TweakCN Editor...</div>
      </div>
    );
  }

  return (
    <div className="tweakcn-editor h-screen w-full">
      <div className="flex h-full flex-col">
        <header className="border-b p-4">
          <h1 className="text-2xl font-bold">TweakCN Theme Editor</h1>
          <p className="text-sm text-muted-foreground">
            Editor de temas para shadcn/ui integrado no MITRA
          </p>
        </header>
        
        <main className="flex-1 overflow-hidden">
          <div className="grid h-full grid-cols-[300px_1fr_400px]">
            {/* Sidebar esquerda - Presets */}
            <div className="border-r p-4 overflow-y-auto">
              <h2 className="mb-4 text-lg font-semibold">Theme Presets</h2>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Os presets de temas serão carregados aqui
                </p>
              </div>
            </div>

            {/* Área central - Preview */}
            <div className="p-4 overflow-y-auto">
              <h2 className="mb-4 text-lg font-semibold">Preview</h2>
              <div className="rounded-lg border p-8">
                <p className="text-sm text-muted-foreground">
                  A visualização dos componentes será exibida aqui
                </p>
              </div>
            </div>

            {/* Sidebar direita - Controles */}
            <div className="border-l p-4 overflow-y-auto">
              <h2 className="mb-4 text-lg font-semibold">Customization</h2>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Os controles de customização serão exibidos aqui
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

