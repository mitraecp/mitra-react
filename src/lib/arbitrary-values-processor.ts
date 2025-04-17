/**
 * Processador para valores arbitrários do Tailwind CSS
 * Esta função processa classes do Tailwind com valores arbitrários e as converte para estilos inline
 */

// Mapeamento de classes Tailwind para propriedades CSS
const classToStyleMap: Record<string, string> = {
  'text': 'fontSize',
  'bg': 'backgroundColor',
  'p': 'padding',
  'm': 'margin',
  'w': 'width',
  'h': 'height',
  'border': 'borderWidth',
  'rounded': 'borderRadius',
  'opacity': 'opacity',
};

/**
 * Processa um elemento JSX para converter classes Tailwind com valores arbitrários em estilos inline
 */
export function processArbitraryValues(jsx: string): string {
  // Primeiro, vamos processar as classes dentro de className="..."
  let processedJsx = processClassNameAttributes(jsx);

  // Depois, vamos processar as classes dentro de className={`...`}
  processedJsx = processTemplateStringClassNames(processedJsx);

  return processedJsx;
}

/**
 * Processa atributos className="..." para converter valores arbitrários em estilos inline
 */
function processClassNameAttributes(jsx: string): string {
  // Regex para encontrar classes com valores arbitrários
  const arbitraryValueRegex = /className="([^"]*)"/g;

  return jsx.replace(arbitraryValueRegex, (match, classNames) => {
    return processClassString(match, classNames);
  });
}

/**
 * Processa atributos className={`...`} para converter valores arbitrários em estilos inline
 */
function processTemplateStringClassNames(jsx: string): string {
  // Regex para encontrar classes em template strings
  const templateStringRegex = /className=\{`([^`]*)`\}/g;

  return jsx.replace(templateStringRegex, (match, classNames) => {
    return processClassString(match, classNames, true);
  });
}

/**
 * Processa uma string de classes e retorna os atributos className e style
 */
function processClassString(match: string, classNames: string, isTemplateString = false): string {
  // Dividir as classes
  const classes = classNames.split(' ');
  const processedClasses: string[] = [];
  const inlineStyles: Record<string, string> = {};

  // Processar cada classe
  for (const cls of classes) {
    // Verificar se é uma classe com valor arbitrário
    const arbitraryMatch = cls.match(/^([a-z-]+)-\[(.*?)\]$/);

    if (arbitraryMatch) {
      const [, prefix, value] = arbitraryMatch;

      // Verificar se temos um mapeamento para esta classe
      if (classToStyleMap[prefix]) {
        // Converter para estilo inline
        const cssProperty = classToStyleMap[prefix];

        // Processar o valor
        let cssValue = value;

        // Processar cores hexadecimais
        if (cssValue.startsWith('#')) {
          inlineStyles[cssProperty] = `"${cssValue}"`;
        }
        // Processar valores numéricos com unidades
        else if (/^\d+px$/.test(cssValue)) {
          inlineStyles[cssProperty] = `"${cssValue}"`;
        }
        // Processar opacidade
        else if (/^0\.\d+$/.test(cssValue)) {
          inlineStyles[cssProperty] = cssValue;
        }
        // Processar rgb/rgba
        else if (cssValue.startsWith('rgb')) {
          inlineStyles[cssProperty] = `"${cssValue}"`;
        }
        // Processar hsl/hsla
        else if (cssValue.startsWith('hsl')) {
          inlineStyles[cssProperty] = `"${cssValue}"`;
        }
        // Outros valores
        else {
          inlineStyles[cssProperty] = `"${cssValue}"`;
        }
      } else {
        // Se não temos mapeamento, manter a classe original
        processedClasses.push(cls);
      }
    } else {
      // Se não é uma classe com valor arbitrário, manter a classe original
      processedClasses.push(cls);
    }
  }

  // Construir o atributo de estilo inline
  let styleAttr = '';
  if (Object.keys(inlineStyles).length > 0) {
    const styleString = Object.entries(inlineStyles)
      .map(([prop, value]) => `${prop}: ${value}`)
      .join(', ');
    styleAttr = ` style={{${styleString}}}`;
  }

  // Construir o atributo de classe
  let classAttr = '';
  if (processedClasses.length > 0) {
    if (isTemplateString) {
      classAttr = `className={\`${processedClasses.join(' ')}\`}`;
    } else {
      classAttr = `className="${processedClasses.join(' ')}"`;
    }
  } else if (isTemplateString) {
    classAttr = `className={\`\`}`;
  } else {
    classAttr = `className=""`;
  }

  // Se não houver classes processadas mas havia classes originais, manter o atributo original
  if (processedClasses.length === 0 && Object.keys(inlineStyles).length === 0) {
    return match;
  }

  // Retornar os atributos combinados
  return classAttr + styleAttr;
}

/**
 * Processa um componente React para converter classes Tailwind com valores arbitrários em estilos inline
 */
export function processComponentWithArbitraryValues(code: string): string {
  // Processar o código JSX
  return processArbitraryValues(code);
}
