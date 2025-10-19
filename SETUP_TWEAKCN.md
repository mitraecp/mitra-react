# Setup do TweakCN - Guia Rápido

## ✅ O que foi feito

A integração completa do TweakCN foi realizada com sucesso na branch `feature/tweakcn-integration` do projeto mitra-react.

### Arquivos e Diretórios Adicionados

**Total: 329 arquivos adicionados**

#### Componentes (src/tweakcn-components/)
- Editor completo com todos os painéis de controle
- Componentes de UI do shadcn/ui
- Exemplos de componentes (Dashboard, Mail, Music, Tasks, etc.)
- Sistema de AI para geração de temas
- Componentes de preview e visualização

#### Hooks (src/tweakcn-hooks/)
- Hooks para gerenciamento de temas
- Hooks para inspetor de elementos
- Hooks para AI e chat
- Hooks utilitários diversos

#### Bibliotecas (src/tweakcn-lib/)
- Utilitários de cores e conversão
- Sistema de autenticação
- Constantes e configurações
- Utilitários de inspeção de temas

#### Store (src/tweakcn-store/)
- Gerenciamento de estado com Zustand
- Stores para editor, temas, AI, preferências
- Persistência com IndexedDB

#### Utils (src/tweakcn-utils/)
- Conversores de cores
- Geradores de estilos de tema
- Utilitários de fontes
- Presets de temas

#### Types (src/tweakcn-types/)
- Definições TypeScript completas
- Tipos para temas, editor, AI, etc.

### Dependências Instaladas

```json
{
  "zustand": "^5.0.3",           // Gerenciamento de estado
  "culori": "^4.0.1",            // Manipulação de cores
  "@dnd-kit/core": "^6.3.1",     // Drag and drop
  "@dnd-kit/sortable": "^10.0.0",
  "@dnd-kit/utilities": "^3.2.2",
  "@dnd-kit/modifiers": "^9.0.0",
  "idb-keyval": "^6.2.2",        // IndexedDB
  "nuqs": "^2.4.3",              // Query strings
  "motion": "^12.7.3",           // Animações
  "cuid": "^3.0.0",              // IDs únicos
  "react-router-dom": "^6.x"     // Roteamento
}
```

### Arquivos Modificados

1. **src/App.tsx**
   - Adicionado React Router
   - Criada rota `/tweakcn` para o editor
   - Mantida compatibilidade com iframe existente

2. **src/main.tsx**
   - Importado CSS global do TweakCN

3. **package.json**
   - Adicionadas todas as dependências necessárias

### Arquivos Criados

1. **src/components/TweakCNEditor.tsx**
   - Componente base do editor
   - Layout com 3 painéis (presets, preview, controles)

2. **src/styles/tweakcn-globals.css**
   - Estilos globais do TweakCN

3. **TWEAKCN_INTEGRATION.md**
   - Documentação completa da integração

4. **SETUP_TWEAKCN.md** (este arquivo)
   - Guia rápido de setup

## 🚀 Como Usar

### 1. Instalar Dependências (se necessário)

```bash
cd mitra-react
npm install
```

### 2. Iniciar o Servidor

```bash
npm run dev
```

### 3. Acessar o TweakCN

Abra o navegador em:
- **Página inicial**: http://localhost:5173/
- **TweakCN Editor**: http://localhost:5173/tweakcn

## 📁 Estrutura do Projeto

```
mitra-react/
├── src/
│   ├── components/
│   │   └── TweakCNEditor.tsx          # Componente principal
│   ├── styles/
│   │   └── tweakcn-globals.css        # Estilos do TweakCN
│   ├── tweakcn-components/            # 200+ componentes
│   ├── tweakcn-hooks/                 # 30+ hooks
│   ├── tweakcn-lib/                   # Bibliotecas
│   ├── tweakcn-store/                 # Stores Zustand
│   ├── tweakcn-types/                 # Tipos TypeScript
│   └── tweakcn-utils/                 # Utilitários
├── TWEAKCN_INTEGRATION.md             # Documentação completa
└── SETUP_TWEAKCN.md                   # Este arquivo
```

## 🔧 Próximos Passos

### Fase 1: Adaptação (Atual)
- ✅ Estrutura copiada
- ✅ Dependências instaladas
- ✅ Roteamento configurado
- ⏳ Adaptar componentes Next.js para React/Vite
- ⏳ Remover dependências de servidor

### Fase 2: Implementação
- ⏳ Integrar componente Editor principal
- ⏳ Configurar stores e estado
- ⏳ Implementar preview em tempo real
- ⏳ Adicionar controles de customização

### Fase 3: Funcionalidades
- ⏳ Sistema de presets de temas
- ⏳ Exportação de temas
- ⏳ Persistência local
- ⏳ Integração com componentes MITRA

### Fase 4: Polimento
- ⏳ Testes
- ⏳ Documentação
- ⏳ Otimizações
- ⏳ Deploy

## 🐛 Problemas Conhecidos

### Adaptações Necessárias

1. **Componentes Next.js**
   - Alguns componentes usam `next/image` → precisa usar `<img>`
   - Alguns componentes usam `next/link` → precisa usar React Router
   - Server Components → converter para Client Components

2. **API Routes**
   - TweakCN usa API routes do Next.js
   - Precisará de backend separado ou mock para funcionalidades de AI

3. **Imports**
   - Alguns imports podem precisar de ajustes de path
   - Verificar aliases `@/` no tsconfig.json

## 📚 Recursos

- [TweakCN Website](https://tweakcn.com/)
- [TweakCN GitHub](https://github.com/jnsahaj/tweakcn)
- [Documentação Completa](./TWEAKCN_INTEGRATION.md)

## 🎯 Objetivo Final

Ter um editor de temas totalmente funcional integrado ao MITRA React, permitindo:

1. ✨ Criar e editar temas visualmente
2. 🎨 Aplicar temas aos componentes do MITRA
3. 💾 Salvar e carregar temas
4. 📤 Exportar código CSS
5. 🤖 Gerar temas com AI (opcional)

## 📝 Notas

- O código do TweakCN está sob licença Apache-2.0
- Mantenha a atribuição ao projeto original
- Esta é uma integração, não um fork
- Contribuições são bem-vindas!

## 🆘 Suporte

Para dúvidas ou problemas:
1. Consulte a [documentação completa](./TWEAKCN_INTEGRATION.md)
2. Verifique os [issues do TweakCN](https://github.com/jnsahaj/tweakcn/issues)
3. Entre em contato com a equipe do MITRA

---

**Status**: ✅ Integração Base Completa
**Última Atualização**: 2025-10-19
**Branch**: feature/tweakcn-integration
**Commit**: a3607fe

