/**
 * Mini-transpilador para converter JSX em chamadas de função React.createElement
 * Esta é uma versão simplificada que lida com casos básicos de JSX
 */

export function transformJSX(code: string): string {
  try {
    // Substituir tags JSX por chamadas React.createElement
    let transformed = code;
    
    // Substituir <Component> por React.createElement(Component
    transformed = transformed.replace(/<([A-Z][a-zA-Z0-9]*)/g, 'React.createElement($1');
    
    // Substituir <div> por React.createElement("div"
    transformed = transformed.replace(/<([a-z][a-zA-Z0-9]*)/g, 'React.createElement("$1"');
    
    // Substituir /> por )
    transformed = transformed.replace(/\/>/g, ')');
    
    // Substituir > por )
    transformed = transformed.replace(/>\s*([^<]*)\s*<\//g, ', "$1")');
    
    // Substituir </tag> por )
    transformed = transformed.replace(/<\/[a-zA-Z0-9]*>/g, ')');
    
    // Substituir className="..." por {className: "..."}
    transformed = transformed.replace(/className="([^"]*)"/g, '{className: "$1"}');
    
    // Substituir onClick={...} por {onClick: ...}
    transformed = transformed.replace(/onClick={\s*\(\)\s*=>\s*([^}]*)\s*}/g, '{onClick: () => $1}');
    
    return transformed;
  } catch (error) {
    console.error("Erro ao transformar JSX:", error);
    return code; // Retorna o código original em caso de erro
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
 */
export function extractComponent(code: string): string {
  // Procura por "const Component = " ou "function Component"
  const componentMatch = code.match(/const\s+Component\s*=\s*(\([^)]*\)\s*=>|function\s*\([^)]*\))\s*{/);
  
  if (componentMatch) {
    // Encontra o corpo da função
    let braceCount = 0;
    let startIndex = code.indexOf('{', componentMatch.index);
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
  
  return code;
}
