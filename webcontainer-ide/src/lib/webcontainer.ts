import { WebContainer } from '@webcontainer/api';

// Verificar se o ambiente suporta WebContainers
const checkWebContainerSupport = (): { supported: boolean; reason?: string } => {
  // Verificar se estamos em um navegador
  if (typeof window === 'undefined') {
    return { supported: false, reason: 'WebContainers só funcionam em navegadores.' };
  }

  // Verificar se o navegador suporta SharedArrayBuffer (necessário para WebContainers)
  if (typeof SharedArrayBuffer === 'undefined') {
    return {
      supported: false,
      reason: 'Seu navegador não suporta SharedArrayBuffer, necessário para WebContainers. ' +
              'Use Chrome ou Edge mais recente, ou verifique se o servidor tem os headers COOP/COEP configurados.'
    };
  }

  // Verificar se o site está em um contexto isolado (necessário para SharedArrayBuffer)
  if (typeof window.crossOriginIsolated === 'boolean' && !window.crossOriginIsolated) {
    return {
      supported: false,
      reason: 'Este site não está configurado com isolamento de origem cruzada. ' +
              'O servidor precisa enviar os headers Cross-Origin-Embedder-Policy: require-corp e ' +
              'Cross-Origin-Opener-Policy: same-origin.'
    };
  }

  return { supported: true };
};

// Singleton para gerenciar a instância do WebContainer
class WebContainerManager {
  private static instance: WebContainerManager;
  private webcontainer: WebContainer | null = null;
  private bootPromise: Promise<WebContainer> | null = null;
  private isBooting = false;
  private bootAttempts = 0;
  private maxBootAttempts = 3;
  private supportStatus = checkWebContainerSupport();

  private constructor() {}

  public static getInstance(): WebContainerManager {
    if (!WebContainerManager.instance) {
      WebContainerManager.instance = new WebContainerManager();
    }
    return WebContainerManager.instance;
  }

  public isSupportedEnvironment(): { supported: boolean; reason?: string } {
    return this.supportStatus;
  }

  public async getWebContainer(): Promise<WebContainer> {
    // Verificar se o ambiente é suportado
    if (!this.supportStatus.supported) {
      return Promise.reject(new Error(`WebContainers não são suportados: ${this.supportStatus.reason}`));
    }

    // Se já temos uma instância, retorna ela
    if (this.webcontainer) {
      return this.webcontainer;
    }

    // Se já estamos inicializando, retorna a promessa existente
    if (this.isBooting && this.bootPromise) {
      return this.bootPromise;
    }

    // Verificar se excedemos o número máximo de tentativas
    if (this.bootAttempts >= this.maxBootAttempts) {
      return Promise.reject(new Error(`Falha ao inicializar o WebContainer após ${this.maxBootAttempts} tentativas.`));
    }

    // Incrementar contador de tentativas
    this.bootAttempts++;

    // Inicia o processo de boot
    this.isBooting = true;
    this.bootPromise = new Promise<WebContainer>(async (resolve, reject) => {
      try {
        console.log(`Iniciando boot do WebContainer (tentativa ${this.bootAttempts} de ${this.maxBootAttempts})...`);

        // Adicionar um timeout para evitar que o processo fique preso
        const timeoutPromise = new Promise<never>((_, timeoutReject) => {
          setTimeout(() => {
            timeoutReject(new Error('Timeout ao inicializar o WebContainer após 30 segundos.'));
          }, 30000); // 30 segundos de timeout
        });

        // Competição entre o boot normal e o timeout
        this.webcontainer = await Promise.race([
          WebContainer.boot(),
          timeoutPromise
        ]);

        console.log('WebContainer inicializado com sucesso!');
        resolve(this.webcontainer);
      } catch (error) {
        console.error('Erro ao inicializar o WebContainer:', error);
        this.isBooting = false;
        this.bootPromise = null;

        // Se o erro for relacionado a múltiplas instâncias, limpar completamente
        if (error instanceof Error && error.message.includes('Unable to create more instances')) {
          console.log('Detectado erro de múltiplas instâncias. Tentando limpar recursos...');

          // Forçar limpeza de recursos
          this.forceCleanup();

          // Aguardar um pouco antes de rejeitar para dar tempo ao garbage collector
          setTimeout(() => {
            reject(error);
          }, 1000);
        } else {
          reject(error);
        }
      } finally {
        this.isBooting = false;
      }
    });

    return this.bootPromise;
  }

