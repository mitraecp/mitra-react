/**
 * Transpilador para converter JSX em JavaScript válido usando Babel
 */
import * as Babel from '@babel/standalone';

/**
 * Função para transpilar JSX em JavaScript válido usando Babel
 */
export function transformJSX(code: string): string {
  try {
    // Configurar o Babel para transpilar JSX
    const result = Babel.transform(code, {
      presets: ['react'],
      filename: 'dynamic-component.jsx',
      ast: false,
      retainLines: true,
    });

    // Retornar o código transpilado
    return result.code || code;
  } catch (error) {
    console.error("Erro ao transpilar JSX com Babel:", error);
    throw error; // Propagar o erro para tratamento adequado
  }
}

/**
 * Função para verificar se o código contém JSX
 */
export function containsJSX(code: string): boolean {
  // Verifica se o código contém tags JSX
  return /<[a-zA-Z][\s\S]*?>[\s\S]*?<\/[a-zA-Z][\s\S]*?>/g.test(code) ||
         /<[a-zA-Z][\s\S]*?\/>/g.test(code);
}

/**
 * Função para sanitizar o código JSX antes da transformação
 */
export function sanitizeJSXCode(code: string): string {
  // Remove espaços em branco extras
  let sanitized = code.trim();

  // Normaliza aspas
  sanitized = sanitized.replace(/'/g, '"');

  // Garante que className esteja correto
  sanitized = sanitized.replace(/class=/g, 'className=');

  // Garante que onClick esteja correto
  sanitized = sanitized.replace(/onclick=/g, 'onClick=');

  return sanitized;
}

/**
 * Função para extrair o componente de uma string de código
 * Suporta vários padrões de declaração de componentes
 */
export function extractComponent(code: string): string {
  // 1) Tenta capturar arrow functions com bloco
  const arrowWithBlock = code.match(/const\s+Component\s*=\s*\(\)\s*=>\s*{([\s\S]*?)};?/);
  if (arrowWithBlock) {
    return `const Component = () => {${arrowWithBlock[1]}};`;
  }

  // 2) Tenta capturar arrow functions com return implícito
  const arrowImplicit = code.match(/const\s+Component\s*=\s*\(\)\s*=>\s*\(([\s\S]*?)\);?/);
  if (arrowImplicit) {
    return `const Component = () => (${arrowImplicit[1]});`;
  }

  // 3) Tenta capturar funções declaradas
  const functionDeclaration = code.match(/(export\s+default\s+)?function\s+Component\s*\([^)]*\)\s*{([\s\S]*?)\}\s*;?/);
  if (functionDeclaration) {
    return `function Component() {${functionDeclaration[2]}}`;
  }

  // 4) Tenta capturar export default Component no final
  const exportDefault = code.match(/const\s+Component\s*=\s*[\s\S]*?;\s*export\s+default\s+Component\s*;?/);
  if (exportDefault) {
    return exportDefault[0];
  }

  // 5) Método original como fallback
  const componentMatch = code.match(/const\s+Component\s*=\s*(\([^)]*\)\s*=>|function\s*\([^)]*\))\s*{/);
  if (componentMatch && componentMatch.index !== undefined) {
    // Encontra o corpo da função
    let braceCount = 0;
    const startIndex = code.indexOf('{', componentMatch.index);
    let endIndex = startIndex;

    for (let i = startIndex; i < code.length; i++) {
      if (code[i] === '{') braceCount++;
      if (code[i] === '}') braceCount--;

      if (braceCount === 0) {
        endIndex = i + 1;
        break;
      }
    }

    return code.substring(componentMatch.index, endIndex);
  }

  // Fallback: devolve o código original e deixa o wrapCodeInModule cuidar
  console.log('Nenhum padrão de componente reconhecido, usando código original');
  return code;
}

/**
 * Função para envolver o código em um módulo para evitar conflitos de escopo
 */
export function wrapCodeInModule(code: string): string {
  return `
    (function() {
      ${code}
      return Component;
    })()
  `;
}
