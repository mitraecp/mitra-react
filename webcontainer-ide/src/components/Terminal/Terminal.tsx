import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import 'xterm/css/xterm.css';
import './Terminal.css';

interface TerminalProps {
  onInput?: (input: string) => void;
  onResize?: (cols: number, rows: number) => void;
}

// Componente Terminal com forwardRef para permitir acesso externo
const Terminal = forwardRef<any, TerminalProps>((props, ref) => {
  const { onInput, onResize } = props;
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const [isTerminalReady, setIsTerminalReady] = useState(false);
  const [initAttempts, setInitAttempts] = useState(0);

  // Função para verificar se o container tem dimensões válidas
  const hasValidDimensions = () => {
    if (!terminalRef.current) return false;
    const { offsetWidth, offsetHeight } = terminalRef.current;
    return offsetWidth > 0 && offsetHeight > 0;
  };

  // Função para ajustar o terminal com segurança
  const safeFit = () => {
    if (!fitAddonRef.current || !terminalRef.current) return false;

    try {
      if (hasValidDimensions()) {
        fitAddonRef.current.fit();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao ajustar o terminal:', error);
      return false;
    }
  };

  // Função para inicializar o terminal
  const initializeTerminal = () => {
    if (xtermRef.current || !terminalRef.current) return;

    try {
      // Verificar dimensões
      if (!hasValidDimensions()) {
        console.log(`Tentativa ${initAttempts + 1}: Container do terminal sem dimensões, aguardando...`);
        if (initAttempts < 5) {
          // Tentar novamente após um tempo
          setTimeout(() => {
            setInitAttempts(prev => prev + 1);
          }, 500);
        } else {
          console.warn('Desistindo após várias tentativas. Forçando inicialização do terminal.');
          // Forçar inicialização mesmo sem dimensões ideais
          createTerminal();
        }
        return;
      }

      // Se temos dimensões, criar o terminal
      createTerminal();

    } catch (error) {
      console.error('Erro ao inicializar o terminal:', error);
    }
  };

  // Função para criar a instância do terminal
  const createTerminal = () => {
    if (!terminalRef.current) return;

    try {
      console.log('Criando instância do terminal...');

      // Criar instância do terminal com configurações padrão
      const xterm = new XTerm({
        cursorBlink: true,
        theme: {
          background: '#1e1e1e',
          foreground: '#d4d4d4',
          cursor: '#d4d4d4',
          selection: 'rgba(255, 255, 255, 0.3)',
        },
        allowTransparency: true,
        fontSize: 14,
        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
        // Definir dimensões iniciais para evitar o erro
        cols: 80,
        rows: 24
      });

      // Criar e adicionar addons antes de abrir o terminal
      const fitAddon = new FitAddon();
      xterm.loadAddon(fitAddon);
      xterm.loadAddon(new WebLinksAddon());

      // Armazenar referências antes de abrir o terminal
      xtermRef.current = xterm;
      fitAddonRef.current = fitAddon;

      // Configurar métodos para acesso externo
      (xterm as any).writeToTerminal = (data: string) => {
        xterm.write(data);
      };

      (xterm as any).fitTerminal = () => {
        safeFit();
      };

      // Expor o terminal para acesso global
      (window as any).terminal = xterm;

      // Configurar manipuladores de eventos
      xterm.onData((data) => {
        if (onInput) {
          onInput(data);
        }
      });

      xterm.onResize((size) => {
        if (onResize) {
          onResize(size.cols, size.rows);
        }
      });

      // Abrir o terminal no elemento de referência
      // Envolver em try-catch para capturar erros específicos
      try {
        console.log('Abrindo terminal no elemento de referência...');
        xterm.open(terminalRef.current);
        console.log('Terminal aberto com sucesso');
      } catch (openError) {
        console.error('Erro ao abrir o terminal:', openError);
        return;
      }

      // Configurar ajuste de tamanho após abertura bem-sucedida
      // Dar tempo para o DOM renderizar completamente
      setTimeout(() => {
        try {
          console.log('Tentando ajustar o terminal...');
          if (safeFit()) {
            console.log('Terminal ajustado com sucesso');
          } else {
            console.log('Não foi possível ajustar o terminal na primeira tentativa');
            // Tentar novamente após mais tempo
            setTimeout(() => {
              if (safeFit()) {
                console.log('Terminal ajustado com sucesso na segunda tentativa');
              } else {
                console.warn('Não foi possível ajustar o terminal mesmo após segunda tentativa');
              }
            }, 500);
          }
        } catch (fitError) {
          console.error('Erro ao ajustar o terminal:', fitError);
        }

        // Marcar o terminal como pronto
        setIsTerminalReady(true);
      }, 200);

      // Configurar observador de redimensionamento
      const handleResize = () => {
        safeFit();
      };

      // Usar ResizeObserver com debounce
      const resizeObserver = new ResizeObserver(() => {
        // Debounce para evitar chamadas excessivas
        if ((window as any).resizeTimer) {
          clearTimeout((window as any).resizeTimer);
        }
        (window as any).resizeTimer = setTimeout(() => {
          handleResize();
        }, 100);
      });

      if (terminalRef.current) {
        resizeObserver.observe(terminalRef.current);
      }

      window.addEventListener('resize', handleResize);

      // Limpar ao desmontar
      return () => {
        window.removeEventListener('resize', handleResize);
        if ((window as any).resizeTimer) {
          clearTimeout((window as any).resizeTimer);
        }
        resizeObserver.disconnect();
        if (xterm) {
          try {
            xterm.dispose();
          } catch (disposeError) {
            console.error('Erro ao descartar o terminal:', disposeError);
          }
        }
        delete (window as any).terminal;
        xtermRef.current = null;
        fitAddonRef.current = null;
      };
    } catch (error) {
      console.error('Erro ao criar o terminal:', error);
    }
  };

  // Expor métodos para o componente pai através da ref
  useImperativeHandle(ref, () => ({
    fitTerminal: () => safeFit(),
    writeToTerminal: (data: string) => {
      if (xtermRef.current) {
        xtermRef.current.write(data);
        return true;
      }
      return false;
    },
    getTerminal: () => xtermRef.current,
    getContainer: () => terminalRef.current,
    isReady: () => isTerminalReady
  }));

  // Efeito para inicializar o terminal quando o componente montar
  useEffect(() => {
    // Inicializar o terminal após um pequeno atraso para garantir que o DOM está pronto
    const timer = setTimeout(() => {
      initializeTerminal();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Efeito para tentar novamente quando initAttempts mudar
  useEffect(() => {
    if (initAttempts > 0) {
      initializeTerminal();
    }
  }, [initAttempts]);

  return <div ref={terminalRef} className="terminal-container" />;
});

// Adicionar displayName para depuração
Terminal.displayName = 'Terminal';

export default Terminal;
