// Test script to verify our changes to DynamicRenderer.tsx

// Sample code with imports
const codeWithImports = `"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"

export function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow"
    />
  )
}`;

// Function to simulate the extractComponentCode function
function extractComponentCode(code) {
  // Remove imports - they're already available in the registry
  const codeWithoutImports = code.replace(/import\s+.*?from\s+['"].*?['"];?\s*/g, '');
  
  // Procurar por padrões de definição de componente
  // 1. Função nomeada exportada
  const exportedFunctionMatch = codeWithoutImports.match(/export\s+function\s+(\w+)/);
  // 2. Função nomeada
  const functionMatch = codeWithoutImports.match(/function\s+(\w+)/);
  // 3. Const com arrow function
  const constArrowMatch = codeWithoutImports.match(/const\s+(\w+)\s*=\s*(?:\([^)]*\)|)\s*=>/);
  // 4. Classe de componente
  const classMatch = codeWithoutImports.match(/class\s+(\w+)\s+extends\s+React\.Component/);
  
  // Determinar o nome do componente
  let componentName = 'ReactComponentMitra';
  if (exportedFunctionMatch) componentName = exportedFunctionMatch[1];
  else if (functionMatch) componentName = functionMatch[1];
  else if (constArrowMatch) componentName = constArrowMatch[1];
  else if (classMatch) componentName = classMatch[1];
  
  // Retornar o código com uma atribuição para ReactComponentMitra
  return `
    ${codeWithoutImports}
    
    // Atribuir o componente exportado para ReactComponentMitra
    const ReactComponentMitra = ${componentName};
  `;
}

// Test the function
console.log("Original code:");
console.log(codeWithImports);
console.log("\nProcessed code:");
console.log(extractComponentCode(codeWithImports));
