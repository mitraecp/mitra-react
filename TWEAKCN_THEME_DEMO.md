# 🎨 TweakCN Theme Demo

## Visão Geral

Esta demonstração mostra como aplicar temas do **TweakCN** aos componentes **Shadcn UI** em tempo real através do sistema de mensagens `postMessage` do MITRA.

## 📁 Arquivos Criados/Modificados

### Novos Arquivos

1. **`tweakcn-theme-demo.html`**
   - Página HTML de demonstração
   - Interface para selecionar temas
   - Toggle entre modo Light/Dark
   - Iframe que carrega o MITRA React

### Arquivos Modificados

1. **`src/lib/message-service.ts`**
   - Adicionado parâmetro `theme` na interface `IFrameMessage`
   - Atualizado tipo dos listeners para aceitar `theme`
   - Modificado `handleMessage` para passar o tema aos callbacks

2. **`src/App.tsx`**
   - Adicionada função `hexToHSL()` para converter cores
   - Adicionada função `applyTheme()` para aplicar variáveis CSS
   - Atualizado listener `RENDER_COMPONENT` para processar temas

## 🚀 Como Usar

### 1. Abrir a Demo

Abra o arquivo `tweakcn-theme-demo.html` no navegador:

```bash
open mitra-react/tweakcn-theme-demo.html
```

Ou arraste o arquivo para o navegador.

### 2. Selecionar um Tema

A interface mostra 4 temas pré-configurados:

- **Modern Minimal** - Design limpo e moderno com azul
- **Violet Bloom** - Tema vibrante com roxo/violeta
- **Ocean Breeze** - Inspirado no oceano com tons de azul
- **Sunset Glow** - Tons quentes de laranja e amarelo

Clique em qualquer tema para aplicá-lo instantaneamente.

### 3. Alternar Modo de Cor

Use os botões **☀️ Light** e **🌙 Dark** para alternar entre os modos claro e escuro.

Cada tema tem configurações diferentes para cada modo!

## 🔧 Como Funciona

### Arquitetura

```
┌─────────────────────────────────────┐
│  tweakcn-theme-demo.html            │
│  ┌───────────────────────────────┐  │
│  │ Theme Selector                │  │
│  │ - Modern Minimal              │  │
│  │ - Violet Bloom                │  │
│  │ - Ocean Breeze                │  │
│  │ - Sunset Glow                 │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │ Mode Toggle: Light / Dark     │  │
│  └───────────────────────────────┘  │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ iframe (MITRA React)          │  │
│  │                               │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │ Shadcn UI Components    │  │  │
│  │  │ - Buttons               │  │  │
│  │  │ - Cards                 │  │  │
│  │  │ - Inputs                │  │  │
│  │  │ - Alerts                │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
         │
         │ postMessage
         ▼
{
  type: 'RENDER_COMPONENT',
  payload: componentCode,
  theme: {
    background: "#ffffff",
    foreground: "#333333",
    primary: "#3b82f6",
    ...
  }
}
         │
         ▼
┌─────────────────────────────────────┐
│  MITRA React (App.tsx)              │
│                                     │
│  messageService.addListener()       │
│         │                           │
│         ▼                           │
│  applyTheme(theme)                  │
│         │                           │
│         ▼                           │
│  hexToHSL() - Converte cores        │
│         │                           │
│         ▼                           │
│  document.documentElement           │
│    .style.setProperty()             │
│         │                           │
│         ▼                           │
│  CSS Variables atualizadas:         │
│  --background: 0 0% 100%            │
│  --foreground: 0 0% 20%             │
│  --primary: 217 91% 60%             │
│  ...                                │
└─────────────────────────────────────┘
```

### Fluxo de Dados

1. **Usuário seleciona tema** → JavaScript captura o evento
2. **Tema é extraído** → Objeto com cores e configurações
3. **postMessage enviado** → Mensagem com tipo `RENDER_COMPONENT` + `theme`
4. **MITRA recebe mensagem** → `messageService` processa
5. **Tema é aplicado** → Função `applyTheme()` converte cores e atualiza CSS
6. **Componentes re-renderizam** → Com novas cores aplicadas

