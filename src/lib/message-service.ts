/* eslint-disable @typescript-eslint/no-explicit-any */
// Tipos de mensagens que podem ser trocadas entre pai e filho
export type MessageType =
  | 'RENDER_COMPONENT'
  | 'COMPONENT_RENDERED'
  | 'ERROR'
  | 'LOG'
  | 'READY'
  | 'INTERACTIONS_MITRA';

// Interface para as mensagens trocadas
export interface IFrameMessage {
  type: MessageType;
  code?: string | null;
  componentId?: string | null;
  componentData?: any | null;
  payload?: any | null;
}

// Classe para gerenciar a comunicação postMessage
export class MessageService {
  private static instance: MessageService;
  private listeners: Map<MessageType, Array<(code: string | null, componentData?: any | null, componentId?: string | null) => void>> = new Map();
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
  public sendMessage(type: MessageType, code?: string | null, componentId?: string | null, componentData?: any | null, payload?: any | null): void {
    const message: IFrameMessage = {
      type,
      code,
      componentId,
      componentData,
      payload
    };

    // Usar a função que envia para o avô
    this.sendToGrandparent(message);
  }

  // Função para enviar mensagem apenas para o avô (parent.parent)
  private sendToGrandparent(message: any): void {
    try {
      // Adicionar um ID único para a mensagem para rastreamento
      const messageWithId = {
        ...message,
      };

      // Enviar apenas para o avô (parent.parent)
      if (window.parent && window.parent.parent && window.parent.parent !== window.parent) {
        window.parent.parent.postMessage(messageWithId, '*');
        console.log('Mensagem enviada para window.parent.parent:', messageWithId);
        return; // Sucesso, sair da função
      }

      console.log('Não foi possível enviar mensagem: window.parent.parent não está disponível');
    } catch (error) {
      console.error('Erro ao tentar enviar mensagem:', error);
    }
  }

  // Método específico para enviar interações para o componente pai Vue
  public sendInteraction(interactionType: string, interactionData: any, componentId?: string | null): void {
    // Usar o componentId passado como parâmetro ou obter do componentData global como fallback
    const actualComponentId = componentId || window.componentData?.id;

    // Estrutura a mensagem no formato simplificado que o Vue espera
    // Enviamos diretamente os dados sem aninhamento adicional
    const mitraMessage: IFrameMessage = {
      type: 'INTERACTIONS_MITRA',
      payload: {
        type: interactionType,
        ...interactionData // Espalhar os dados diretamente, sem aninhamento em 'data'
      },
      componentId: actualComponentId
    };

    // Enviar a mensagem apenas para o avô (parent.parent)
    this.sendToGrandparent(mitraMessage);
  }

  // Adicionar um listener para um tipo específico de mensagem
  public addListener(type: MessageType, callback: (code: string | null, componentData?: any | null) => void): () => void {
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
      if (message.type === 'INTERACTIONS_MITRA') {
        // Para interações, passamos o payload como primeiro parâmetro
        // O payload já contém o tipo e os dados diretamente
        callbacks.forEach(callback => callback(null, message.payload, message.componentId));
      } else if (message.type === 'RENDER_COMPONENT') {
        // Quando recebemos uma mensagem RENDER_COMPONENT, armazenamos o ID do componente
        // no componentData para que possa ser usado nas interações
        if (message.componentData && message.componentId) {
          message.componentData.id = message.componentId;
          console.log(`ID do componente armazenado: ${message.componentId}`);
        }
        // Comportamento original para RENDER_COMPONENT
        callbacks.forEach(callback => callback(message.code || null, message.componentData, message.componentId));
      } else {
        // Para outros tipos de mensagens, mantemos o comportamento original
        callbacks.forEach(callback => callback(message.code || null, message.componentData, message.componentId));
      }
    }
  }

  // Enviar mensagem informando que está pronto
  private sendReadyMessage(): void {
    if (this.ready) return;

    // Pequeno delay para garantir que o aplicativo esteja totalmente carregado
    setTimeout(() => {
      // Enviar apenas para o avô (parent.parent)
      const readyMessage: IFrameMessage = { type: 'READY' };
      this.sendToGrandparent(readyMessage);
      this.ready = true;
      console.log('Mensagem READY enviada');
    }, 500);
  }
}

// Exportar uma instância singleton
export const messageService = MessageService.getInstance();
