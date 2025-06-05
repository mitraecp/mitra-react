import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  componentName?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Componente que captura erros de renderização em componentes filhos
 * e exibe uma UI de fallback em vez de quebrar a árvore de componentes.
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Atualiza o estado para que a próxima renderização mostre a UI de fallback
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Atualizar o estado com as informações do erro
    this.setState({ errorInfo });

    // Registrar o erro no console para debugging
    console.error('Erro capturado pelo ErrorBoundary:', error);
    console.error('Informações do componente:', errorInfo);

    // Registrar detalhes adicionais
    if (this.props.componentName) {
      console.error(`Componente com erro: ${this.props.componentName}`);
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Você pode renderizar qualquer UI de fallback personalizada
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Extrair informações úteis do erro
      const errorMessage = this.state.error?.message || 'Ocorreu um erro durante a renderização';
      const componentStack = this.state.errorInfo?.componentStack || '';
      const componentName = this.props.componentName || 'Componente desconhecido';

      return (
        <div className="p-4 border border-red-300 bg-red-50 rounded-md">
          <h2 className="text-lg font-semibold text-red-800">Erro em {componentName}</h2>
          <p className="text-red-600 mt-2">
            {errorMessage}
          </p>
          {componentStack && (
            <details className="mt-2">
              <summary className="cursor-pointer text-red-700 font-medium">Ver detalhes do erro</summary>
              <pre className="mt-2 p-2 bg-red-100 text-red-800 overflow-auto text-xs whitespace-pre-wrap">
                {componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
