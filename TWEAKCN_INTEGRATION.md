# Integração do TweakCN no MITRA React

## O que foi feito

Esta branch (`feature/tweakcn-integration`) integra o [TweakCN](https://tweakcn.com/) - um editor visual de temas para shadcn/ui - no projeto mitra-react.

## Estrutura Adicionada

### Diretórios Copiados do TweakCN

Os seguintes diretórios foram copiados do repositório oficial do TweakCN:

- `src/tweakcn-components/` - Componentes do TweakCN
- `src/tweakcn-hooks/` - Hooks customizados do TweakCN
- `src/tweakcn-lib/` - Bibliotecas e utilitários
- `src/tweakcn-store/` - Gerenciamento de estado (Zustand)
- `src/tweakcn-utils/` - Funções utilitárias
- `src/tweakcn-types/` - Definições de tipos TypeScript

### Arquivos Criados

- `src/components/TweakCNEditor.tsx` - Componente principal do editor
- `src/styles/tweakcn-globals.css` - Estilos globais do TweakCN
- `TWEAKCN_INTEGRATION.md` - Este arquivo

## Dependências Instaladas

As seguintes dependências foram adicionadas ao projeto:

```json
{
  "zustand": "^5.0.3",
  "culori": "^4.0.1",
  "@dnd-kit/core": "^6.3.1",
  "@dnd-kit/sortable": "^10.0.0",
  "@dnd-kit/utilities": "^3.2.2",
  "@dnd-kit/modifiers": "^9.0.0",
  "idb-keyval": "^6.2.2",
  "nuqs": "^2.4.3",
  "motion": "^12.7.3",
  "cuid": "^3.0.0",
  "react-router-dom": "^6.x"
}
```

## Como Usar

### Acessar o Editor

1. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

2. Acesse a rota do TweakCN:
   ```
   http://localhost:5173/tweakcn
   ```

### Navegação

- **Página Inicial** (`/`) - Página padrão com link para o TweakCN
- **TweakCN Editor** (`/tweakcn`) - Editor de temas completo

## Próximos Passos

A integração atual é uma base inicial. Os próximos passos incluem:

1. **Adaptar componentes Next.js para React/Vite**
   - Remover dependências de Next.js (como `next/image`, `next/link`)
   - Ajustar imports de servidor para cliente

2. **Implementar funcionalidades principais**
   - Sistema de presets de temas
   - Preview em tempo real
   - Controles de customização
   - Exportação de temas

3. **Integrar com o sistema existente**
   - Conectar com o sistema de componentes do MITRA
   - Permitir aplicar temas aos componentes existentes

4. **Adicionar persistência**
   - Salvar temas no localStorage
   - Opcionalmente, integrar com backend

## Estrutura do TweakCN Original

O TweakCN é um projeto Next.js com as seguintes características:

- **Framework**: Next.js 15 com App Router
- **Estilização**: Tailwind CSS v4
- **Componentes**: shadcn/ui (Radix UI)
- **Estado**: Zustand
- **Cores**: Culori para manipulação de cores
- **Drag & Drop**: @dnd-kit
- **Persistência**: IndexedDB via idb-keyval

## Recursos do TweakCN

- ✅ Editor visual de temas
- ✅ Presets de temas prontos
- ✅ Preview em tempo real
- ✅ Suporte a modo claro/escuro
- ✅ Customização de cores (HSL, OKLCH)
- ✅ Customização de fontes
- ✅ Customização de raios de borda
- ✅ Customização de sombras
- ✅ Exportação de código CSS
- ✅ Compartilhamento de temas

## Referências

- [TweakCN Website](https://tweakcn.com/)
- [TweakCN GitHub](https://github.com/jnsahaj/tweakcn)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## Notas Técnicas

### Diferenças entre Next.js e Vite/React

O TweakCN foi desenvolvido para Next.js, então algumas adaptações são necessárias:

1. **Roteamento**: Next.js usa file-based routing, enquanto usamos React Router
2. **Server Components**: Next.js tem Server Components, precisamos converter para Client Components
3. **Image Optimization**: Next.js tem `next/image`, precisamos usar `<img>` padrão
4. **API Routes**: Next.js tem API routes integradas, precisamos de backend separado se necessário

### Estado da Integração

- ✅ Estrutura de diretórios copiada
- ✅ Dependências instaladas
- ✅ Roteamento configurado
- ✅ Componente base criado
- ⏳ Componentes do editor (em progresso)
- ⏳ Funcionalidades completas (pendente)
- ⏳ Testes (pendente)

## Contribuindo

Para continuar o desenvolvimento desta integração:

1. Explore os componentes em `src/tweakcn-components/`
2. Adapte os componentes Next.js para React puro
3. Teste as funcionalidades
4. Documente as mudanças

## Licença

O TweakCN é licenciado sob Apache-2.0. Certifique-se de manter a atribuição adequada.

