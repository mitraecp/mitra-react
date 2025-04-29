import { useState, useEffect, useRef } from 'react';
import Split from 'split.js';
import MonacoEditor from './Editor/MonacoEditor';
import FileExplorer, { FileItem } from './FileExplorer/FileExplorer';
import Terminal from './Terminal/Terminal';
import Preview from './Preview/Preview';
import {
  getWebContainerInstance,
  resetWebContainerInstance,
  mountFiles,
  runCommand,
  getServerUrl,
  writeFile,
  readFile,
  listFiles,
  createDirectory,
  WebContainerManager,
} from '../lib/webcontainer';
import './WebContainerIDE.css';

// Arquivos iniciais para o projeto
const initialFiles = {
  'index.html': {
    file: {
      contents: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meu Projeto</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div id="app"></div>
  <script type="module" src="index.js"></script>
</body>
</html>`,
    },
  },
  'style.css': {
    file: {
      contents: `body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 0;
  padding: 20px;
  background-color: #f5f5f5;
}

#app {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

h1 {
  color: #333;
}`,
    },
  },
  'index.js': {
    file: {
      contents: `import { createApp } from './app.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  app.innerHTML = createApp();
});`,
    },
  },
  'app.js': {
    file: {
      contents: `export function createApp() {
  return \`
    <h1>Bem-vindo ao WebContainer IDE!</h1>
    <p>Edite os arquivos à esquerda para começar.</p>
    <p>Este é um ambiente de desenvolvimento completo no navegador.</p>
  \`;
}`,
    },
  },
  'package.json': {
    file: {
      contents: `{
  "name": "webcontainer-project",
  "version": "1.0.0",
  "description": "Projeto WebContainer",
  "main": "index.js",
  "scripts": {
    "start": "serve -p 3000",
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "dependencies": {
    "serve": "^14.2.0"
  }
}`,
    },
  },
};