### Estrutura do Tema

Cada tema tem a seguinte estrutura:

```javascript
{
  label: "Nome do Tema",
  light: {
    background: "#ffffff",
    foreground: "#333333",
    card: "#ffffff",
    "card-foreground": "#333333",
    primary: "#3b82f6",
    "primary-foreground": "#ffffff",
    secondary: "#f3f4f6",
    "secondary-foreground": "#4b5563",
    muted: "#f9fafb",
    "muted-foreground": "#6b7280",
    accent: "#e0f2fe",
    "accent-foreground": "#1e3a8a",
    destructive: "#ef4444",
    "destructive-foreground": "#ffffff",
    border: "#e5e7eb",
    input: "#e5e7eb",
    ring: "#3b82f6",
    radius: "0.5rem"
  },
  dark: {
    // Mesmas propriedades com cores para modo escuro
  }
}
```

### Conversão de Cores

As cores são enviadas em formato **HEX** (`#3b82f6`) e convertidas para **HSL** (`217 91% 60%`) porque o Tailwind CSS usa HSL nas variáveis CSS.

A função `hexToHSL()` faz essa conversão:

```typescript
function hexToHSL(hex: string): string {
  // Converte #3b82f6 → "217 91% 60%"
}
```

### Aplicação do Tema

A função `applyTheme()` mapeia as propriedades do tema para variáveis CSS:

```typescript
function applyTheme(theme: any) {
  const root = document.documentElement;
  
  // background → --background
  // primary → --primary
  // etc...
  
  root.style.setProperty('--background', hexToHSL(theme.background));
  root.style.setProperty('--primary', hexToHSL(theme.primary));
  // ...
}
```

## 🎯 Componentes Demonstrados

A demo renderiza os seguintes componentes Shadcn UI:

- **Card** - Container principal
- **Button** - Variantes: primary, secondary, outline, destructive
- **Input** - Campo de texto
- **Label** - Rótulos
- **Switch** - Toggle
- **Alert** - Mensagens de alerta

Todos esses componentes usam as variáveis CSS do tema!

## 🔌 Integração com TweakCN Editor

Esta demo pode ser facilmente integrada com o **TweakCN Editor** (`/tweakcn`):

1. Usuário cria/edita tema no TweakCN Editor
2. Tema é exportado como objeto JavaScript
3. Objeto é enviado via `postMessage` com parâmetro `theme`
4. Componentes são atualizados em tempo real

## 📝 Exemplo de Uso Programático

```javascript
// Enviar tema customizado
const customTheme = {
  background: "#1a1a1a",
  foreground: "#ffffff",
  primary: "#ff6b6b",
  "primary-foreground": "#ffffff",
  // ... outras propriedades
};

iframe.contentWindow.postMessage({
  type: 'RENDER_COMPONENT',
  payload: componentCode,
  theme: customTheme
}, '*');
```

## 🎨 Adicionando Novos Temas

Para adicionar um novo tema na demo, edite `tweakcn-theme-demo.html`:

```javascript
const themes = {
  // ... temas existentes
  
  "meu-tema": {
    label: "Meu Tema Customizado",
    light: {
      background: "#...",
      foreground: "#...",
      // ... todas as propriedades
    },
    dark: {
      // ... versão dark
    }
  }
};
```

## 🚀 Próximos Passos

1. **Integrar com TweakCN Editor**
   - Exportar tema do editor
   - Enviar para preview em tempo real

2. **Adicionar mais temas**
   - Importar todos os presets do TweakCN
   - Permitir temas customizados

3. **Persistência**
   - Salvar tema selecionado no localStorage
   - Carregar automaticamente na próxima visita

4. **Exportação**
   - Exportar tema como CSS
   - Exportar tema como JSON
   - Copiar para clipboard

## 📚 Referências

- [TweakCN](https://tweakcn.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PostMessage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)

---

**Criado em**: 2025-10-19
**Versão**: 1.0.0

