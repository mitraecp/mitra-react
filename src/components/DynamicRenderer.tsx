/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from 'react';
import { messageService } from '@/lib/message-service';
import { sanitizeJSXCode, transformJSX } from '@/lib/jsx-transformer';
import { processArbitraryValues } from '@/lib/arbitrary-values-processor';

// Importar estilos globais explicitamente
import '@/styles/globals.css';
import '@/styles/custom.css';
import '@/styles/arbitrary-values.css';
import '@/styles/button-colors.css';

// --- 1. Importar TODOS os componentes necessários UMA VEZ ---
// Componentes básicos
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { DatePicker, DatePickerDemo } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ImageRoot, Image, ImageFallback } from '@/components/ui/image';
import { Label as LabelTag, LabelList } from '@/components/ui/label-list';
// Componentes de layout
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis } from '@/components/ui/breadcrumb';
// Componentes de data
import { Calendar } from '@/components/ui/calendar';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
// Componentes de disclosure
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Combobox } from '@/components/ui/combobox';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from '@/components/ui/command';
import { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from '@/components/ui/context-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DataTable } from '@/components/ui/data-table';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
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
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarNav, SidebarNavItem, SidebarSection } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { Slider } from '@/components/ui/slider';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@/components/ui/toast';
import { useToast, toast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
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
import { ImageExample } from './ImageExample';
import { ToastDemo } from './ToastDemo';
// import { LabelListExample } from './LabelListExample';

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
  Input, InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator, Label, Checkbox,
  ImageRoot, Image, ImageFallback,
  LabelTag, LabelList,
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
  Alert, AlertDescription, AlertTitle,
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
  AspectRatio,
  Avatar, AvatarFallback, AvatarImage,
  Badge,
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis,
  Calendar,
  Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
  Collapsible, CollapsibleContent, CollapsibleTrigger,
  Combobox,
  Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut,
  ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger,
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
  DataTable,
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
  Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarNav, SidebarNavItem, SidebarSection,
  Skeleton,
  Slider,
  SonnerToaster,
  Switch,
  Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow,
  Tabs, TabsContent, TabsList, TabsTrigger,
  Textarea,
  Toggle,
  ToggleGroup, ToggleGroupItem,
  Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport,
  Toaster,
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
  useToast, toast,

  // Hooks e funções do @tanstack/react-table
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,

  // Biblioteca de Ícones
  LucideReact, // Expõe todo o objeto LucideReact
  // Adicionar ícones individuais do Lucide para acesso direto
  ...Object.entries(LucideReact).reduce((acc, [key, value]) => {
    // Adicionar apenas os componentes (funções/classes), não as propriedades
    if (typeof value === 'function') {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, any>),

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
  ImageExample,
  ToastDemo,

  // Funções de interação para comunicação com o componente pai Vue
  actionMitra: async (params: any, componentId?: string | null): Promise<any> => {
    try {
      console.log(`actionMitra(${JSON.stringify(params)})`);
      const result = await messageService.sendInteraction('action', params, componentId);
      console.log(`actionMitra result:`, result);
      return result;
    } catch (error) {
      console.error(`Erro ao executar actionMitra:`, error);
      throw error;
    }
  },
  formMitra: async (params: any, componentId?: string | null): Promise<any> => {
    try {
      console.log(`formMitra(${JSON.stringify(params)})`);
      const result = await messageService.sendInteraction('form', params, componentId);
      console.log(`formMitra result:`, result);
      return result;
    } catch (error) {
      console.error(`Erro ao executar formMitra:`, error);
      throw error;
    }
  },
  detailMitra: async (params: any, componentId?: string | null): Promise<any> => {
    try {
      console.log(`detailMitra(${JSON.stringify(params)})`);
      const result = await messageService.sendInteraction('detail', params, componentId);
      console.log(`detailMitra result:`, result);
      return result;
    } catch (error) {
      console.error(`Erro ao executar detailMitra:`, error);
      throw error;
    }
  },
  dbactionMitra: async (params: any, componentId?: string | null): Promise<any> => {
    try {
      console.log(`dbactionMitra(${JSON.stringify(params)})`);
      const result = await messageService.sendInteraction('dbaction', params, componentId);
      console.log(`dbactionMitra result:`, result);
      return result;
    } catch (error) {
      console.error(`Erro ao executar dbactionMitra:`, error);
      throw error;
    }
  },
  modalMitra: async (params: any, componentId?: string | null): Promise<any> => {
    try {
      console.log(`modalMitra(${JSON.stringify(params)})`);
      const result = await messageService.sendInteraction('modal', params, componentId);
      console.log(`modalMitra result:`, result);
      return result;
    } catch (error) {
      console.error(`Erro ao executar modalMitra:`, error);
      throw error;
    }
  },
  // Alias para variableMitra para compatibilidade com a documentação
  setVariableMitra: async (params: any, componentId?: string | null): Promise<any> => {
    try {
      console.log(`setVariableMitra(${JSON.stringify(params)})`);
      // Garantir que estamos enviando name e content, não name e value
      const { name, content } = params;
      const result = await messageService.sendInteraction('variable', { name, content }, componentId);
      console.log(`setVariableMitra result:`, result);
      return result;
    } catch (error) {
      console.error(`Erro ao executar setVariableMitra:`, error);
      throw error;
    }
  },
  // Manter variableMitra para compatibilidade com código existente
  variableMitra: async (params: any, componentId?: string | null): Promise<any> => {
    try {
      console.log(`variableMitra(${JSON.stringify(params)})`);
      // Garantir que estamos enviando name e content, não name e value
      const { name, content } = params;
      const result = await messageService.sendInteraction('variable', { name, content }, componentId);
      console.log(`variableMitra result:`, result);
      return result;
    } catch (error) {
      console.error(`Erro ao executar variableMitra:`, error);
      throw error;
    }
  },
  queryMitra: async (params: any, componentId?: string | null): Promise<any> => {
    try {
      console.log(`queryMitra(${JSON.stringify(params)})`);
      // Extrair query e jdbcId do objeto params
      const { query, jdbcId = 1 } = params;
      const result = await messageService.sendInteraction('query', { id: query, jdbcId }, componentId);
      console.log(`queryMitra result:`, result);
      return result;
    } catch (error) {
      console.error(`Erro ao executar queryMitra:`, error);
      throw error;
    }
  },
  goToScreenMitra: async (params: any, componentId?: string | null): Promise<any> => {
    try {
      console.log(`goToScreenMitra(${JSON.stringify(params)})`);
      const result = await messageService.sendInteraction('goToScreen', params, componentId);
      console.log(`goToScreenMitra result:`, result);
      return result;
    } catch (error) {
      console.error(`Erro ao executar goToScreenMitra:`, error);
      throw error;
    }
  },
  // Adicionar updateMitra conforme documentação
  updateMitra: (params?: any) => {
    console.log(`updateMitra(${JSON.stringify(params)})`);
    // Este método é chamado pelo componente pai para controlar manualmente os updates
    // A implementação depende do contexto específico da aplicação
  },

  // Função para executar consultas diretamente na API Mitra sem usar postMessage
  queryMitraWidget: async (params: any, queryDireta: string ): Promise<any> => {
    try {
      // Implementação direta para evitar dependência circular
      const {
        query = queryDireta,
        screenComponentId = 2783,
        jdbcConnectionConfigId = 1,
        baseUrl = 'https://api0.mitraecp.com:1004',
        token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3YXluZXJAbWl0cmFsYWIuaW8iLCJYLVRlbmFudElEIjoidGVuYW50Xzg5MTYifQ.LBSj0M3RE2iFUSIK8pwqIBitJlwME_Rdp_H745IDuDZQaH38_KyKD0PQ7g9G1KmBTWL2D1w3widvzW22zBXzwg',
      } = params;

      // Create form data
      const formData = new FormData();
      formData.append('screenComponentId', screenComponentId.toString());
      formData.append('jdbcConnectionConfigId', jdbcConnectionConfigId.toString());
      formData.append('query', query);

      // Make the API request
      const response = await fetch(`${baseUrl}/dives/queryPreview?limited=false`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Authorization': `Bearer ${token}`,
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log(`queryMitraWidget result:`, result);
      return result;
    } catch (error) {
      console.error(`Erro ao executar queryMitraWidget:`, error);
      throw error;
    }
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
  ['IMAGE_EXAMPLE', ImageExample],
  ['TOAST_DEMO', ToastDemo]
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
          messageService.sendMessage('COMPONENT_RENDERED', null, null, { success: true, type: 'predefined', key: trimmedCode } as any);

        } else {
          // Se não for pré-definido, trata como código JSX
          setComponentCode(trimmedCode);
          messageService.sendMessage('COMPONENT_RENDERED', null, null, { success: true, type: 'dynamic' } as any);
        }

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido ao processar payload';
        setError(errorMessage);
        messageService.sendMessage('ERROR', null, null, { message: errorMessage } as any);
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
      // Abordagem simplificada para processar o código
      // 1. Identificar o nome do componente
      let componentName = 'MitraReactComponent';

      // Procurar por padrões de definição de componente no código original
      const exportedFunctionMatch = componentCode.match(/export\s+function\s+(\w+)/);
      const exportDefaultMatch = componentCode.match(/export\s+default\s+function\s+(\w+)/);
      const functionMatch = componentCode.match(/function\s+(\w+)/);
      const constArrowMatch = componentCode.match(/const\s+(\w+)\s*=\s*(?:\([^)]*\)|)\s*=>/);

      if (exportedFunctionMatch) {
        componentName = exportedFunctionMatch[1];
      } else if (exportDefaultMatch) {
        componentName = exportDefaultMatch[1];
      } else if (functionMatch) {
        componentName = functionMatch[1];
      } else if (constArrowMatch) {
        componentName = constArrowMatch[1];
      }

      // 2. Sanitizar e processar o código
      const sanitizedCode = sanitizeJSXCode(componentCode);
      const processedArbitraryCode = processArbitraryValues(sanitizedCode);

      // 3. Transpilar o código com suporte a TypeScript
      const transpiledCode = transformJSX(processedArbitraryCode);

      // 4. Processar declarações import, export e diretivas do código transpilado
      // Função para processar todas as declarações import
      const processImports = (code: string): { processedCode: string, imports: Map<string, string[]> } => {
        // Mapa para armazenar os imports (módulo -> [componentes])
        const imports = new Map<string, string[]>();

        // Clonar o código para não modificar o original durante a iteração
        let result = code;

        // Regex para imports com chaves: import { X, Y } from 'module';
        const importWithBracesRegex = /import\s+{\s*([\w\s,]+)\s*}\s+from\s+['"]([^'"]+)['"];?/g;
        let match;

        // Encontrar todos os imports com chaves
        while ((match = importWithBracesRegex.exec(code)) !== null) {
          const components = match[1].split(',').map(c => c.trim());
          const module = match[2];

          // Armazenar os componentes importados
          if (!imports.has(module)) {
            imports.set(module, []);
          }

          imports.get(module)?.push(...components);
        }

        // Regex para imports diretos: import X from 'module';
        const importDirectRegex = /import\s+(\w+)\s+from\s+['"]([^'"]+)['"];?/g;

        // Encontrar todos os imports diretos
        while ((match = importDirectRegex.exec(code)) !== null) {
          const component = match[1];
          const module = match[2];

          // Armazenar o componente importado
          if (!imports.has(module)) {
            imports.set(module, []);
          }

          imports.get(module)?.push(component);
        }

        // Remover todos os imports do código
        result = result.replace(/import\s+.*?from\s+['"].*?['"];?\s*/g, '');
        result = result.replace(/import\s+[\s\S]*?from\s+['"].*?['"];?\s*/g, '');

        // Verificar se ainda há alguma declaração import
        if (result.includes('import ')) {
          const lines = result.split('\n');
          const filteredLines = lines.filter(line => !line.trim().startsWith('import '));
          result = filteredLines.join('\n');
        }

        return { processedCode: result, imports };
      };

      // Processar imports e remover declarações
      const { processedCode, imports } = processImports(transpiledCode);

      // Remover diretiva "use client"
      let cleanedCode = processedCode.replace(/"use client";?\s*/g, '');

      // Remover declarações export function
      cleanedCode = cleanedCode.replace(/export\s+function\s+(\w+)/g, 'function $1');
      // Remover declarações export default function
      cleanedCode = cleanedCode.replace(/export\s+default\s+function\s+(\w+)/g, 'function $1');
      // Remover declarações export const
      cleanedCode = cleanedCode.replace(/export\s+const\s+(\w+)/g, 'const $1');
      // Remover declarações export default const
      cleanedCode = cleanedCode.replace(/export\s+default\s+const\s+(\w+)/g, 'const $1');
      // Remover declarações export default
      cleanedCode = cleanedCode.replace(/export\s+default\s+(\w+);?/g, '');
      // Remover declarações export { ... }
      cleanedCode = cleanedCode.replace(/export\s+{[^}]*};?/g, '');

      // 5. Processar os imports para disponibilizar os componentes
      let importDeclarations = '';

      // Processar imports do Lucide
      if (imports.has('lucide-react')) {
        const lucideComponents = imports.get('lucide-react') || [];
        console.log('Componentes Lucide importados:', lucideComponents);

        importDeclarations += `
          // Importar componentes do Lucide
          console.log('LucideReact disponível:', LucideReact);
          ${lucideComponents.map(comp => {
            // Remover espaços em branco e quebras de linha
            const cleanComp = comp.trim();
            return `const ${cleanComp} = LucideReact.${cleanComp}; console.log('${cleanComp} importado:', ${cleanComp});`;
          }).join('\n          ')}
        `;
      }

      // Processar outros imports conhecidos
      const knownModules = [
        '@/components/ui/card',
        '@/components/ui/button',
        '@/components/ui/calendar',
        '@/components/ui/chart',
        '@/components/ui/combobox',
        '@/components/ui/data-table',
        '@/components/ui/image',
        '@/components/ui/input-otp',
        '@/components/ui/label-list',
        '@/components/ui/sidebar',
        '@/components/ui/sonner',
        '@/components/ui/toast',
        '@/components/ui/toaster',
        '@/components/ui/toggle-group',
        '@/hooks/use-toast',
        '@tanstack/react-table',
        'recharts'
      ];

      knownModules.forEach(module => {
        if (imports.has(module)) {
          importDeclarations += `
            // Componentes importados de ${module} já estão disponíveis no escopo global
            // ${imports.get(module)?.join(', ')}
          `;
        }
      });

      // 6. Criar um wrapper para o componente transpilado
      const processedComponentCode = `
        // Código do usuário transpilado (sem imports)
        ${cleanedCode}

        // Declarações de imports processados
        ${importDeclarations}

        // Componente wrapper que expõe o componente do usuário como ReactComponentMitra
        function ReactComponentMitra(props) {
          // Componentes disponíveis
          const components = props.components || {};

          // Criar um objeto com todos os componentes disponíveis no escopo global
          // para que o código do usuário possa acessá-los diretamente
          Object.keys(components).forEach(key => {
            window[key] = components[key];
          });

          // Renderizar o componente do usuário com um wrapper para garantir que as classes do Tailwind sejam aplicadas
          return React.createElement(
            'div',
            {
              className: 'h-[100vh] p-.5 pb-1',
            },
            React.createElement(${componentName}, props)
          );
        }
      `;

      // --- 4. Usar `new Function` com o registro ---
      // A função recebe UM argumento: `scope` (nosso registro)
      // Dentro da função, desestruturamos o `scope` para ter acesso fácil
      // aos componentes e utilitários.
      // Ela DEVE definir e retornar uma função chamada `ReactComponentMitra`.
      // Adicionar suporte para objetos globais como Date, Array, etc.
      const globalObjects = [
        'Date', 'Array', 'Object', 'String', 'Number', 'Boolean', 'RegExp', 'Math', 'JSON',
        'Map', 'Set', 'Promise', 'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval'
      ];

      const defineComponent = new Function(
        'scope', // O nome do argumento que receberá o registro
        'React', // React global
        `
          // Acesso aos dados do componente via variável global
          const componentData = window.componentData || {};

          // Acesso a objetos globais
          const { ${globalObjects.join(', ')} } = window;

          // Acesso ao objeto LucideReact
          const LucideReact = scope.LucideReact;

          // O código do usuário vem aqui. Ele deve definir 'ReactComponentMitra'.
          ${processedComponentCode}

          // Garante que ReactComponentMitra seja retornado
          if (typeof ReactComponentMitra !== 'function') {
            throw new Error('O código deve definir e retornar uma função ou arrow function React chamada "ReactComponentMitra".');
          }

          // Criar um componente que passa os componentes registrados como props
          return (props) => {
            return ReactComponentMitra({ ...props, components: scope });
          };
        `
      );

      // Executa a função, passando o registro como argumento 'scope' e React como segundo argumento
      Comp = defineComponent(componentRegistry, React);

      setRenderedComponent(() => Comp); // Define o estado com a função do componente
      setError(null); // Limpa erro se compilação foi bem sucedida

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido ao compilar/executar código dinâmico';
      console.error('Erro no processamento do componente dinâmico:', err);
      setError(errorMessage);
      setRenderedComponent(null);
      messageService.sendMessage('ERROR', null, null, { message: `Erro ao renderizar: ${errorMessage}` } as any);
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
      LucideReact.Loader2 && (
        <div className='flex-grow flex items-center justify-center h-[100vh] text-muted-foreground border rounded'>
          <LucideReact.Loader2 className="h-8 w-8 mr-2 animate-spin" color='#333'/>
        </div>
      )
    );
  };

  return (
    <>
      {renderContent()}
      <Toaster />
    </>
  );
};

// Você pode querer criar um Error Boundary básico para pegar erros
// que ocorrem *durante* a renderização do componente dinâmico.
// Exemplo simples:

// class ErrorBoundary extends React.Component {
//   constructor(props: any) {
//     super(props);
//     this.state = { hasError: false, error: null };
//   }

//   static getDerivedStateFromError(error: any) {
//     return { hasError: true, error };
//   }

//   componentDidCatch(error: any, errorInfo: any) {
//     console.error("Erro capturado pelo ErrorBoundary:", error, errorInfo);
//     // Você pode enviar o erro para um serviço de logging aqui
//   }

//   render() {
//     if ((this.state as any).hasError) {
//       return (
//          <div className="p-4 bg-red-100 text-red-800 rounded">
//           <h3 className="font-bold">Erro durante a renderização:</h3>
//           <pre className="mt-2 whitespace-pre-wrap">{(this.state as any).error?.message || 'Erro desconhecido'}</pre>
//         </div>
//       );
//     }
//     return (this.props as any).children;
//   }
// }


export default DynamicRenderer;