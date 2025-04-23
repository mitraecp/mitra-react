/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from 'react';
import { messageService } from '@/lib/message-service';
import { sanitizeJSXCode, transformJSX } from '@/lib/jsx-transformer';
import { processArbitraryValues } from '@/lib/arbitrary-values-processor';

// --- 1. Importar TODOS os componentes necessários UMA VEZ ---
// Componentes básicos
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { DatePicker, DatePickerDemo } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
// Componentes de layout
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
// Componentes de data
import { Calendar } from '@/components/ui/calendar';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
// Componentes de disclosure
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from '@/components/ui/command';
import { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from '@/components/ui/context-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
// Componentes de formulário
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'; // Assumindo que você tenha um componente Form
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Menubar, MenubarCheckboxItem, MenubarContent, MenubarGroup, MenubarItem, MenubarLabel, MenubarMenu, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from '@/components/ui/menubar';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
// Componentes de feedback
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
// Componentes de gráficos do Shadcn UI
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from '@/components/ui/chart';

// Componentes do Recharts
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  RadialBarChart,
  RadialBar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ScatterChart,
  Scatter,
  ComposedChart,
  Brush,
  ReferenceLine,
  ErrorBar,
  Label as RechartsLabel,
  Tooltip as RechartsTooltip
} from 'recharts';
// Ícones
import * as LucideReact from 'lucide-react'; // Importa todos os ícones como um objeto

// --- Componentes pré-definidos (mantidos por simplicidade) ---
import { Dashboard } from './Dashboard'; // Assumindo que você tem esse componente
import { BarChartExample } from './BarChartExample';
import { SimpleBarChart } from './SimpleBarChart';

const SimpleButton = () => {
  const [count, setCount] = React.useState(0); // Usar React.useState aqui
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Botão com Contador</h2>
      <Button onClick={() => setCount(prev => prev + 1)}>
        Cliques: {count}
      </Button>
    </div>
  );
};

const SimpleCard = () => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Título do Card</CardTitle>
        <CardDescription>Descrição do card com informações adicionais</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Este é um exemplo de card do Shadcn UI.</p>
      </CardContent>
      <div className="p-6 pt-0 flex justify-end">
        <Button>Ação</Button>
      </div>
    </Card>
  );
};

// --- 2. Criar o Registro de Componentes e Utilitários ---
// Colocado fora do componente para evitar recriação em cada render,
// mas pode ser movido para dentro e memoizado com useMemo se preferir.
const componentRegistry = {
  // React e Hooks Essenciais
  React,
  useState: React.useState,
  useEffect: React.useEffect,
  useCallback: React.useCallback,
  useMemo: React.useMemo,
  useRef: React.useRef,
  useContext: React.useContext,
  // Adicione outros hooks se necessário

  // Componentes UI (Shadcn UI)
  Button,
  Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter,
  Input, Label, Checkbox,
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
  Alert, AlertDescription, AlertTitle,
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
  AspectRatio,
  Avatar, AvatarFallback, AvatarImage,
  Badge,
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
  Calendar,
  Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
  Collapsible, CollapsibleContent, CollapsibleTrigger,
  Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut,
  ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger,
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
  Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger,
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger,
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, // Assumindo que existem
  HoverCard, HoverCardContent, HoverCardTrigger,
  Menubar, MenubarCheckboxItem, MenubarContent, MenubarGroup, MenubarItem, MenubarLabel, MenubarMenu, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger,
  NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle,
  Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,
  Popover, PopoverContent, PopoverTrigger,
  Progress,
  RadioGroup, RadioGroupItem,
  ResizableHandle, ResizablePanel, ResizablePanelGroup,
  ScrollArea, ScrollBar,
  Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue,
  Separator,
  Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger,
  Skeleton,
  Slider,
  Switch,
  Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow,
  Tabs, TabsContent, TabsList, TabsTrigger,
  Textarea,
  Toggle,
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,

  // Biblioteca de Ícones
  LucideReact, // Expõe todo o objeto LucideReact

  // Componentes de gráficos (Shadcn UI)
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,

  // Componentes de gráficos (Recharts)
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  RadialBarChart,
  RadialBar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ScatterChart,
  Scatter,
  ComposedChart,
  Brush,
  ReferenceLine,
  ErrorBar,
  RechartsLabel,
  RechartsTooltip,

  // Componentes Pré-definidos
  Dashboard,
  BarChartExample,
  SimpleBarChart,
  DatePicker,
  DatePickerDemo,

  // Funções de interação para comunicação com o componente pai Vue
  actionMitra: (action: string, params?: any, componentId?: string | null) => {
    messageService.sendInteraction('action', { action, params }, componentId);
    console.log(`actionMitra('${action}', ${JSON.stringify(params)})`);
  },
  formMitra: (formData: any, componentId?: string | null) => {
    messageService.sendInteraction('form', formData, componentId);
    console.log(`formMitra(${JSON.stringify(formData)})`);
  },
  detailMitra: (id: string | number, entity?: string, componentId?: string | null) => {
    messageService.sendInteraction('detail', { id, entity }, componentId);
    console.log(`detailMitra(${id}, '${entity || ''}')`);
  },
  dbactionMitra: (action: string, params?: any, componentId?: string | null) => {
    messageService.sendInteraction('dbaction', { action, params }, componentId);
    console.log(`dbactionMitra('${action}', ${JSON.stringify(params)})`);
  },
  modalMitra: (modal: string, params?: any, componentId?: string | null) => {
    messageService.sendInteraction('modal', { modal, params }, componentId);
    console.log(`modalMitra('${modal}', ${JSON.stringify(params)})`);
  },
  variableMitra: (name: string, value: any, componentId?: string | null) => {
    messageService.sendInteraction('variable', { name, value }, componentId);
    console.log(`variableMitra('${name}', ${JSON.stringify(value)})`);
  },
  queryMitra: (query: string, jdbcId: number = 1, componentId?: string | null) => {
    // Formato simplificado para query
    messageService.sendInteraction('query', { id: query, jdbcId }, componentId);
    console.log(`queryMitra('${query}', ${jdbcId})`);
  },
  goToScreenMitra: (screen: string, params?: any, componentId?: string | null) => {
    messageService.sendInteraction('goToScreen', { screen, params }, componentId);
    console.log(`goToScreenMitra('${screen}', ${JSON.stringify(params)})`);
  },

  // Adicione outros componentes/utilitários que você quer expor
  // Ex: Alguma lib de gráficos, helpers, etc.
};

