// Test script to verify our component extraction with different patterns

// Function to simulate the extractComponentCode function
function extractComponentCode(code) {
  // Remove imports - they're already available in the registry
  const codeWithoutImports = code.replace(/import\s+.*?from\s+['"].*?['"];?\s*/g, '');
  
  // Procurar por padrões de definição de componente
  // 1. Função nomeada exportada diretamente
  const exportedFunctionMatch = codeWithoutImports.match(/export\s+function\s+(\w+)/);
  // 2. Função nomeada
  const functionMatch = codeWithoutImports.match(/function\s+(\w+)/);
  // 3. Const com arrow function
  const constArrowMatch = codeWithoutImports.match(/const\s+(\w+)\s*=\s*(?:\([^)]*\)|)\s*=>/);
  // 4. Classe de componente
  const classMatch = codeWithoutImports.match(/class\s+(\w+)\s+extends\s+React\.Component/);
  // 5. Exportação default de função
  const exportDefaultMatch = codeWithoutImports.match(/export\s+default\s+function\s+(\w+)/);
  // 6. Exportação default de constante
  const exportDefaultConstMatch = codeWithoutImports.match(/export\s+default\s+const\s+(\w+)/);
  // 7. Exportação nomeada
  const namedExportMatch = codeWithoutImports.match(/export\s+{\s*(\w+)(?:\s+as\s+\w+)?\s*}/);
  
  // Determinar o nome do componente
  let componentName = 'MitraReactComponent';
  let hasExportedComponent = false;
  
  if (exportedFunctionMatch) {
    componentName = exportedFunctionMatch[1];
    hasExportedComponent = true;
  } else if (exportDefaultMatch) {
    componentName = exportDefaultMatch[1];
    hasExportedComponent = true;
  } else if (exportDefaultConstMatch) {
    componentName = exportDefaultConstMatch[1];
    hasExportedComponent = true;
  } else if (namedExportMatch) {
    componentName = namedExportMatch[1];
    hasExportedComponent = true;
  } else if (functionMatch) {
    componentName = functionMatch[1];
  } else if (constArrowMatch) {
    componentName = constArrowMatch[1];
  } else if (classMatch) {
    componentName = classMatch[1];
  }
  
  // Se não encontrou um componente exportado, verificar se há uma função ou componente não exportado
  if (!hasExportedComponent && (functionMatch || constArrowMatch || classMatch)) {
    // Usar o primeiro componente encontrado
    if (functionMatch) componentName = functionMatch[1];
    else if (constArrowMatch) componentName = constArrowMatch[1];
    else if (classMatch) componentName = classMatch[1];
  }
  
  // Retornar o código com uma atribuição para ReactComponentMitra
  return `
    ${codeWithoutImports}
    
    // Atribuir o componente exportado para ReactComponentMitra
    const ReactComponentMitra = ${componentName};
  `;
}

// Test cases
const testCases = [
  {
    name: "Export function",
    code: `
      "use client"
      import * as React from "react"
      import { Calendar } from "@/components/ui/calendar"
      
      export function CalendarDemo() {
        const [date, setDate] = React.useState<Date | undefined>(new Date())
        return <Calendar mode="single" selected={date} onSelect={setDate} />
      }
    `
  },
  {
    name: "Function without export",
    code: `
      "use client"
      import * as React from "react"
      
      function MyComponent() {
        return <div>Hello World</div>
      }
    `
  },
  {
    name: "Arrow function",
    code: `
      "use client"
      import * as React from "react"
      
      const ArrowComponent = () => {
        return <div>Arrow Component</div>
      }
    `
  },
  {
    name: "Export default function",
    code: `
      "use client"
      import * as React from "react"
      
      export default function DefaultComponent() {
        return <div>Default Component</div>
      }
    `
  },
  {
    name: "Named export",
    code: `
      "use client"
      import * as React from "react"
      
      function NamedComponent() {
        return <div>Named Component</div>
      }
      
      export { NamedComponent }
    `
  },
  {
    name: "Class component",
    code: `
      "use client"
      import * as React from "react"
      
      class ClassComponent extends React.Component {
        render() {
          return <div>Class Component</div>
        }
      }
    `
  }
];

// Test each case
testCases.forEach(testCase => {
  console.log(`\n=== Testing: ${testCase.name} ===`);
  console.log("Original code:");
  console.log(testCase.code);
  console.log("\nProcessed code:");
  console.log(extractComponentCode(testCase.code));
  console.log("=== End of test ===");
});
