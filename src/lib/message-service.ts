// Tipos de mensagens que podem ser trocadas entre pai e filho
export type MessageType = 
  | 'RENDER_COMPONENT' 
  | 'COMPONENT_RENDERED' 
  | 'ERROR' 
  | 'LOG'
  | 'READY';

// Interface para as mensagens trocadas
export interface IFrameMessage {
  type: MessageType;
  payload?: any;
  id?: string;
}

// Classe para gerenciar a comunicação postMessage
export class MessageService {
  private static instance: MessageService;
  private listeners: Map<MessageType, Array<(data: any) => void>> = new Map();
  private ready = false;

  private constructor() {
    // Configurar o listener de mensagens
    window.addEventListener('message', this.handleMessage.bind(this));
    
    // Informar que está pronto para receber mensagens
    this.sendReadyMessage();
  }

  public static getInstance(): MessageService {
    if (!MessageService.instance) {
      MessageService.instance = new MessageService();
    }
    return MessageService.instance;
  }

  // Enviar mensagem para o pai
  public sendMessage(type: MessageType, payload?: any, id?: string): void {
    if (window.parent !== window) {
      const message: IFrameMessage = {
        type,
        payload,
        id
      };
      
      window.parent.postMessage(message, '*');
      console.log('Mensagem enviada para o pai:', message);
    }
  }

  // Adicionar um listener para um tipo específico de mensagem
  public addListener(type: MessageType, callback: (data: any) => void): () => void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    
    this.listeners.get(type)?.push(callback);
    
    // Retornar função para remover o listener
    return () => {
      const typeListeners = this.listeners.get(type);
      if (typeListeners) {
        const index = typeListeners.indexOf(callback);
        if (index !== -1) {
          typeListeners.splice(index, 1);
        }
      }
    };
  }

  // Processar mensagens recebidas
  private handleMessage(event: MessageEvent): void {
    const message = event.data as IFrameMessage;
    
    if (!message || !message.type) {
      return;
    }
    
    console.log('Mensagem recebida do pai:', message);
    
    const callbacks = this.listeners.get(message.type);
    if (callbacks) {
      callbacks.forEach(callback => callback(message.payload));
    }
  }

  // Enviar mensagem informando que está pronto
  private sendReadyMessage(): void {
    if (this.ready) return;
    
    // Pequeno delay para garantir que o aplicativo esteja totalmente carregado
    setTimeout(() => {
      this.sendMessage('READY');
      this.ready = true;
    }, 500);
  }
}

// Exportar uma instância singleton
export const messageService = MessageService.getInstance();
