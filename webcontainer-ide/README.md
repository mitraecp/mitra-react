# WebContainer IDE

Um ambiente de desenvolvimento online completo baseado em WebContainers e Monaco Editor, similar ao Replit/StackBlitz/Bolt.new.

## Visão Geral

Este projeto implementa um ambiente de desenvolvimento completo no navegador, permitindo:

- Edição de código com destaque de sintaxe e autocompletar
- Execução de código Node.js diretamente no navegador
- Gerenciamento de arquivos e pastas
- Terminal interativo
- Visualização em tempo real da aplicação

## Tecnologias Utilizadas

- **WebContainers API**: Execução de Node.js no navegador
- **Monaco Editor**: Editor de código (mesmo usado pelo VS Code)
- **React**: Interface do usuário
- **Split.js**: Painéis redimensionáveis
- **Xterm.js**: Terminal interativo

## Funcionalidades

- **Editor de Código**: Suporte a múltiplos arquivos, destaque de sintaxe, autocompletar
- **Explorador de Arquivos**: Criar, editar, renomear e excluir arquivos e pastas
- **Terminal**: Terminal interativo para executar comandos
- **Visualização**: Visualização em tempo real da aplicação
- **Gerenciamento de Dependências**: Instalação de pacotes npm

## Como Usar

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Inicie o servidor de desenvolvimento: `npm run dev`
4. Abra o navegador em `http://localhost:5173`

## Limitações

- Funciona apenas em navegadores baseados em Chromium (Chrome, Edge, Brave)
- Algumas APIs do Node.js podem não ser totalmente suportadas
- Não é possível executar binários nativos
- Limitações de recursos do navegador para projetos muito grandes

## Arquitetura

O projeto é organizado em componentes principais:

- **WebContainerIDE**: Componente principal que integra todos os outros
- **MonacoEditor**: Editor de código baseado no Monaco Editor
- **FileExplorer**: Explorador de arquivos
- **Terminal**: Terminal interativo
- **Preview**: Visualização da aplicação

A comunicação entre o editor e o WebContainer é feita através de uma API que permite:

- Montar arquivos no sistema de arquivos virtual
- Executar comandos no ambiente Node.js
- Ler e escrever arquivos
- Iniciar servidores e obter URLs para visualização

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

MIT