// --- 3. Mapa para Componentes Pré-definidos ---
const predefinedComponentsMap = new Map<string, React.FC>([
  ['SIMPLE_BUTTON', SimpleButton],
  ['SIMPLE_CARD', SimpleCard],
  ['DASHBOARD', Dashboard],
  ['BAR_CHART', BarChartExample],
  ['SIMPLE_BAR_CHART', SimpleBarChart],
  ['DATE_PICKER', DatePickerDemo],
]);

// --- Componente Renderer Principal ---
const DynamicRenderer: React.FC = () => {
  const [componentCode, setComponentCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedPredefinedKey, setSelectedPredefinedKey] = useState<string | null>(null);
  const [RenderedComponent, setRenderedComponent] = useState<React.FC | null>(null);

  useEffect(() => {
    // Listener para mensagens RENDER_COMPONENT
    const unsubscribeRender = messageService.addListener('RENDER_COMPONENT', (code, componentData) => {
      console.log('RENDER_COMPONENT recebido:', {
        code: typeof code === 'string' ? code.substring(0, 100) + '...' : code,
        componentData
      });

      setError(null); // Limpa erros anteriores
      setRenderedComponent(null); // Limpa componente renderizado anteriormente
      setSelectedPredefinedKey(null);
      setComponentCode(null);

      try {
        // Atualizar a variável global componentData
        if (componentData) {
          console.log('Dados do componente recebidos:', componentData);
          window.componentData = componentData;
        } else if (window.componentData === undefined) {
          // Inicializar componentData se não existir
          window.componentData = {};
        }

        // Se o code for nulo, é apenas uma atualização de dados
        if (code === null) {
          console.log('Apenas atualização de dados recebida, sem código de componente');
          return;
        }

        if (typeof code !== 'string') {
          throw new Error('Código inválido: deve ser uma string (código React ou chave pré-definida).');
        }

        const trimmedCode = code.trim();

        // Verificar se é uma chave pré-definida
        if (predefinedComponentsMap.has(trimmedCode)) {
          setSelectedPredefinedKey(trimmedCode);
          messageService.sendMessage('COMPONENT_RENDERED', null, null, { success: true, type: 'predefined', key: trimmedCode });

        } else {
          // Se não for pré-definido, trata como código JSX
          setComponentCode(trimmedCode);
          messageService.sendMessage('COMPONENT_RENDERED', null, null, { success: true, type: 'dynamic' });
        }

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido ao processar payload';
        setError(errorMessage);
        messageService.sendMessage('ERROR', null, null, { message: errorMessage });
      }
    });

    // Listener para mensagens INTERACTIONS_MITRA
    const unsubscribeInteractions = messageService.addListener('INTERACTIONS_MITRA', (_, payload) => {
      if (payload && payload.type) {
        // O payload já contém os dados diretamente, sem aninhamento em 'data'
        console.log(`Recebida interação do tipo '${payload.type}' com dados:`, payload);
        // Aqui você pode processar a interação recebida do componente pai Vue
        // Por exemplo, atualizar o estado do componente React com base na interação
      }
    });

    return () => {
      unsubscribeRender();
      unsubscribeInteractions();
    };
  }, []); // Dependência vazia para rodar apenas na montagem

  // Memoizar a compilação do componente dinâmico
  // Isso só será re-executado quando `componentCode` mudar.
  useEffect(() => {
    if (!componentCode) {
      setRenderedComponent(null);
      return;
    }

    let Comp: React.FC | null = null;
    try {
      // console.log('Recebido código JSX:', componentCode);
      const sanitizedCode = sanitizeJSXCode(componentCode);
      const processedCode = processArbitraryValues(sanitizedCode);
      // console.log('Código processado:', processedCode);
      const transpiledCode = transformJSX(processedCode);
      // console.log('Código transpilado:', transpiledCode);

      // --- 4. Usar `new Function` com o registro ---
      // A função recebe UM argumento: `scope` (nosso registro)
      // Dentro da função, desestruturamos o `scope` para ter acesso fácil
      // aos componentes e utilitários.
      // Ela DEVE definir e retornar uma função chamada `Component`.
      const defineComponent = new Function(
        'scope', // O nome do argumento que receberá o registro
        `
          // Desestruturação para acesso fácil dentro do código do usuário
          const { ${Object.keys(componentRegistry).join(', ')} } = scope;

          // Acesso aos dados do componente via variável global
          const componentData = window.componentData || {};

          // O código do usuário vem aqui. Ele deve definir 'Component'.
          ${transpiledCode}

          // Garante que Component seja retornado
          if (typeof Component !== 'function') {
            throw new Error('O código deve definir uma função React chamada "Component".');
          }
          return Component;
        `
      );

      // Executa a função, passando o registro como argumento 'scope'
      Comp = defineComponent(componentRegistry);

      setRenderedComponent(() => Comp); // Define o estado com a função do componente
      setError(null); // Limpa erro se compilação foi bem sucedida

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido ao compilar/executar código dinâmico';
      console.error('Erro no processamento do componente dinâmico:', err);
      setError(errorMessage);
      setRenderedComponent(null);
      messageService.sendMessage('ERROR', null, null, { message: `Erro ao renderizar: ${errorMessage}` });
    }

  }, [componentCode]); // Dependência: re-executa SÓ quando o código mudar

  // --- Renderização ---
  const renderContent = () => {
    if (error) {
      return (
        <div className="p-4 bg-red-100 text-red-800 rounded">
          <h3 className="font-bold">Erro ao renderizar componente:</h3>
          <pre className="mt-2 whitespace-pre-wrap">{error}</pre>
        </div>
      );
    }

    if (selectedPredefinedKey) {
      const PredefinedComponent = predefinedComponentsMap.get(selectedPredefinedKey);
      return PredefinedComponent ? <PredefinedComponent /> : <p>Componente pré-definido não encontrado.</p>;
    }

    if (RenderedComponent) {
      // Envolve o componente renderizado com um ErrorBoundary para capturar erros de renderização
      // Você precisaria criar um componente ErrorBoundary simples
      // return <ErrorBoundary><RenderedComponent /></ErrorBoundary>;
      // Por enquanto, renderiza diretamente:
      return <RenderedComponent />;
    }

    // Estado inicial ou quando nenhum código/chave foi fornecido
    return (
      <div className="p-4 text-center">
        <p className="text-muted-foreground">
          Aguardando código do componente ou chave pré-definida...
        </p>
      </div>
    );
  };

  return (
    <div className="dynamic-renderer p-4 border rounded">
      {renderContent()}
    </div>
  );
};

// Você pode querer criar um Error Boundary básico para pegar erros
// que ocorrem *durante* a renderização do componente dinâmico.
// Exemplo simples:
/*
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Erro capturado pelo ErrorBoundary:", error, errorInfo);
    // Você pode enviar o erro para um serviço de logging aqui
  }

  render() {
    if (this.state.hasError) {
      return (
         <div className="p-4 bg-red-100 text-red-800 rounded">
          <h3 className="font-bold">Erro durante a renderização:</h3>
          <pre className="mt-2 whitespace-pre-wrap">{this.state.error?.message || 'Erro desconhecido'}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
*/

export default DynamicRenderer;