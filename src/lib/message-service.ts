/* eslint-disable @typescript-eslint/no-explicit-any */
// Tipos de mensagens que podem ser trocadas entre pai e filho
export type MessageType =
  | "RENDER_COMPONENT"
  | "COMPONENT_RENDERED"
  | "ERROR"
  | "LOG"
  | "READY"
  | "INTERACTIONS_MITRA"
  | "UPDATECOMPONENTS_RESPONSE"
  | "QUERY_RESPONSE"
  | "ACTION_RESPONSE"
  | "FORM_RESPONSE"
  | "DBACTION_RESPONSE"
  | "VARIABLE_RESPONSE"
  | "UPLOAD_RESPONSE"
  | "GOTOSCREEN_RESPONSE";

// Interface para as mensagens trocadas
export interface IFrameMessage {
  // typePostMessage?: string | null;
  type: MessageType;
  code?: string | null;
  componentId?: string | null;
  componentData?: any | null;
  payload?: any | null;
  requestId?: string | null; // ID para correlacionar requisições e respostas
  error?: {
    message: string;
    stack?: string;
  } | null; // Informações de erro para respostas de erro
}

// Classe para gerenciar a comunicação postMessage
// Interface para armazenar promessas pendentes
interface PendingQuery {
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
  timeout: NodeJS.Timeout;
}

const isSafari = (() => {
  const ua = navigator.userAgent || "";

  const isIOS = /(iPhone|iPad|iPod)/i.test(ua);

  // Qualquer WebKit em iOS que não seja Chrome/Edge/Firefox/Opera
  const isIOSWebKit =
    isIOS && /AppleWebKit/i.test(ua) && !/(CriOS|FxiOS|OPiOS|EdgiOS)/i.test(ua);

  // Safari “de verdade”: tem Safari, mas NÃO tem Chrome/Chromium/Edge/Opera/Brave
  const isDesktopSafari =
    !isIOS &&
    /Safari/i.test(ua) &&
    !/(Chrome|Chromium|Edg|OPR|Brave)/i.test(ua);

  // Mobile Safari (iOS/iPadOS) — cobre iPad em modo “desktop”
  const isMobileSafari =
    /(iPhone|iPad|iPod)/i.test(ua) &&
    /Safari/i.test(ua) &&
    !/(CriOS|EdgiOS|FxiOS|OPiOS)/i.test(ua);

  return isDesktopSafari || isMobileSafari || isIOSWebKit;
})();

// Ative o replay só no Safari
const ENABLE_RENDER_REPLAY_SAFARI = isSafari;

export class MessageService {
  private static instance: MessageService;
  private listeners: Map<
    MessageType,
    Array<
      (
        code: string | null,
        componentData?: any | null,
        componentId?: string | null
      ) => void
    >
  > = new Map();
  private pendingQueries: Map<string, PendingQuery> = new Map();
  private ready = false;
  private queryTimeoutMs = 480000; // 8 minutos de timeout para consultas

  private lastRenderMsg: {
    code: string | null;
    componentData?: any | null;
    componentId?: string | null;
  } | null = null;

