/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from 'react';
import { messageService } from '@/lib/message-service';
import { sanitizeJSXCode, transformJSX } from '@/lib/jsx-transformer';
import { processArbitraryValues } from '@/lib/arbitrary-values-processor';

// Importar estilos globais explicitamente
import '@/styles/globals.css';
import '@/styles/arbitrary-values.css';
import '@/styles/button-colors.css';

// --- 1. Importar TODOS os componentes necessários UMA VEZ ---
// Componentes básicos
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter, CardAction } from '@/components/ui/card';
import { DatePicker, DatePickerDemo } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp';
import { Label as UILabel } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ImageRoot, Image, ImageFallback } from '@/components/ui/image';
import { Label as LabelTag, LabelList as UILabelList } from '@/components/ui/label-list';
// Componentes de layout
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar-fallback-only';
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

import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
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
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarInput, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarRail, SidebarSeparator, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
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
import { AppSidebar } from "@/components/app-sidebar"
import { cn } from "@/lib/utils"
import * as z from "zod"
import clsx from "clsx"

// React Hook Form e Zod Resolver
import { useForm, useController, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// Ícones
import * as LucideReact from 'lucide-react'; // Importa todos os ícones como um objeto

// Componente DynamicIcon para compatibilidade
const DynamicIcon = ({ name, ...props }: { name: string; [key: string]: any }) => {
  const IconComponent = LucideReact[name as keyof typeof LucideReact] as React.ComponentType<any>;

  if (!IconComponent) {
    console.warn(`Ícone "${name}" não encontrado no Lucide React`);
    return <LucideReact.HelpCircle {...props} />;
  }

  return <IconComponent {...props} />;
};

// Componentes de gráficos do Shadcn UI
import {
  ChartContainer,
  ChartStyle,
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
  Sector,
  Rectangle,
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
  Label,
  LabelList,
  Tooltip as RechartsTooltip
} from 'recharts';

// Date-fns - Biblioteca de manipulação de datas
import * as dateFns from 'date-fns';
import {
  format,
  parse,
  parseISO,
  addDays,
  subDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isToday,
  isSameDay,
  differenceInDays,
  addMonths,
  subMonths,
  isValid,
  formatISO,
  getYear,
  getMonth,
  getDate,
  setYear,
  setMonth,
  setDate
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

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

  // Utilitários
  cn,
  clsx, // Biblioteca para combinação de classes CSS
  z, // Zod para validação de esquemas

  // React Hook Form
  useForm,
  useController,
  Controller,
  zodResolver,

  // Componentes UI (Shadcn UI)
  Button,
  Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter,CardAction,
  Input, InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator, UILabel, Checkbox,
  ImageRoot, Image, ImageFallback,
  LabelTag, UILabelList,
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
  Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarInput, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarRail, SidebarSeparator, SidebarTrigger, useSidebar,
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
  AppSidebar,

  // Componente de ícones dinâmicos
  DynamicIcon,

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

  // Hooks e funções do @tanstack/react-table
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,

  // Date-fns - Biblioteca de manipulação de datas
  dateFns, // Objeto principal do date-fns
  format, // Formatar datas
  parse, // Converter string para Date com formato específico
  parseISO, // Converter string ISO para Date
  addDays, // Adicionar dias
  subDays, // Subtrair dias
  startOfWeek, // Início da semana
  endOfWeek, // Fim da semana
  startOfMonth, // Início do mês
  endOfMonth, // Fim do mês
  isToday, // Verificar se é hoje
  isSameDay, // Verificar se é o mesmo dia
  differenceInDays, // Diferença em dias
  addMonths, // Adicionar meses
  subMonths, // Subtrair meses
  isValid, // Verificar se a data é válida
  formatISO, // Formatar para ISO
  getYear, // Obter ano
  getMonth, // Obter mês
  getDate, // Obter dia
  setYear, // Definir ano
  setMonth, // Definir mês
  setDate, // Definir dia
  ptBR, // Locale português brasileiro

  // Leaflet
  L, // Expõe o objeto L do Leaflet
  MapContainer, // Componente principal do mapa
  Marker, // Marcador no mapa
  Popup, // Popup para marcadores
  TileLayer, // Camada de tiles do mapa
  useMap, // Hook para acessar a instância do mapa

  // Componentes de gráficos (Shadcn UI)
  ChartContainer,
  ChartStyle,
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
  Sector,
  Rectangle,
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
  Label,
  LabelList,
  RechartsTooltip,

  // Função utilitária para filtrar props do Recharts
  filterRechartsProps: (props: any) => {
    if (!props || typeof props !== 'object') return props;

    const rechartsProps = [
      'dataKey', 'nameKey', 'valueKey', 'cx', 'cy', 'innerRadius', 'outerRadius',
      'startAngle', 'endAngle', 'fill', 'stroke', 'strokeWidth', 'strokeDasharray',
      'activeIndex', 'activeShape', 'animationBegin', 'animationDuration',
      'isAnimationActive', 'animationEasing', 'onAnimationStart', 'onAnimationEnd',
      'payload', 'viewBox', 'coordinate', 'offset'
    ];

    const filteredProps = { ...props };
    rechartsProps.forEach(prop => {
      delete filteredProps[prop];
    });

    return filteredProps;
  },

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
      console.error("JOOOOOOOO", error);
      console.error(`Erro ao executar actionMitra:`, error);

      // Enviar erro via messageService
      const errorData = {
        source: 'actionMitra',
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : 'No stack trace available',
        params: JSON.stringify(params),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      };
      messageService.sendMessage('ERROR', null, errorData, componentId || window.componentData?.id || null);

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
      console.error("JOOOOOOOO", error);
      console.error(`Erro ao executar formMitra:`, error);

      // Enviar erro via messageService
      const errorData = {
        source: 'formMitra',
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : 'No stack trace available',
        params: JSON.stringify(params),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      };
      messageService.sendMessage('ERROR', null, errorData, componentId || window.componentData?.id || null);

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
      console.error("JOOOOOOOO", error);
      console.error(`Erro ao executar detailMitra:`, error);

      // Enviar erro via messageService
      const errorData = {
        source: 'detailMitra',
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : 'No stack trace available',
        params: JSON.stringify(params),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      };
      messageService.sendMessage('ERROR', null, errorData, componentId || window.componentData?.id || null);

      throw error;
    }
  },
  dbactionMitra: async (params: any, componentId?: string | null): Promise<any> => {
    try {
      if (typeof params === 'number') {
        params = { id: params };
      }
      console.log(`dbactionMitra(${JSON.stringify(params)})`);
      const result = await messageService.sendInteraction('dbaction', params, componentId);
      console.log(`dbactionMitra result:`, result);
      return result;
    } catch (error) {
      console.error("JOOOOOOOO", error);
      console.error(`Erro ao executar dbactionMitra:`, error);

      // Enviar erro via messageService
      const errorData = {
        source: 'dbactionMitra',
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : 'No stack trace available',
        params: JSON.stringify(params),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      };
      messageService.sendMessage('ERROR', null, errorData, componentId || window.componentData?.id || null);

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
      console.error("JOOOOOOOO", error);
      console.error(`Erro ao executar modalMitra:`, error);

      // Enviar erro via messageService
      const errorData = {
        source: 'modalMitra',
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : 'No stack trace available',
        params: JSON.stringify(params),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      };
      messageService.sendMessage('ERROR', null, errorData, componentId || window.componentData?.id || null);

      throw error;
    }
  },
  // Alias para variableMitra para compatibilidade com a documentação
  setVariableMitra: async (params: any, componentId?: string | null): Promise<any> => {
    try {
      console.log(`setVariableMitra(${JSON.stringify(params)})`);
      // Garantir que estamos enviando name e content, não name e value
      const { name, content, reactivity = false } = params;
      const result = await messageService.sendInteraction('variable', { name, content, reactivity }, componentId);
      console.log(`setVariableMitra result:`, result);
      return result;
    } catch (error) {
      console.error("JOOOOOOOO", error);
      console.error(`Erro ao executar setVariableMitra:`, error);

      // Enviar erro via messageService
      const errorData = {
        source: 'setVariableMitra',
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : 'No stack trace available',
        params: JSON.stringify(params),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      };
      messageService.sendMessage('ERROR', null, errorData, componentId || window.componentData?.id || null);

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
      console.error("JOOOOOOOO", error);
      console.error(`Erro ao executar variableMitra:`, error);

      // Enviar erro via messageService
      const errorData = {
        source: 'variableMitra',
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : 'No stack trace available',
        params: JSON.stringify(params),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      };
      messageService.sendMessage('ERROR', null, errorData, componentId || window.componentData?.id || null);

      throw error;
    }
  },
  getQueryMitra: async (params: any, componentId?: string | null): Promise<any> => {
    try {
      console.log(`getQueryMitra(${JSON.stringify(params)})`);
      if (typeof params === 'string') {
        params = { query: params };
      }
      // Extrair query e jdbcId do objeto params
      const { query, jdbcId = 1, onlineTables = false } = params;
      const result = await messageService.sendInteraction('variableQuery', { id: query, jdbcId, onlineTables }, componentId);
      console.log(`getQueryMitra result:`, result);
      return result;
    } catch (error) {
      console.error("JOOOOOOOO", error);
      console.error(`Erro ao executar getQueryMitra:`, error);

      // Enviar erro via messageService
      const errorData = {
        source: 'getQueryMitra',
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : 'No stack trace available',
        params: JSON.stringify(params),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      };
      messageService.sendMessage('ERROR', null, errorData, componentId || window.componentData?.id || null);

      throw error;
    }
  },
  queryMitra: async (params: any, componentId?: string | null): Promise<any> => {
    try {
      console.log(`queryMitra(${JSON.stringify(params)})`);
      if (typeof params === 'string') {
        params = { query: params };
      }
      // Extrair query e jdbcId do objeto params
      const { query, jdbcId = 1, onlineTables = false } = params;
      const result = await messageService.sendInteraction('query', { id: query, jdbcId, onlineTables }, componentId);
      console.log(`queryMitra result:`, result);
      return result;
    } catch (error) {
      console.error("JOOOOOOOO", error);
      console.error(`Erro ao executar queryMitra:`, error);

      // Enviar erro via messageService
      const errorData = {
        source: 'queryMitra',
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : 'No stack trace available',
        params: JSON.stringify(params),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      };
      messageService.sendMessage('ERROR', null, errorData, componentId || window.componentData?.id || null);

      throw error;
    }
  },
  explainQuery: async (query: string): Promise<any> => {
    try {
      const prompt = `Explique essa query de forma simples, em até quatro linhas, colocando a tag <strong></strong> onde achar necessario ter bold mas não coloque *, sempre use <strong> pois essa mensagem sera renderizada como html, para que um usuário final não técnico possa entender, além disso, deve ser explicado todas as regras da query em portugues.: ${query}`;

      // Usando o modo 'no-cors' para evitar erros de CORS
      await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': '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',
          'Authorization': 'Bearer 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',
          'content-type': 'application/json',
          'accept': 'application/json'
        },
        mode: 'no-cors', // Adiciona o modo no-cors para evitar bloqueio CORS
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 1024,
          messages: [
            { role: 'user', content: prompt }
          ]
        }),
      });

      // Com modo 'no-cors', não podemos acessar a resposta diretamente
      // Então vamos retornar uma mensagem explicativa
      return "Esta consulta SQL busca informações do banco de dados. Para ver uma explicação detalhada, seria necessário configurar um proxy no servidor para evitar restrições de CORS.";
    } catch (error) {
      console.error("Erro ao explicar a query:", error);
      return "Ocorreu um erro ao tentar explicar esta consulta. Isso pode ser devido a restrições de CORS ao rodar em localhost.";
    }
  },
  goToScreenMitra: async (params: any, componentId?: string | null): Promise<any> => {
    try {
      console.log(`goToScreenMitra(${JSON.stringify(params)})`);
      const result = await messageService.sendInteraction('goToScreen', params, componentId);
      console.log(`goToScreenMitra result:`, result);
      return result;
    } catch (error) {
      console.error("JOOOOOOOO", error);
      console.error(`Erro ao executar goToScreenMitra:`, error);

      // Enviar erro via messageService
      const errorData = {
        source: 'goToScreenMitra',
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : 'No stack trace available',
        params: JSON.stringify(params),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      };
      messageService.sendMessage('ERROR', null, errorData, componentId || window.componentData?.id || null);

      throw error;
    }
  },
  // Adicionar updateMitra conforme documentação
  updateMitra: (params?: any) => {
    console.log(`updateMitra(${JSON.stringify(params)})`);
    // Este método é chamado pelo componente pai para controlar manualmente os updates
    // A implementação depende do contexto específico da aplicação
  },

  uploadFileMitra: async (params: any): Promise<any> => {
    try {
      console.log(`params uploadFileMitra(${JSON.stringify(params)})`);
      const result = await messageService.sendInteraction('upload', params);
      console.log(`uploadFileMitra result:`, result);
      return result;
    } catch (error) {
      const errorData = {
        source: 'uploadFileMitra',
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : 'No stack trace available',
        params: JSON.stringify(params),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      };
      messageService.sendMessage('ERROR', null, errorData || window.componentData?.id || null);
      throw error;
    }
  },

  // Função para executar consultas diretamente na API Mitra sem usar postMessage
  queryMitraWidget: async (params: any, queryDireta: string ): Promise<any> => {
    try {
      // Implementação direta para evitar dependência circular
      const {
        query = queryDireta,
        baseUrl = 'https://api0.mitraecp.com:1004',
        AuthorizationToken = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3YXluZXJAbWl0cmFsYWIuaW8iLCJYLVRlbmFudElEIjoidGVuYW50XzkxNDYifQ.AhFZFk9B2HeAzG47PXnUPJDluknZVX3UOtoGfz5A06IlQ7ln_G2LLuPQei3ijG6rshW5TDnZXs65di_bbgJobQ',
      } = params;

      // Make the API request
      const response = await fetch(`${baseUrl}/iaShortcuts/query`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Authorization': AuthorizationToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log(`queryMitraWidget result:`, result);
      return result;
    } catch (error) {
      console.error("JOOOOOOOO", error);
      console.error(`Erro ao executar queryMitraWidget:`, error);

      // Enviar erro via messageService
      const errorData = {
        source: 'queryMitraWidget',
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : 'No stack trace available',
        params: JSON.stringify(params),
        queryDireta,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      };
      messageService.sendMessage('ERROR', null, errorData, window.componentData?.id || null);

      throw error;
    }
  }

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

// Error Boundary específico para componentes dinâmicos
class DynamicErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: any}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("JOOOOOOOO - ErrorBoundary:", error, errorInfo);

    const errorData = {
      source: 'React ErrorBoundary',
      message: error?.message || String(error),
      stack: error?.stack || 'No stack trace available',
      componentStack: errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // Enviar erro via messageService
    messageService.sendMessage('ERROR', null, errorData, window.componentData?.id || null);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-100 text-red-800 rounded">
          <h3 className="font-bold">Erro capturado pelo ErrorBoundary:</h3>
          <pre className="mt-2 whitespace-pre-wrap">{this.state.error?.message || 'Erro desconhecido'}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- Componente Renderer Principal ---
const DynamicRenderer: React.FC = () => {
  const [componentCode, setComponentCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedPredefinedKey, setSelectedPredefinedKey] = useState<string | null>(null);
  const [RenderedComponent, setRenderedComponent] = useState<React.FC | null>(null);

  // Sistema de captura global de erros para código dinâmico
  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      console.error("JOOOOOOOO - Global Error:", event.error || event.message);

      // Verificar se o erro está relacionado ao código dinâmico
      const isDynamicError = event.filename?.includes('eval') ||
                           event.message?.includes('FixedComponent') ||
                           event.message?.includes('ReactComponentMitra') ||
                           event.error?.stack?.includes('eval');

      if (isDynamicError) {
        const errorData = {
          source: 'Dynamic Component Execution',
          message: event.message || 'Erro desconhecido',
          stack: event.error?.stack || `at ${event.filename}:${event.lineno}:${event.colno}`,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href
        };

        // Enviar erro via messageService
        messageService.sendMessage('ERROR', null, errorData, window.componentData?.id || null);

        // Atualizar estado local para mostrar erro na UI
        setError(`Erro no código dinâmico: ${event.message}`);
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error("JOOOOOOOO - Unhandled Promise Rejection:", event.reason);

      const errorData = {
        source: 'Promise Rejection',
        message: String(event.reason),
        stack: event.reason?.stack || 'No stack trace available',
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      };

      // Enviar erro via messageService
      messageService.sendMessage('ERROR', null, errorData, window.componentData?.id || null);

      // Atualizar estado local
      setError(`Promise rejeitada: ${event.reason}`);
    };

    // Adicionar listeners globais
    window.addEventListener('error', handleGlobalError, true); // true = capture phase
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Cleanup
    return () => {
      window.removeEventListener('error', handleGlobalError, true);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

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
          messageService.sendMessage('COMPONENT_RENDERED', null, { success: true, type: 'predefined', key: trimmedCode }, window.componentData?.id || null);

        } else {
          // Se não for pré-definido, trata como código JSX
          setComponentCode(trimmedCode);
          messageService.sendMessage('COMPONENT_RENDERED', null, { success: true, type: 'dynamic' }, window.componentData?.id || null);
        }

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido ao processar payload';
        setError(errorMessage);
        messageService.sendMessage('ERROR', null, { errorMessage: `${errorMessage}` }, window.componentData?.id || null);
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
      const processImports = (code: string): { processedCode: string, imports: Map<string, string[]>, importMappings: Map<string, Map<string, string>> } => {
        // Mapa para armazenar os imports (módulo -> [componentes])
        const imports = new Map<string, string[]>();
        // Mapa para armazenar os mapeamentos de nomes (módulo -> (nomeLocal -> nomeOriginal))
        const importMappings = new Map<string, Map<string, string>>();

        // Clonar o código para não modificar o original durante a iteração
        let result = code;

        // Regex para imports com chaves: import { X, Y, Z as W } from 'module';
        const importWithBracesRegex = /import\s+{\s*([\w\s,as]+)\s*}\s+from\s+['"]([^'"]+)['"];?/g;
        let match;

        // Encontrar todos os imports com chaves
        while ((match = importWithBracesRegex.exec(code)) !== null) {
          const rawComponents = match[1].split(',').map(c => c.trim()).filter(c => c.length > 0);
          const module = match[2];

          // Inicializar mapeamentos para este módulo se não existir
          if (!importMappings.has(module)) {
            importMappings.set(module, new Map<string, string>());
          }
          const moduleMapping = importMappings.get(module)!;

          // Processar componentes, lidando com imports que usam 'as'
          const components = rawComponents.map(comp => {
            // Se o componente usa 'as', extrair ambos os nomes
            if (comp.includes(' as ')) {
              const parts = comp.split(' as ');
              const originalName = parts[0].trim();
              const localName = parts[1].trim();
              // Armazenar o mapeamento: nome local -> nome original
              moduleMapping.set(localName, originalName);
              return localName; // Retorna o nome local
            }
            // Se não usa 'as', o nome local é igual ao original
            moduleMapping.set(comp, comp);
            return comp;
          });

          // Armazenar os componentes importados (apenas os não vazios)
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

        return { processedCode: result, imports, importMappings };
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
            const cleanComp = comp.trim();
            // Validar se o componente existe e não está vazio
            if (!cleanComp || cleanComp.length === 0) {
              return '// Componente vazio ignorado';
            }
            return `const ${cleanComp} = LucideReact.${cleanComp} || (() => React.createElement('div', {}, '${cleanComp} não encontrado')); console.log('${cleanComp} importado:', ${cleanComp});`;
          }).join('\n          ')}
        `;
      }

      // Processamento simplificado - apenas componentes básicos

      // Processar imports do Zod
      if (imports.has('zod')) {
        const zodComponents = imports.get('zod') || [];
        console.log('Componentes Zod importados:', zodComponents);

        importDeclarations += `
          // Zod já está disponível como 'z' no escopo
          ${zodComponents.map(comp => {
            const cleanComp = comp.trim();
            if (!cleanComp || cleanComp.length === 0) {
              return '// Componente vazio ignorado';
            }
            if (cleanComp === 'z') {
              return `const z = scope.z; console.log('z (Zod) importado:', z);`;
            }
            return `const ${cleanComp} = scope.z; console.log('${cleanComp} importado como z:', ${cleanComp});`;
          }).join('\n          ')}
        `;
      }

      // Processar imports do React Hook Form
      if (imports.has('react-hook-form')) {
        const rhfComponents = imports.get('react-hook-form') || [];
        console.log('Componentes React Hook Form importados:', rhfComponents);

        importDeclarations += `
          // React Hook Form já está disponível no escopo
          ${rhfComponents.map(comp => {
            const cleanComp = comp.trim();
            if (!cleanComp || cleanComp.length === 0) {
              return '// Componente vazio ignorado';
            }
            return `const ${cleanComp} = scope.${cleanComp}; console.log('${cleanComp} importado:', ${cleanComp});`;
          }).join('\n          ')}
        `;
      }

      // Processar imports do @hookform/resolvers/zod
      if (imports.has('@hookform/resolvers/zod')) {
        const resolverComponents = imports.get('@hookform/resolvers/zod') || [];
        console.log('Componentes @hookform/resolvers/zod importados:', resolverComponents);

        importDeclarations += `
          // Zod Resolver já está disponível no escopo
          ${resolverComponents.map(comp => {
            const cleanComp = comp.trim();
            if (!cleanComp || cleanComp.length === 0) {
              return '// Componente vazio ignorado';
            }
            return `const ${cleanComp} = scope.${cleanComp}; console.log('${cleanComp} importado:', ${cleanComp});`;
          }).join('\n          ')}
        `;
      }

      // Processar imports do date-fns
      if (imports.has('date-fns')) {
        const dateFnsComponents = imports.get('date-fns') || [];
        console.log('Componentes date-fns importados:', dateFnsComponents);

        importDeclarations += `
          // Importar funções do date-fns
          console.log('dateFns disponível:', dateFns);
          ${dateFnsComponents.map(comp => {
            const cleanComp = comp.trim();
            // Validar se o componente existe e não está vazio
            if (!cleanComp || cleanComp.length === 0) {
              return '// Componente vazio ignorado';
            }
            // Usar as funções diretamente do scope, que já estão disponíveis
            return `const ${cleanComp} = scope.${cleanComp} || (() => { throw new Error('${cleanComp} não encontrado no date-fns'); }); console.log('${cleanComp} importado:', ${cleanComp});`;
          }).join('\n          ')}
        `;
      }

      // Processar imports do clsx
      if (imports.has('clsx')) {
        const clsxComponents = imports.get('clsx') || [];
        console.log('Componentes clsx importados:', clsxComponents);

        importDeclarations += `
          // clsx já está disponível no escopo
          ${clsxComponents.map(comp => {
            const cleanComp = comp.trim();
            if (!cleanComp || cleanComp.length === 0) {
              return '// Componente vazio ignorado';
            }
            if (cleanComp === 'default' || cleanComp === 'clsx') {
              return `const clsx = scope.clsx; console.log('clsx importado:', clsx);`;
            }
            return `const ${cleanComp} = scope.clsx; console.log('${cleanComp} importado como clsx:', ${cleanComp});`;
          }).join('\n          ')}
        `;
      }

      // Processar imports do date-fns/locale
      if (imports.has('date-fns/locale')) {
        const localeComponents = imports.get('date-fns/locale') || [];
        console.log('Locales date-fns importados:', localeComponents);

        importDeclarations += `
          // Importar locales do date-fns
          ${localeComponents.map(comp => {
            const cleanComp = comp.trim();
            // Validar se o componente existe e não está vazio
            if (!cleanComp || cleanComp.length === 0) {
              return '// Componente vazio ignorado';
            }
            return `const ${cleanComp} = ptBR || {}; console.log('${cleanComp} importado:', ${cleanComp});`;
          }).join('\n          ')}
        `;
      }

      // Tabler Icons removido para otimização

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
        '@/components/ui/avatar',
        '@/components/ui/avatar-safe',
        '@/components/ui/avatar-fallback-only',
        '@/hooks/use-toast',
        '@tanstack/react-table',
        'recharts',
        'lucide-react',
        'zod',
        'react-hook-form',
        '@hookform/resolvers/zod',
        // 'react-day-picker',
        // 'react-day-picker/persian',
        'clsx',
        // Adicionar módulos do date-fns
        'date-fns',
        'date-fns/locale'
      ];

      knownModules.forEach(module => {
        if (imports.has(module)) {
          importDeclarations += `
            // Componentes importados de ${module} já estão disponíveis no escopo global
            // ${imports.get(module)?.join(', ')}
          `;
        }
      });

      // Debug: Verificar se z está disponível
      console.log('Zod (z) disponível no escopo:', z);
      console.log('Tipo de z:', typeof z);

      // 6. Criar um wrapper para o componente transpilado
      const processedComponentCode = `
        // Declarações de imports processados (ANTES do código do usuário)
        ${importDeclarations}

        // Código do usuário transpilado (sem imports)
        ${cleanedCode}

        // Componente wrapper que expõe o componente do usuário como ReactComponentMitra
        function ReactComponentMitra(props) {
          if (typeof window !== 'undefined' && !window.Image) {
            window.Image = function() {
              const img = document.createElement('img');
              return img;
            };
            window.Image.prototype = HTMLImageElement.prototype;
          }

          // Função para filtrar props do Recharts que não devem ir para elementos DOM
          window.filterRechartsProps = (props) => {
            if (!props || typeof props !== 'object') return props;

            const rechartsProps = [
              'dataKey', 'nameKey', 'valueKey', 'cx', 'cy', 'innerRadius', 'outerRadius',
              'startAngle', 'endAngle', 'fill', 'stroke', 'strokeWidth', 'strokeDasharray',
              'activeIndex', 'activeShape', 'animationBegin', 'animationDuration',
              'isAnimationActive', 'animationEasing', 'onAnimationStart', 'onAnimationEnd',
              'payload', 'viewBox', 'coordinate', 'offset'
            ];

            const filteredProps = { ...props };
            rechartsProps.forEach(prop => {
              delete filteredProps[prop];
            });

            return filteredProps;
          };

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
              className: 'h-[100vh] p-.5',
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

      const defineComponent = new Function(
        'scope', // O nome do argumento que receberá o registro
        'React', // React global
        `
          // Acesso aos dados do componente via variável global
          const componentData = window.componentData || {};

          // Acesso a objetos globais de forma segura PRIMEIRO
          const Date = window.Date || globalThis.Date;
          const Array = window.Array || globalThis.Array;
          const Object = window.Object || globalThis.Object;
          const String = window.String || globalThis.String;
          const Number = window.Number || globalThis.Number;
          const Boolean = window.Boolean || globalThis.Boolean;
          const RegExp = window.RegExp || globalThis.RegExp;
          const Math = window.Math || globalThis.Math;
          const JSON = window.JSON || globalThis.JSON;
          const Map = window.Map || globalThis.Map;
          const Set = window.Set || globalThis.Set;
          const Promise = window.Promise || globalThis.Promise;
          const setTimeout = window.setTimeout || globalThis.setTimeout;
          const clearTimeout = window.clearTimeout || globalThis.clearTimeout;
          const setInterval = window.setInterval || globalThis.setInterval;
          const clearInterval = window.clearInterval || globalThis.clearInterval;

          // Acesso aos utilitários
          const cn = scope.cn;
          const z = scope.z;

          // // Acesso ao objeto LucideReact
          const LucideReact = scope.LucideReact;

          // Acesso ao objeto TablerIcons
          const TablerIcons = scope.TablerIcons;

          // Acesso aos objetos React Icons
          const ReactIcons = scope.ReactIcons;
          const AiIcons = scope.AiIcons;
          const BiIcons = scope.BiIcons;
          const BsIcons = scope.BsIcons;
          const CgIcons = scope.CgIcons;
          const DiIcons = scope.DiIcons;
          const FaIcons = scope.FaIcons;
          const Fa6Icons = scope.Fa6Icons;
          const FcIcons = scope.FcIcons;
          const FiIcons = scope.FiIcons;
          const GiIcons = scope.GiIcons;
          const GoIcons = scope.GoIcons;
          const GrIcons = scope.GrIcons;
          const HiIcons = scope.HiIcons;
          const Hi2Icons = scope.Hi2Icons;
          const ImIcons = scope.ImIcons;
          const IoIcons = scope.IoIcons;
          const Io5Icons = scope.Io5Icons;
          const LiaIcons = scope.LiaIcons;
          const LuIcons = scope.LuIcons;
          const MdIcons = scope.MdIcons;
          const PiIcons = scope.PiIcons;
          const RiIcons = scope.RiIcons;
          const RxIcons = scope.RxIcons;
          const SiIcons = scope.SiIcons;
          const SlIcons = scope.SlIcons;
          const TbIcons = scope.TbIcons;
          const TfiIcons = scope.TfiIcons;
          const TiIcons = scope.TiIcons;
          const VscIcons = scope.VscIcons;
          const WiIcons = scope.WiIcons;

          // Acesso aos objetos date-fns (disponíveis via scope)
          const dateFns = scope.dateFns;

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
      messageService.sendMessage('ERROR', null, { errorMessage: `${errorMessage}` }, window.componentData?.id || null);
    }

  }, [componentCode]); // Dependência: re-executa SÓ quando o código mudar

  // --- Renderização ---
  const renderContent = () => {
    if (error) {
      return (
        <div className="p-4 bg-red-100 text-red-800 rounded-xl m-[1px]">
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
      // Wrapper que captura erros durante a execução do componente dinâmico
      const SafeDynamicComponent = () => {
        try {
          return <RenderedComponent />;
        } catch (renderError) {
          console.error("JOOOOOOOO - Render Error:", renderError);

          const errorData = {
            source: 'Dynamic Component Render',
            message: renderError instanceof Error ? renderError.message : String(renderError),
            stack: renderError instanceof Error ? renderError.stack : 'No stack trace available',
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
          };

          // Enviar erro via messageService
          messageService.sendMessage('ERROR', null, errorData, window.componentData?.id || null);

          return (
            <div className="p-4 bg-red-100 text-red-800 rounded">
              <h3 className="font-bold">Erro na renderização do componente dinâmico:</h3>
              <pre className="mt-2 whitespace-pre-wrap">{renderError instanceof Error ? renderError.message : String(renderError)}</pre>
            </div>
          );
        }
      };

      return <DynamicErrorBoundary><SafeDynamicComponent /></DynamicErrorBoundary>;
    }

    // Estado inicial ou quando nenhum código/chave foi fornecido
    return (
      <div className="flex-grow flex items-center justify-center h-[100vh] text-muted-foreground">
          <Skeleton className="w-full h-full animate-pulse" />
      </div>
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