# Documentação Técnica - WebContainer IDE

Esta documentação técnica descreve a arquitetura, componentes e fluxo de dados do WebContainer IDE.

## Arquitetura

O WebContainer IDE é construído com uma arquitetura baseada em componentes React, com o WebContainer API como núcleo para execução de código Node.js no navegador.

### Diagrama de Componentes

```
+------------------------------------------+
|                WebContainerIDE           |
+------------------------------------------+
|                                          |
|  +------------+  +--------+  +---------+ |
|  |FileExplorer|  |Editor  |  |Preview  | |
|  +------------+  +--------+  +---------+ |
|                                          |
|  +------------+                          |
|  |Terminal    |                          |
|  +------------+                          |
|                                          |
+------------------------------------------+
           |
           v
+------------------------------------------+
|            WebContainer API              |
+------------------------------------------+
|                                          |
|  +-----------+  +----------+  +--------+ |
|  |FileSystem |  |Process   |  |Network | |
|  +-----------+  +----------+  +--------+ |
|                                          |
+------------------------------------------+
```

## Componentes Principais

### WebContainerIDE

Componente principal que integra todos os outros componentes e gerencia o estado global da aplicação.

**Responsabilidades:**
- Inicializar o WebContainer
- Gerenciar o estado dos arquivos
- Coordenar a comunicação entre componentes
- Gerenciar o layout da interface

**Estado:**
- `files`: Estrutura de arquivos do projeto
- `selectedFile`: Arquivo atualmente selecionado
- `fileContent`: Conteúdo do arquivo selecionado
- `previewUrl`: URL para visualização da aplicação
- `loading`: Estado de carregamento
- `terminalOutput`: Saída do terminal
- `isServerRunning`: Estado do servidor

### MonacoEditor

Editor de código baseado no Monaco Editor (mesmo usado pelo VS Code).

**Responsabilidades:**
- Edição de código com destaque de sintaxe
- Autocompletar
- Atalhos de teclado
- Temas (claro/escuro)

**Props:**
- `value`: Conteúdo do arquivo
- `language`: Linguagem do arquivo
- `theme`: Tema do editor
- `onChange`: Callback para alterações
- `onSave`: Callback para salvar

### FileExplorer

Explorador de arquivos para navegar, criar, editar e excluir arquivos e pastas.

**Responsabilidades:**
- Exibir a estrutura de arquivos
- Permitir navegação
- Operações de arquivo (criar, renomear, excluir)

**Props:**
- `files`: Estrutura de arquivos
- `onFileSelect`: Callback para seleção de arquivo
- `onCreateFile`: Callback para criar arquivo
- `onDeleteFile`: Callback para excluir arquivo
- `onRenameFile`: Callback para renomear arquivo
- `selectedFile`: Arquivo selecionado

### Terminal

Terminal interativo para executar comandos no ambiente Node.js.

**Responsabilidades:**
- Exibir saída de comandos
- Permitir entrada de comandos
- Comunicação com o WebContainer

**Props:**
- `onInput`: Callback para entrada de comandos
- `onResize`: Callback para redimensionamento

### Preview

Visualização da aplicação em execução.

**Responsabilidades:**
- Exibir a aplicação em um iframe
- Atualizar quando a URL mudar
- Exibir estado de carregamento

**Props:**
- `url`: URL da aplicação
- `loading`: Estado de carregamento

## Biblioteca WebContainer

A biblioteca WebContainer é o núcleo do IDE, permitindo a execução de código Node.js diretamente no navegador.

### Módulos Principais

#### webcontainer.ts

Módulo que encapsula a API do WebContainer e fornece funções de alto nível para interagir com o ambiente Node.js.

**Funções:**
- `getWebContainerInstance()`: Obtém a instância do WebContainer
- `mountFiles(files)`: Monta arquivos no sistema de arquivos
- `runCommand(command, args)`: Executa um comando
- `getServerUrl(port)`: Obtém a URL de um servidor
- `writeFile(path, content)`: Escreve um arquivo
- `readFile(path)`: Lê um arquivo
- `listFiles(path)`: Lista arquivos em um diretório
- `createDirectory(path)`: Cria um diretório

## Fluxo de Dados

### Inicialização

1. O componente `WebContainerIDE` é montado
2. O WebContainer é inicializado com `getWebContainerInstance()`
3. Os arquivos iniciais são montados com `mountFiles(initialFiles)`
4. As dependências são instaladas com `runCommand('npm', ['install'])`
5. A estrutura de arquivos é carregada com `loadFileStructure()`
6. O servidor de desenvolvimento é iniciado com `startDevServer()`

### Edição de Arquivo

1. O usuário seleciona um arquivo no `FileExplorer`
2. O `WebContainerIDE` lê o conteúdo do arquivo com `readFile(path)`
3. O conteúdo é exibido no `MonacoEditor`
4. O usuário edita o arquivo
5. As alterações são salvas no WebContainer com `writeFile(path, content)`

### Execução de Servidor

1. O usuário clica em "Iniciar Servidor"
2. O `WebContainerIDE` executa `runCommand('npm', ['start'])`
3. A saída do comando é exibida no `Terminal`
4. Quando o servidor está pronto, a URL é obtida com `getServerUrl(port)`
5. A URL é passada para o componente `Preview`
6. A aplicação é exibida no iframe

## Extensibilidade

### Adicionando Novos Componentes

Para adicionar um novo componente:

1. Crie o componente em `src/components/`
2. Importe-o no `WebContainerIDE.tsx`
3. Adicione-o ao layout

### Adicionando Novas Funcionalidades ao WebContainer

Para adicionar novas funcionalidades ao WebContainer:

1. Adicione a função no arquivo `src/lib/webcontainer.ts`
2. Use a API do WebContainer para implementar a funcionalidade
3. Exporte a função para uso nos componentes

## Considerações de Desempenho

- O WebContainer tem um tamanho significativo (~10MB), o que pode afetar o tempo de carregamento inicial
- O Monaco Editor também é grande, considere usar lazy-loading
- O uso de memória pode ser alto para projetos grandes
- Considere usar workers para operações pesadas

## Limitações Conhecidas

- Compatibilidade apenas com navegadores baseados em Chromium
- Algumas APIs do Node.js não são totalmente suportadas
- Não é possível executar binários nativos
- Limitações de recursos do navegador para projetos grandes

## Referências

- [WebContainers API Docs](https://webcontainers.io/api)
- [Monaco Editor Docs](https://microsoft.github.io/monaco-editor/)
- [React Docs](https://reactjs.org/docs/getting-started.html)
- [Split.js Docs](https://split.js.org/)
- [Xterm.js Docs](https://xtermjs.org/docs/)
