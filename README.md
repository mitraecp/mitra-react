# Mitra React - Ambiente de Teste de Componentes

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Dan5py/react-vite-ui/blob/main/LICENSE)

Um ambiente de teste para componentes React com Shadcn UI e Tailwind CSS, permitindo a renderização dinâmica de componentes em um iframe.

> [!NOTE]
> Este projeto é baseado no template React + Vite + TypeScript com Tailwind v3 e Shadcn UI.

## 🎉 Features

- **React** - A JavaScript library for building user interfaces.
- **Vite** - A fast, opinionated frontend build tool.
- **TypeScript** - A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS** - A utility-first CSS framework. (`v3`)
- **Tailwind Prettier Plugin** - A Prettier plugin for formatting Tailwind CSS classes.
- **ESLint** - A pluggable linting utility for JavaScript and TypeScript.
- **PostCSS** - A tool for transforming CSS with JavaScript.
- **Autoprefixer** - A PostCSS plugin to parse CSS and add vendor prefixes.
- **shadcn/ui** - Beautifully designed components that you can copy and paste into your apps.

## ⚙️ Prerequisites

Make sure you have the following installed on your development machine:

- Node.js (version 22 or above)
- pnpm (package manager)

## 🚀 Getting Started

Follow these steps to get started with the Mitra React environment:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/mitra-react.git
   ```

2. Navigate to the project directory:

   ```bash
   cd mitra-react
   ```

3. Install the dependencies:

   ```bash
   pnpm install
   ```

4. Start the development server:

   ```bash
   pnpm dev
   ```

5. Open the test environment:

   ```bash
   # Open the file in your browser
   open parent-test-v2.html
   ```

## 📜 Available Scripts

- pnpm dev - Starts the development server.
- pnpm build - Builds the production-ready code.
- pnpm lint - Runs ESLint to analyze and lint the code.
- pnpm preview - Starts the Vite development server in preview mode.

## 📂 Project Structure

The project structure follows a standard React application layout:

```python
react-vite-ui/
  ├── node_modules/      # Project dependencies
  ├── public/            # Public assets
  ├── src/               # Application source code
  │   ├── components/    # React components
  │   │   └── ui/        # shadc/ui components
  │   ├── styles/        # CSS stylesheets
  │   ├── lib/           # Utility functions
  │   ├── App.tsx        # Application entry point
  │   └── index.tsx      # Main rendering file
  ├── eslint.config.js     # ESLint configuration
  ├── index.html         # HTML entry point
  ├── postcss.config.js  # PostCSS configuration
  ├── tailwind.config.ts # Tailwind CSS configuration
  ├── tsconfig.json      # TypeScript configuration
  └── vite.config.ts     # Vite configuration
```

## 💻 Ambiente de Teste de Componentes

Este projeto inclui um ambiente de teste para componentes React com Shadcn UI e Tailwind CSS.

### Estrutura do Ambiente de Teste

- `parent-test-v2.html`: Página principal que contém o editor de código e o iframe para visualização
- `src/snippets/code-snippets.js`: Biblioteca de exemplos de componentes organizados por categoria
- `src/components/DynamicRenderer.tsx`: Componente React que renderiza dinamicamente o código JSX recebido

### Exemplos disponíveis

- **Básicos**: Botão Simples, Grupo de Botões, Toggle, Contador
- **Layout**: Card, Lista de Cards, Tabs, Accordion, Dashboard
- **Interativos**: Formulário, Login
- **Avançados**: Formulário Complexo, Tabela de Usuários, Accordion com Loading
- **Teste Tailwind**: Teste Tailwind

### Como adicionar novos exemplos

1. Abra o arquivo `src/snippets/code-snippets.js`
2. Adicione seu novo exemplo como uma string
3. Adicione o exemplo ao objeto `codeExamples` no final do arquivo
4. Adicione um botão para o exemplo no arquivo `parent-test-v2.html`

### Compartilhamento de Exemplos

O sistema permite compartilhar exemplos via URL e também carregar exemplos de uma API externa:

1. **Compartilhar via URL**: Ao clicar no botão "Compartilhar", o código atual é codificado na URL, permitindo compartilhar o link
2. **Carregar da API**: O sistema pode carregar exemplos de uma API externa, fornecendo uma biblioteca expandida de componentes

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](https://choosealicense.com/licenses/mit/) file for details.