  private constructor() {
    // Configurar o listener de mensagens
    window.addEventListener("message", this.handleMessage.bind(this));
    window.addEventListener("keydown", (event) => {
      if (event.ctrlKey && event.key === "b") {
        window.parent.postMessage(
          JSON.stringify({
            value: "tooglePreviewMode",
          }),
          "*"
        );
      }
    });

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
  public sendMessage(
    type: MessageType,
    code?: string | null,
    componentData?: any | null,
    componentId?: string | null,
    payload?: any | null
  ): void {
    const message: IFrameMessage = {
      type,
      code,
      componentId,
      componentData,
      payload,
    };

    // Usar a função que envia para qualquer nível de pai possível ou irmão
    this.sendToParentOrSibling(message);
  }

  // Função para enviar mensagem para qualquer nível de pai possível ou irmão
  private sendToParentOrSibling(message: any): void {
    try {
      // Adicionar um ID único para a mensagem para rastreamento
      const messageWithId = {
        ...message,
      };

      // Primeiro tentar enviar para o pai direto (window.parent)
      if (window.parent && window.parent !== window) {
        window.parent.postMessage(messageWithId, "*");
        console.log(
          "Mensagem enviada para window.parent (pai direto):",
          messageWithId
        );

        // Continuar tentando outros alvos para garantir que a mensagem chegue
      }

      // Tentar enviar para window.top (nível mais alto)
      if (window.top && window.top !== window && window.top !== window.parent) {
        window.top.postMessage(messageWithId, "*");
        console.log("Mensagem enviada para window.top:", messageWithId);
      }

      // Tentar enviar para qualquer nível de pai disponível
      let currentParent = window.parent;
      let level = 1;

      while (currentParent && currentParent !== window) {
        // Já enviamos para window.parent no início, então só enviamos para os pais de nível superior
        if (level > 1) {
          currentParent.postMessage(messageWithId, "*");
          console.log(
            `Mensagem enviada para window.parent (nível ${level}):`,
            messageWithId
          );
        }

        // Tentar ir para o próximo nível de pai, se existir
        level++;
        try {
          // Algumas vezes, acessar parent pode lançar erro de segurança
          const nextParent = currentParent.parent;
          if (!nextParent || nextParent === currentParent) break;
          currentParent = nextParent;
        } catch {
          // Se não conseguir acessar o próximo nível, parar
          break;
        }
      }

      // Se chegamos aqui e não enviamos para nenhum pai, registrar um aviso
      if (
        level === 1 &&
        (!window.parent || window.parent === window) &&
        (!window.top || window.top === window)
      ) {
        console.log(
          "Não foi possível enviar mensagem: nenhum frame pai está disponível"
        );
      }
    } catch (error) {
      console.error("Erro ao tentar enviar mensagem:", error);
    }
  }

  // Método específico para enviar interações para o componente pai Vue
  public sendInteraction(
    interactionType: string,
    interactionData: any,
    componentId?: string | null
  ): void | Promise<any> {
    // Usar o componentId passado como parâmetro ou obter do componentData global como fallback
    const actualComponentId =
      componentId || window.componentId || window.componentData?.id;

    // Verificar se temos um componentId válido
    if (!actualComponentId) {
      console.warn(
        "Aviso: Tentando enviar interação sem componentId. A mensagem pode não ser processada pelo Vue."
      );
    }

    // Lista de tipos de interações que são assíncronas
    const asyncInteractions = [
      "query",
      "action",
      "form",
      "dbaction",
      "variable",
      "goToScreen",
      "variableQuery",
      "upload",
      "updateComponents",
    ];

    // Se for uma interação assíncrona, retornar uma Promise
    if (asyncInteractions.includes(interactionType)) {
      return this.sendAsyncInteraction(
        interactionType,
        interactionData,
        actualComponentId
      );
    }

    // Para outros tipos de interações, manter o comportamento atual
    // Estrutura a mensagem no formato simplificado que o Vue espera
    const mitraMessage: IFrameMessage = {
      type: "INTERACTIONS_MITRA",
      payload: {
        type: interactionType,
        ...interactionData, // Espalhar os dados diretamente, sem aninhamento em 'data'
      },
      componentId: actualComponentId,
    };

    // Registrar a mensagem que está sendo enviada para debug
    console.log(
      `Enviando interação ${interactionType} para componentId: ${actualComponentId}`,
      mitraMessage
    );

    // Enviar a mensagem para qualquer nível de pai possível ou irmão
    this.sendToParentOrSibling(mitraMessage);
  }

  // Método específico para enviar interações assíncronas e retornar uma Promise
  private sendAsyncInteraction(
    interactionType: string,
    interactionData: any,
    componentId?: string | null
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        // Verificar se temos um componentId válido
        if (!componentId) {
          console.warn(
            "Aviso: Tentando enviar interação assíncrona sem componentId. A mensagem pode não ser processada pelo Vue."
          );
        }

        // Gerar um ID único para a interação
        const requestId = `${interactionType}_${Date.now()}_${Math.random()
          .toString(36)
          .substring(2, 9)}`;

        // Estruturar a mensagem de interação
        const asyncMessage: IFrameMessage = {
          type: "INTERACTIONS_MITRA",
          payload: {
            type: interactionType,
            ...interactionData,
            requestId, // Incluir o ID da requisição no payload
          },
          componentId,
          requestId, // Incluir o ID da requisição na mensagem principal também
        };

        // Configurar um timeout para a interação
        const timeout = setTimeout(() => {
          // Se a interação não for respondida dentro do tempo limite, remover a promessa pendente
          if (this.pendingQueries.has(requestId)) {
            this.pendingQueries.delete(requestId);
            reject(
              new Error(
                `Timeout ao aguardar resposta da interação ${interactionType} (ID: ${requestId})`
              )
            );
          }
        }, this.queryTimeoutMs);

        // Armazenar a promessa pendente
        this.pendingQueries.set(requestId, {
          resolve,
          reject,
          timeout,
        });

        // Enviar a mensagem
        console.log(
          `Enviando interação assíncrona ${interactionType} para componentId: ${componentId} (ID: ${requestId}):`,
          asyncMessage
        );
        this.sendToParentOrSibling(asyncMessage);
      } catch (error) {
        // Se ocorrer algum erro ao enviar a interação, rejeitar a promessa
        reject(error);
      }
    });
  }

  // Adicionar um listener para um tipo específico de mensagem
  public addListener(
    type: MessageType,
    callback: (
      code: string | null,
      componentData?: any | null,
      componentId?: string | null
    ) => void
  ): () => void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }

    this.listeners.get(type)?.push(callback);

    // Caso Safari
    // 👉 Se o listener é para RENDER_COMPONENT e já temos uma mensagem em buffer,
    // entregue-a imediatamente (em microtask para não quebrar a ordem de montagem).
    if (
      ENABLE_RENDER_REPLAY_SAFARI &&
      type === "RENDER_COMPONENT" &&
      this.lastRenderMsg
    ) {
      const { code, componentData, componentId } = this.lastRenderMsg;
      Promise.resolve().then(() => callback(code, componentData, componentId));
    }

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
    if (event.data.typePostMessage === "SET_SCREEN_CONTEXT") {
      window.parent.postMessage(event.data, "*");
    }

    if (!message || !message.type) {
      return;
    }

    // Registrar a origem da mensagem para debug
    const origin = event.origin || "desconhecida";
    const source = event.source ? "window" : "desconhecido";
    console.log(`Mensagem recebida de ${source} (origem: ${origin}):`, message);

    // "SEND_REACT_ERROR_TO_FIX"
    if (event.data.type === "SEND_REACT_ERROR_TO_FIX") {
      window.parent.postMessage(event.data, "*");
    }

    if (event.data.typePostMessage === "DANIEL_VAGABUNDO_MESSAGE") {
      window.parent.postMessage(event.data, "*");
      return;
    }

    // Verificar se é uma resposta de interação assíncrona (formato padrão)
    if (
      message.requestId &&
      (message.type === "UPDATECOMPONENTS_RESPONSE" ||
        message.type === "QUERY_RESPONSE" ||
        message.type === "ACTION_RESPONSE" ||
        message.type === "FORM_RESPONSE" ||
        message.type === "DBACTION_RESPONSE" ||
        message.type === "VARIABLE_RESPONSE" ||
        message.type === "GOTOSCREEN_RESPONSE" ||
        message.type === "UPLOAD_RESPONSE")
    ) {
      this.handleAsyncResponse(message);
      return;
    }

    // Verificar se é uma resposta no formato INTERACTIONS_MITRA
    if (
      message.type === "INTERACTIONS_MITRA" &&
      message.payload &&
      message.payload.requestId &&
      (message.payload.type === "query_response" ||
        message.payload.type === "action_response" ||
        message.payload.type === "form_response" ||
        message.payload.type === "dbaction_response" ||
        message.payload.type === "variable_response" ||
        message.payload.type === "goToScreen_response")
    ) {
      this.handleAsyncResponseLegacy(message);
      return;
    }

    // 1) bufferizar somente no (Safari)
    if (ENABLE_RENDER_REPLAY_SAFARI && message.type === "RENDER_COMPONENT") {
      // 👉 bufferiza a última payload
      this.lastRenderMsg = {
        code: message.code ?? null,
        componentData: message.componentData,
        componentId: message.componentId ?? null,
      };
    }

    const callbacks = this.listeners.get(message.type);
    if (callbacks) {
      if (message.type === "INTERACTIONS_MITRA") {
        // Para interações, passamos o payload como primeiro parâmetro
        // O payload já contém o tipo e os dados diretamente
        callbacks.forEach((callback) =>
          callback(null, message.payload, message.componentId)
        );
      } else if (message.type === "RENDER_COMPONENT") {
        // Quando recebemos uma mensagem RENDER_COMPONENT, armazenamos o ID do componente
        // no componentData para que possa ser usado nas interações
        if (message.componentData && message.componentId) {
          message.componentData.id = message.componentId;
          console.log(`ID do componente armazenado: ${message.componentId}`);
        }
        // Comportamento original para RENDER_COMPONENT
        callbacks.forEach((callback) =>
          callback(
            message.code || null,
            message.componentData,
            message.componentId
          )
        );
      } else {
        // Para outros tipos de mensagens, mantemos o comportamento original
        callbacks.forEach((callback) =>
          callback(
            message.code || null,
            message.componentData,
            message.componentId
          )
        );
      }
    }
  }

  // Processar respostas de interações assíncronas
  private handleAsyncResponse(message: IFrameMessage): void {
    const requestId = message.requestId;
    if (!requestId || !this.pendingQueries.has(requestId)) {
      console.warn(
        `Resposta assíncrona recebida para ID desconhecido: ${requestId}`
      );
      return;
    }

    const pendingQuery = this.pendingQueries.get(requestId)!;

    // Limpar o timeout
    clearTimeout(pendingQuery.timeout);

    // Remover a consulta pendente
    this.pendingQueries.delete(requestId);

    // Verificar se a resposta contém um erro
    if (message.error) {
      console.error(
        `Erro na resposta assíncrona (ID: ${requestId}):`,
        message.error
      );
      pendingQuery.reject(
        new Error(message.error.message || "Erro na interação assíncrona")
      );
      return;
    }

    // Resolver a promessa com os dados da resposta
    console.log(
      `Resposta assíncrona recebida (ID: ${requestId}):`,
      message.payload
    );
    pendingQuery.resolve(message.payload);
  }

  // Processar respostas de interações assíncronas no formato legacy (INTERACTIONS_MITRA)
  private handleAsyncResponseLegacy(message: IFrameMessage): void {
    if (!message.payload || !message.payload.requestId) {
      return;
    }

    const requestId = message.payload.requestId;
    if (!this.pendingQueries.has(requestId)) {
      console.warn(
        `Resposta assíncrona legacy recebida para ID desconhecido: ${requestId}`
      );
      return;
    }

    const pendingQuery = this.pendingQueries.get(requestId)!;

    // Limpar o timeout
    clearTimeout(pendingQuery.timeout);

    // Remover a consulta pendente
    this.pendingQueries.delete(requestId);

    // Verificar se a resposta contém um erro
    if (message.payload.error) {
      console.error(
        `Erro na resposta assíncrona legacy (ID: ${requestId}):`,
        message.payload.error
      );
      pendingQuery.reject(
        new Error(
          message.payload.error.message || "Erro na interação assíncrona"
        )
      );
      return;
    }

    // Resolver a promessa com os dados da resposta
    console.log(
      `Resposta assíncrona legacy recebida (ID: ${requestId}):`,
      message.payload
    );
    pendingQuery.resolve(
      message.payload.data || message.payload.result || message.payload
    );
  }

  // Enviar mensagem informando que está pronto
  private sendReadyMessage(): void {
    if (this.ready) return;

    // Pequeno delay para garantir que o aplicativo esteja totalmente carregado
    setTimeout(() => {
      // Enviar mensagem READY para qualquer nível de pai possível
      const readyMessage: IFrameMessage = {
        type: "READY",
        // Incluir o componentId se disponível para garantir que o Vue possa identificar o componente
        componentId: window.componentData?.id || null,
      };
      this.sendToParentOrSibling(readyMessage);
      this.ready = true;
      console.log("Mensagem READY enviada", readyMessage);
    }, 500);
  }
}

// Exportar uma instância singleton
export const messageService = MessageService.getInstance();