  public reset(): void {
    if (this.webcontainer) {
      // Tentar desmontar o sistema de arquivos e limpar recursos
      try {
        console.log('Desmontando sistema de arquivos do WebContainer...');
        // Não há método oficial para desmontar, então apenas limpamos as referências
      } catch (error) {
        console.error('Erro ao desmontar WebContainer:', error);
      }
    }

    this.webcontainer = null;
    this.bootPromise = null;
    this.isBooting = false;

    // Resetar contador de tentativas após um tempo
    setTimeout(() => {
      this.bootAttempts = 0;
    }, 5000);
  }

  private forceCleanup(): void {
    this.webcontainer = null;
    this.bootPromise = null;
    this.isBooting = false;
    this.bootAttempts = 0;

    // Forçar garbage collection (não é garantido, mas pode ajudar)
    if ((window as any).gc) {
      try {
        (window as any).gc();
      } catch (e) {
        console.log('Garbage collection não disponível');
      }
    }
  }
}

/**
 * Exportar a classe WebContainerManager para uso externo
 */
export { WebContainerManager };

/**
 * Inicializa o WebContainer
 * @returns Uma instância do WebContainer
 */
export async function getWebContainerInstance() {
  return await WebContainerManager.getInstance().getWebContainer();
}

/**
 * Reseta o estado do WebContainer Manager
 * Útil para testes e recuperação de erros
 */
export function resetWebContainerInstance() {
  WebContainerManager.getInstance().reset();
}

/**
 * Monta arquivos no sistema de arquivos do WebContainer
 * @param files Objeto com os arquivos a serem montados
 */
export async function mountFiles(files: Record<string, { file: { contents: string } }>) {
  const webcontainer = await getWebContainerInstance();
  await webcontainer.mount(files);
}

/**
 * Executa um comando no WebContainer
 * @param command Comando a ser executado
 * @param args Argumentos do comando
 * @returns Processo do comando
 */
export async function runCommand(command: string, args: string[] = []) {
  const webcontainer = await getWebContainerInstance();
  return await webcontainer.spawn(command, args);
}

/**
 * Obtém a URL de um servidor em execução no WebContainer
 * @param port Porta do servidor
 * @returns URL do servidor
 */
export async function getServerUrl(port: number) {
  const webcontainer = await getWebContainerInstance();
  return await webcontainer.getURL(port);
}

/**
 * Escreve um arquivo no sistema de arquivos do WebContainer
 * @param path Caminho do arquivo
 * @param content Conteúdo do arquivo
 */
export async function writeFile(path: string, content: string) {
  const webcontainer = await getWebContainerInstance();
  await webcontainer.fs.writeFile(path, content);
}

/**
 * Lê um arquivo do sistema de arquivos do WebContainer
 * @param path Caminho do arquivo
 * @returns Conteúdo do arquivo
 */
export async function readFile(path: string) {
  const webcontainer = await getWebContainerInstance();
  const content = await webcontainer.fs.readFile(path, 'utf-8');
  return content;
}

/**
 * Lista arquivos em um diretório do WebContainer
 * @param path Caminho do diretório
 * @returns Lista de arquivos
 */
export async function listFiles(path: string) {
  const webcontainer = await getWebContainerInstance();
  return await webcontainer.fs.readdir(path);
}

/**
 * Cria um diretório no WebContainer
 * @param path Caminho do diretório
 */
export async function createDirectory(path: string) {
  const webcontainer = await getWebContainerInstance();
  await webcontainer.fs.mkdir(path, { recursive: true });
}
