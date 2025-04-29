# Guia de Uso - WebContainer IDE

Este guia explica como usar o WebContainer IDE para desenvolver aplicações web diretamente no navegador.

## Iniciando

Ao abrir o WebContainer IDE, você verá uma interface dividida em três painéis principais:

1. **Explorador de Arquivos** (esquerda): Lista de arquivos e pastas do projeto
2. **Editor de Código** (centro): Editor para modificar arquivos
3. **Visualização** (direita): Visualização da aplicação em execução

## Explorador de Arquivos

### Navegação
- Clique em uma pasta para expandir/recolher seu conteúdo
- Clique em um arquivo para abri-lo no editor

### Operações com Arquivos
- **Criar Arquivo**: Clique no botão "+📄" na barra superior ou ao lado de uma pasta
- **Criar Pasta**: Clique no botão "+📁" na barra superior ou ao lado de uma pasta
- **Renomear**: Clique no botão "✏️" ao lado do arquivo/pasta
- **Excluir**: Clique no botão "🗑️" ao lado do arquivo/pasta

## Editor de Código

O editor suporta várias linguagens com destaque de sintaxe, incluindo:
- JavaScript/TypeScript
- HTML
- CSS
- JSON
- Markdown

### Atalhos de Teclado
- **Salvar**: Ctrl+S (Cmd+S no Mac)
- **Buscar**: Ctrl+F (Cmd+F no Mac)
- **Substituir**: Ctrl+H (Cmd+H no Mac)
- **Desfazer**: Ctrl+Z (Cmd+Z no Mac)
- **Refazer**: Ctrl+Shift+Z (Cmd+Shift+Z no Mac)

## Terminal

O terminal interativo permite executar comandos no ambiente Node.js:

- Instalar pacotes: `npm install <pacote>`
- Executar scripts: `npm run <script>`
- Comandos do sistema de arquivos: `ls`, `cd`, etc.

## Servidor de Desenvolvimento

Para iniciar o servidor de desenvolvimento:

1. Clique no botão "Iniciar Servidor" na barra superior
2. O terminal mostrará o progresso da inicialização
3. Quando o servidor estiver pronto, a visualização será atualizada automaticamente

## Exemplos de Uso

### Criar uma Aplicação React

1. Crie um arquivo `App.jsx` com o seguinte conteúdo:
```jsx
import React from 'react';

function App() {
  return (
    <div>
      <h1>Minha Aplicação React</h1>
      <p>Criada no WebContainer IDE</p>
    </div>
  );
}

export default App;
```

2. Crie um arquivo `index.jsx` para renderizar o componente:
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

3. Crie um arquivo `index.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Minha Aplicação React</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="./index.jsx"></script>
</body>
</html>
```

4. Instale as dependências no terminal:
```
npm install react react-dom
```

5. Inicie o servidor de desenvolvimento

### Criar uma Aplicação Node.js

1. Crie um arquivo `server.js`:
```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from WebContainer IDE!');
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
```

2. Execute o servidor no terminal:
```
node server.js
```

## Dicas e Truques

- **Redimensionar Painéis**: Arraste as bordas entre os painéis para redimensioná-los
- **Visualizar Logs**: Os logs da aplicação aparecem no terminal
- **Instalar Dependências**: Use `npm install` no terminal para adicionar pacotes
- **Reiniciar Servidor**: Se o servidor travar, clique em "Iniciar Servidor" novamente

## Solução de Problemas

### O servidor não inicia
- Verifique se o arquivo `package.json` tem um script `start` válido
- Verifique se todas as dependências estão instaladas

### A visualização não atualiza
- Verifique se o servidor está em execução (indicador verde na barra superior)
- Tente recarregar a visualização manualmente

### Erros no terminal
- Leia a mensagem de erro para identificar o problema
- Verifique a sintaxe do seu código
- Verifique se todas as dependências estão instaladas corretamente
