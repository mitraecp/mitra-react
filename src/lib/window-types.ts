/* eslint-disable @typescript-eslint/no-explicit-any */
// Declaração de tipos para o objeto window
declare global {
  interface Window {
    componentData?: any;
    componentId?: any;
    updateMitra?: (...args: any[]) => any; // referência à função updateMitra do componente dinâmico
  }
}