const WebContainerIDE = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [terminalOutput, setTerminalOutput] = useState<string>('');
  const [isServerRunning, setIsServerRunning] = useState<boolean>(false);
  const [webContainerError, setWebContainerError] = useState<string | null>(null);
  const [initAttempts, setInitAttempts] = useState<number>(0);

  const splitRef = useRef<Split.Instance | null>(null);
  const terminalRef = useRef<any>(null);
  const serverProcessRef = useRef<any>(null);
  const webContainerInitializedRef = useRef<boolean>(false);

  // Função para inicializar o WebContainer
  const initWebContainer = async () => {
    try {
      setLoading(true);
      setWebContainerError(null);

      // Usar o terminal global para escrever mensagens
      if (window.terminal) {
        window.terminal.writeToTerminal(`\nTentativa ${initAttempts + 1} de inicializar o WebContainer...\n`);
        window.terminal.fitTerminal();
      }

      // Verificar se o ambiente suporta WebContainers
      const manager = WebContainerManager.getInstance();
      const supportStatus = manager.isSupportedEnvironment();

      if (!supportStatus.supported) {
        const errorMessage = `WebContainers não são suportados neste ambiente: ${supportStatus.reason}`;
        console.error(errorMessage);
        setWebContainerError(errorMessage);

        if (window.terminal) {
          window.terminal.writeToTerminal(`\n\nERRO: ${errorMessage}\n\n`);
          window.terminal.writeToTerminal('Verifique se:\n');
          window.terminal.writeToTerminal('1. Você está usando Chrome ou Edge atualizado\n');
          window.terminal.writeToTerminal('2. O servidor está configurado com os headers COOP/COEP corretos\n');
          window.terminal.writeToTerminal('3. Você está acessando via HTTPS ou localhost\n\n');
          window.terminal.fitTerminal();
        }

        setLoading(false);
        return;
      }

      // Resetar o WebContainer se houver tentativas anteriores
      if (initAttempts > 0) {
        if (window.terminal) {
          window.terminal.writeToTerminal('Resetando estado do WebContainer...\n');
        }

        resetWebContainerInstance();

        if (window.terminal) {
          window.terminal.writeToTerminal('Estado do WebContainer resetado.\n');
          window.terminal.fitTerminal();
        }

        // Aguardar um pouco para garantir que o reset foi concluído
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Inicializar o WebContainer com tratamento de timeout
      let initializationTimeout: NodeJS.Timeout | null = null;

      try {
        // Configurar timeout para evitar que a inicialização fique presa
        const timeoutPromise = new Promise<never>((_, reject) => {
          initializationTimeout = setTimeout(() => {
            reject(new Error('Timeout ao inicializar o WebContainer após 20 segundos.'));
          }, 20000);
        });

        // Competição entre inicialização normal e timeout
        const webcontainer = await Promise.race([
          getWebContainerInstance(),
          timeoutPromise
        ]);

        // Limpar o timeout se a inicialização for bem-sucedida
        if (initializationTimeout) {
          clearTimeout(initializationTimeout);
          initializationTimeout = null;
        }

        webContainerInitializedRef.current = true;

        if (window.terminal) {
          window.terminal.writeToTerminal('WebContainer inicializado com sucesso!\n');
          window.terminal.writeToTerminal('Montando arquivos iniciais...\n');
          window.terminal.fitTerminal();
        }
      } catch (error) {
        // Limpar o timeout em caso de erro
        if (initializationTimeout) {
          clearTimeout(initializationTimeout);
        }

        throw error;
      }

      // Montar os arquivos iniciais
      await mountFiles(initialFiles);

      if (window.terminal) {
        window.terminal.writeToTerminal('Arquivos montados com sucesso!\n');
        window.terminal.writeToTerminal('Instalando dependências...\n');
        window.terminal.fitTerminal();
      }

      // Instalar dependências
      const installProcess = await runCommand('npm', ['install']);

      // Capturar a saída do processo
      installProcess.output.pipeTo(
        new WritableStream({
          write(data) {
            setTerminalOutput((prev) => prev + data);
            if (window.terminal) {
              window.terminal.writeToTerminal(data);
              // Não chamamos fitTerminal aqui para evitar chamadas excessivas
            }
          },
        })
      );

      // Aguardar a conclusão da instalação
      await installProcess.exit;

      if (window.terminal) {
        window.terminal.writeToTerminal('\nDependências instaladas com sucesso!\n');
        window.terminal.fitTerminal();
      }

      // Carregar a estrutura de arquivos
      await loadFileStructure();

      setLoading(false);

      if (window.terminal) {
        window.terminal.writeToTerminal('\nWebContainer IDE inicializado e pronto para uso!\n');
        window.terminal.writeToTerminal('Clique em "Iniciar Servidor" para executar a aplicação.\n');
        window.terminal.fitTerminal();
      }
    } catch (error) {
      console.error('Erro ao inicializar o WebContainer:', error);
      setLoading(false);
      setWebContainerError(`${error}`);

      if (window.terminal) {
        window.terminal.writeToTerminal(`\nErro ao inicializar o WebContainer: ${error}\n`);
        window.terminal.fitTerminal();

        if (initAttempts < 2) {
          window.terminal.writeToTerminal('\nTentando novamente em 3 segundos...\n');
          window.terminal.fitTerminal();
          setTimeout(() => {
            setInitAttempts(prev => prev + 1);
          }, 3000);
        } else {
          window.terminal.writeToTerminal('\nFalha ao inicializar o WebContainer após várias tentativas.\n');
          window.terminal.writeToTerminal('Por favor, recarregue a página e tente novamente.\n');
          window.terminal.fitTerminal();
        }
      }
    }
  };

  // Inicializar o WebContainer e configurar o layout
  useEffect(() => {
    // Configurar o layout dividido
    const splitInstance = Split(['.file-explorer-panel', '.editor-panel', '.preview-panel'], {
      sizes: [20, 40, 40],
      minSize: [200, 300, 300],
      gutterSize: 8,
      direction: 'horizontal',
    });

    splitRef.current = splitInstance;

    return () => {
      if (splitRef.current) {
        splitRef.current.destroy();
      }

      // Parar o servidor ao desmontar o componente
      if (serverProcessRef.current) {
        serverProcessRef.current.kill().catch(console.error);
      }
    };
  }, []);

  // Efeito para iniciar o WebContainer quando o terminal estiver pronto
  useEffect(() => {
    // Verificar periodicamente se o terminal está pronto
    const checkTerminalInterval = setInterval(() => {
      if (window.terminal && !webContainerInitializedRef.current) {
        console.log('Terminal detectado, preparando para inicializar WebContainer...');

        // Limpar o intervalo uma vez que o terminal foi detectado
        clearInterval(checkTerminalInterval);

        // Dar um tempo adicional para garantir que o terminal esteja completamente inicializado
        setTimeout(() => {
          // Verificar novamente se o terminal ainda está disponível
          if (window.terminal) {
            console.log('Terminal está pronto, inicializando WebContainer...');
            initWebContainer();
          } else {
            console.warn('Terminal não está mais disponível ao tentar inicializar WebContainer');
          }
        }, 1000);
      }
    }, 500);

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(checkTerminalInterval);
  }, []);

  // Efeito para tentar novamente quando initAttempts mudar
  useEffect(() => {
    if (initAttempts > 0 && initAttempts <= 2) {
      initWebContainer();
    }
  }, [initAttempts]);

  // Carregar a estrutura de arquivos
  const loadFileStructure = async () => {
    try {
      const rootFiles = await listFiles('/');
      const fileStructure = await buildFileTree('/', rootFiles);
      setFiles(fileStructure);

      // Selecionar o primeiro arquivo por padrão
      if (fileStructure.length > 0) {
        const firstFile = findFirstFile(fileStructure);
        if (firstFile) {
          handleFileSelect(firstFile);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar a estrutura de arquivos:', error);
    }
  };

  // Encontrar o primeiro arquivo na estrutura
  const findFirstFile = (items: FileItem[]): FileItem | null => {
    for (const item of items) {
      if (item.type === 'file') {
        return item;
      } else if (item.children && item.children.length > 0) {
        const found = findFirstFile(item.children);
        if (found) return found;
      }
    }
    return null;
  };

  // Construir a árvore de arquivos recursivamente
  const buildFileTree = async (path: string, items: string[]): Promise<FileItem[]> => {
    const result: FileItem[] = [];

    for (const item of items) {
      if (item === 'node_modules' || item === '.git') continue;

      const itemPath = path === '/' ? `/${item}` : `${path}/${item}`;

      try {
        const stats = await (await getWebContainerInstance()).fs.stat(itemPath);

        if (stats.isDirectory()) {
          const children = await listFiles(itemPath);
          const childItems = await buildFileTree(itemPath, children);

          result.push({
            name: item,
            type: 'directory',
            path: itemPath,
            children: childItems,
          });
        } else {
          result.push({
            name: item,
            type: 'file',
            path: itemPath,
          });
        }
      } catch (error) {
        console.error(`Erro ao processar o item ${itemPath}:`, error);
      }
    }

    return result;
  };

  // Parar o servidor atual
  const stopServer = async () => {
    if (serverProcessRef.current) {
      try {
        // Tentar encerrar o processo do servidor
        await serverProcessRef.current.kill();
      } catch (error) {
        console.error('Erro ao parar o servidor:', error);
      } finally {
        serverProcessRef.current = null;
        setIsServerRunning(false);
        setPreviewUrl(undefined);

        if (window.terminal) {
          window.terminal.writeToTerminal('\n\nServidor parado.\n\n');
          window.terminal.fitTerminal();
        }
      }
    }
  };

  // Iniciar o servidor de desenvolvimento
  const startDevServer = async () => {
    // Verificar se o WebContainer está inicializado
    if (!webContainerInitializedRef.current) {
      if (window.terminal) {
        window.terminal.writeToTerminal('\n\nO WebContainer não está inicializado. Tentando inicializar...\n\n');
        window.terminal.fitTerminal();
      }

      try {
        await initWebContainer();
      } catch (error) {
        if (window.terminal) {
          window.terminal.writeToTerminal(`\n\nFalha ao inicializar o WebContainer: ${error}\n\n`);
          window.terminal.writeToTerminal('Não é possível iniciar o servidor sem o WebContainer.\n');
          window.terminal.fitTerminal();
        }
        return;
      }
    }

    // Primeiro, parar qualquer servidor em execução
    await stopServer();

    try {
      if (window.terminal) {
        window.terminal.writeToTerminal('\n\nIniciando servidor...\n\n');
        window.terminal.fitTerminal();
      }

      const serverProcess = await runCommand('npm', ['start']);
      serverProcessRef.current = serverProcess;

      serverProcess.output.pipeTo(
        new WritableStream({
          write(data) {
            setTerminalOutput((prev) => prev + data);
            if (window.terminal) {
              window.terminal.writeToTerminal(data);
              // Não chamamos fitTerminal aqui para evitar chamadas excessivas
            }

            // Verificar se o servidor está em execução
            if (data.includes('Accepting connections')) {
              setIsServerRunning(true);
              updatePreviewUrl();
            }
          },
        })
      );

      // Adicionar manipulador para quando o processo terminar
      serverProcess.exit.then(() => {
        setIsServerRunning(false);
        serverProcessRef.current = null;
      });
    } catch (error) {
      console.error('Erro ao iniciar o servidor:', error);
      setIsServerRunning(false);

      if (window.terminal) {
        window.terminal.writeToTerminal(`\n\nErro ao iniciar o servidor: ${error}\n\n`);
        window.terminal.fitTerminal();

        // Se o erro for relacionado ao WebContainer, tentar reinicializar
        if (String(error).includes('Unable to create more instances')) {
          window.terminal.writeToTerminal('Erro relacionado ao WebContainer. Tentando reinicializar...\n');
          window.terminal.fitTerminal();
          resetWebContainerInstance();
          webContainerInitializedRef.current = false;
          setInitAttempts(0);

          setTimeout(() => {
            initWebContainer();
          }, 1000);
        }
      }
    }
  };

  // Atualizar a URL de visualização
  const updatePreviewUrl = async () => {
    try {
      const url = await getServerUrl(3000);
      setPreviewUrl(url);
    } catch (error) {
      console.error('Erro ao obter a URL do servidor:', error);
    }
  };

  // Manipular a seleção de arquivo
  const handleFileSelect = async (file: FileItem) => {
    if (file.type === 'file') {
      try {
        const content = await readFile(file.path);
        setSelectedFile(file.path);
        setFileContent(content);
      } catch (error) {
        console.error(`Erro ao ler o arquivo ${file.path}:`, error);
      }
    }
  };

  // Manipular a alteração de conteúdo do arquivo
  const handleFileChange = async (content: string) => {
    setFileContent(content);

    if (selectedFile) {
      try {
        await writeFile(selectedFile, content);
      } catch (error) {
        console.error(`Erro ao salvar o arquivo ${selectedFile}:`, error);
      }
    }
  };

  // Criar um novo arquivo ou diretório
  const handleCreateFile = async (path: string, type: 'file' | 'directory') => {
    try {
      if (type === 'directory') {
        await createDirectory(path);
      } else {
        await writeFile(path, '');
      }

      // Recarregar a estrutura de arquivos
      await loadFileStructure();

      // Selecionar o novo arquivo se for um arquivo
      if (type === 'file') {
        setSelectedFile(path);
        setFileContent('');
      }
    } catch (error) {
      console.error(`Erro ao criar ${type} em ${path}:`, error);
    }
  };

  // Excluir um arquivo ou diretório
  const handleDeleteFile = async (path: string) => {
    try {
      await (await getWebContainerInstance()).fs.rm(path, { recursive: true });

      // Recarregar a estrutura de arquivos
      await loadFileStructure();

      // Limpar a seleção se o arquivo excluído estiver selecionado
      if (selectedFile === path) {
        setSelectedFile(null);
        setFileContent('');
      }
    } catch (error) {
      console.error(`Erro ao excluir ${path}:`, error);
    }
  };

  // Renomear um arquivo ou diretório
  const handleRenameFile = async (oldPath: string, newPath: string) => {
    try {
      // Ler o conteúdo do arquivo antigo
      const content = await readFile(oldPath);

      // Criar o novo arquivo com o mesmo conteúdo
      await writeFile(newPath, content);

      // Excluir o arquivo antigo
      await (await getWebContainerInstance()).fs.rm(oldPath, { recursive: true });

      // Recarregar a estrutura de arquivos
      await loadFileStructure();

      // Atualizar a seleção para o novo caminho
      if (selectedFile === oldPath) {
        setSelectedFile(newPath);
      }
    } catch (error) {
      console.error(`Erro ao renomear ${oldPath} para ${newPath}:`, error);
    }
  };

  // Manipular entrada do terminal
  const handleTerminalInput = async (input: string) => {
    // Implementar a lógica para processar a entrada do terminal
    console.log('Entrada do terminal:', input);
  };

  // Determinar a linguagem do arquivo para o editor
  const getFileLanguage = (filePath: string | null): string => {
    if (!filePath) return 'plaintext';

    const extension = filePath.split('.').pop()?.toLowerCase();

    switch (extension) {
      case 'js':
        return 'javascript';
      case 'ts':
        return 'typescript';
      case 'jsx':
        return 'javascript';
      case 'tsx':
        return 'typescript';
      case 'html':
        return 'html';
      case 'css':
        return 'css';
      case 'json':
        return 'json';
      case 'md':
        return 'markdown';
      default:
        return 'plaintext';
    }
  };

  return (
    <div className="webcontainer-ide">
      <div className="ide-header">
        <h1>WebContainer IDE</h1>
        <div className="ide-actions">
          {webContainerError ? (
            <span className="server-status error">Erro no WebContainer</span>
          ) : isServerRunning ? (
            <span className="server-status running">Servidor em execução</span>
          ) : (
            <span className="server-status stopped">Servidor parado</span>
          )}

          {webContainerError ? (
            <button
              onClick={() => {
                resetWebContainerInstance();
                webContainerInitializedRef.current = false;
                setWebContainerError(null);
                setInitAttempts(0);
                setTimeout(() => {
                  initWebContainer();
                }, 1000);
              }}
              className="action-button retry"
            >
              Reiniciar WebContainer
            </button>
          ) : isServerRunning ? (
            <button
              onClick={stopServer}
              className="action-button stop"
            >
              Parar Servidor
            </button>
          ) : (
            <button
              onClick={startDevServer}
              className="action-button start"
              disabled={loading}
            >
              {loading ? 'Inicializando...' : 'Iniciar Servidor'}
            </button>
          )}
        </div>
      </div>

      {/* Exibir mensagem de erro detalhada se houver */}
      {webContainerError && (
        <div className="error-banner">
          <h3>Erro ao inicializar o WebContainer</h3>
          <p>{webContainerError}</p>
          {webContainerError.includes('SharedArrayBuffer') && (
            <div className="error-help">
              <p><strong>Solução:</strong> Este erro ocorre porque o servidor não está configurado com os headers de segurança necessários.</p>
              <ol>
                <li>Verifique se o servidor está enviando os headers <code>Cross-Origin-Embedder-Policy: require-corp</code> e <code>Cross-Origin-Opener-Policy: same-origin</code></li>
                <li>Se estiver executando localmente, reinicie o servidor de desenvolvimento</li>
                <li>Certifique-se de estar usando Chrome ou Edge atualizado</li>
              </ol>
            </div>
          )}
          {webContainerError.includes('Unable to create more instances') && (
            <div className="error-help">
              <p><strong>Solução:</strong> Este erro ocorre quando há múltiplas instâncias do WebContainer.</p>
              <ol>
                <li>Feche outras abas ou janelas que possam estar usando WebContainers</li>
                <li>Recarregue completamente esta página (Ctrl+F5 ou Cmd+Shift+R)</li>
                <li>Se o problema persistir, reinicie o navegador</li>
              </ol>
            </div>
          )}
          <p className="error-note">Este aplicativo requer um navegador baseado em Chromium (Chrome, Edge, Brave).</p>
        </div>
      )}

      <div className="ide-content">
        <div className="file-explorer-panel">
          <FileExplorer
            files={files}
            onFileSelect={handleFileSelect}
            onCreateFile={handleCreateFile}
            onDeleteFile={handleDeleteFile}
            onRenameFile={handleRenameFile}
            selectedFile={selectedFile || undefined}
          />
        </div>

        <div className="editor-panel">
          <div className="editor-container">
            {selectedFile ? (
              <MonacoEditor
                value={fileContent}
                language={getFileLanguage(selectedFile)}
                onChange={handleFileChange}
                theme="vs-dark"
              />
            ) : (
              <div className="editor-placeholder">
                <p>Selecione um arquivo para editar</p>
              </div>
            )}
          </div>

          <div className="terminal-container">
            <Terminal
              onInput={handleTerminalInput}
              ref={(terminal) => {
                // Armazenar a referência do terminal
                if (terminal) {
                  terminalRef.current = terminal;
                  console.log('Referência do terminal obtida');
                }
              }}
            />
          </div>
        </div>

        <div className="preview-panel">
          <Preview url={previewUrl} loading={loading && !previewUrl} />
        </div>
      </div>
    </div>
  );
};

export default WebContainerIDE;
