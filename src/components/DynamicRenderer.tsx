"use client"

import React, { useEffect, useState } from 'react';
import { messageService } from '@/lib/message-service';
// Importar todos os componentes que podem ser usados no código dinâmico
// Componentes básicos
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
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

// Componentes personalizados
import { Dashboard } from './Dashboard';

// Ícones
import * as LucideReact from 'lucide-react';
import { sanitizeJSXCode, transformJSX } from '@/lib/jsx-transformer';
import { processArbitraryValues } from '@/lib/arbitrary-values-processor';

// Componentes pré-definidos para uso direto
const SimpleButton = () => {
  const [count, setCount] = useState(0);
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

// Componente para renderizar código React dinamicamente
const DynamicRenderer: React.FC = () => {
  const [componentCode, setComponentCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  useEffect(() => {
    // Adicionar listener para mensagens de renderização de componentes
    const unsubscribe = messageService.addListener('RENDER_COMPONENT', (payload) => {
      try {
        if (typeof payload === 'string') {
          // Verificar se o código é um identificador de componente pré-definido
          if (payload.trim() === 'SIMPLE_BUTTON') {
            setSelectedComponent('SIMPLE_BUTTON');
            setComponentCode(null);
            setError(null);
            messageService.sendMessage('COMPONENT_RENDERED', { success: true });
            return;
          } else if (payload.trim() === 'SIMPLE_CARD') {
            setSelectedComponent('SIMPLE_CARD');
            setComponentCode(null);
            setError(null);
            messageService.sendMessage('COMPONENT_RENDERED', { success: true });
            return;
          } else if (payload.trim() === 'DASHBOARD') {
            setSelectedComponent('DASHBOARD');
            setComponentCode(null);
            setError(null);
            messageService.sendMessage('COMPONENT_RENDERED', { success: true });
            return;
          }

          // Se não for um componente pré-definido, tenta renderizar o código
          setComponentCode(payload);
          setSelectedComponent(null);
          setError(null);

          // Informar ao pai que o componente foi renderizado com sucesso
          messageService.sendMessage('COMPONENT_RENDERED', { success: true });
        } else {
          throw new Error('Payload inválido: deve ser uma string de código React');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
        setError(errorMessage);
        messageService.sendMessage('ERROR', { message: errorMessage });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Renderizar componente pré-definido
  const renderPredefinedComponent = () => {
    switch (selectedComponent) {
      case 'SIMPLE_BUTTON':
        return <SimpleButton />;
      case 'SIMPLE_CARD':
        return <SimpleCard />;
      case 'DASHBOARD':
        return <Dashboard />;
      default:
        return null;
    }
  };

  // Função para renderizar o componente dinamicamente
  const renderDynamicComponent = () => {
    if (!componentCode) return null;

    try {
      // Sanitizar o código para garantir que seja válido
      const sanitizedCode = sanitizeJSXCode(componentCode);

      // Processar valores arbitrários do Tailwind
      const processedCode = processArbitraryValues(sanitizedCode);
      console.log('Código processado com valores arbitrários:', processedCode);

      // Transpilar o código JSX para JavaScript válido
      let transpiledCode;
      try {
        transpiledCode = transformJSX(processedCode);
        console.log('Código transpilado com sucesso');
      } catch (error) {
        console.error('Erro ao transpilar código com Babel:', error);
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        throw new Error(`Erro ao transpilar código: ${errorMessage}`);
      }

      // Não fazemos mais detecção baseada em texto - processamos diretamente o JSX

      // Abordagem direta: definir o componente diretamente no escopo atual
      try {
        console.log('Processando código JSX...');

        // Criar um componente dinâmico diretamente a partir do código
        // Esta abordagem é mais direta e evita problemas de escopo
        const DynamicComponentWrapper = () => {
          // Definir variáveis para o escopo local
          let Component: React.FC | null = null;

          // Executar o código para definir o Component
          try {
            // eslint-disable-next-line no-new-func
            const defineComponent = new Function(
              'React',
              // Componentes básicos
              'Button',
              'Card', 'CardHeader', 'CardContent', 'CardDescription', 'CardTitle', 'CardFooter',
              'Input', 'Label', 'Checkbox',

              // Componentes de layout
              'Accordion', 'AccordionContent', 'AccordionItem', 'AccordionTrigger',
              'Alert', 'AlertDescription', 'AlertTitle',
              'AlertDialog', 'AlertDialogAction', 'AlertDialogCancel', 'AlertDialogContent', 'AlertDialogDescription', 'AlertDialogFooter', 'AlertDialogHeader', 'AlertDialogTitle', 'AlertDialogTrigger',
              'AspectRatio',
              'Avatar', 'AvatarFallback', 'AvatarImage',
              'Badge',
              'Breadcrumb', 'BreadcrumbItem', 'BreadcrumbLink', 'BreadcrumbList', 'BreadcrumbPage', 'BreadcrumbSeparator',

              // Componentes de data
              'Calendar',
              'Carousel', 'CarouselContent', 'CarouselItem', 'CarouselNext', 'CarouselPrevious',

              // Componentes de disclosure
              'Collapsible', 'CollapsibleContent', 'CollapsibleTrigger',
              'Command', 'CommandDialog', 'CommandEmpty', 'CommandGroup', 'CommandInput', 'CommandItem', 'CommandList', 'CommandSeparator', 'CommandShortcut',
              'ContextMenu', 'ContextMenuCheckboxItem', 'ContextMenuContent', 'ContextMenuItem', 'ContextMenuLabel', 'ContextMenuRadioGroup', 'ContextMenuRadioItem', 'ContextMenuSeparator', 'ContextMenuShortcut', 'ContextMenuSub', 'ContextMenuSubContent', 'ContextMenuSubTrigger', 'ContextMenuTrigger',
              'Dialog', 'DialogContent', 'DialogDescription', 'DialogFooter', 'DialogHeader', 'DialogTitle', 'DialogTrigger',
              'Drawer', 'DrawerClose', 'DrawerContent', 'DrawerDescription', 'DrawerFooter', 'DrawerHeader', 'DrawerTitle', 'DrawerTrigger',
              'DropdownMenu', 'DropdownMenuCheckboxItem', 'DropdownMenuContent', 'DropdownMenuGroup', 'DropdownMenuItem', 'DropdownMenuLabel', 'DropdownMenuPortal', 'DropdownMenuRadioGroup', 'DropdownMenuRadioItem', 'DropdownMenuSeparator', 'DropdownMenuShortcut', 'DropdownMenuSub', 'DropdownMenuSubContent', 'DropdownMenuSubTrigger', 'DropdownMenuTrigger',

              // Componentes de formulário
              'Form', 'FormControl', 'FormDescription', 'FormField', 'FormItem', 'FormLabel', 'FormMessage',
              'HoverCard', 'HoverCardContent', 'HoverCardTrigger',
              'Menubar', 'MenubarCheckboxItem', 'MenubarContent', 'MenubarGroup', 'MenubarItem', 'MenubarLabel', 'MenubarMenu', 'MenubarRadioGroup', 'MenubarRadioItem', 'MenubarSeparator', 'MenubarShortcut', 'MenubarSub', 'MenubarSubContent', 'MenubarSubTrigger', 'MenubarTrigger',
              'NavigationMenu', 'NavigationMenuContent', 'NavigationMenuItem', 'NavigationMenuLink', 'NavigationMenuList', 'NavigationMenuTrigger', 'navigationMenuTriggerStyle',

              // Componentes de feedback
              'Pagination', 'PaginationContent', 'PaginationEllipsis', 'PaginationItem', 'PaginationLink', 'PaginationNext', 'PaginationPrevious',
              'Popover', 'PopoverContent', 'PopoverTrigger',
              'Progress',
              'RadioGroup', 'RadioGroupItem',
              'ResizablePanel', 'ResizablePanelGroup', 'ResizableHandle',
              'ScrollArea', 'ScrollBar',
              'Select', 'SelectContent', 'SelectGroup', 'SelectItem', 'SelectLabel', 'SelectSeparator', 'SelectTrigger', 'SelectValue',
              'Separator',
              'Sheet', 'SheetClose', 'SheetContent', 'SheetDescription', 'SheetFooter', 'SheetHeader', 'SheetTitle', 'SheetTrigger',
              'Skeleton',
              'Slider',
              'Switch',
              'Table', 'TableBody', 'TableCaption', 'TableCell', 'TableFooter', 'TableHead', 'TableHeader', 'TableRow',
              'Tabs', 'TabsContent', 'TabsList', 'TabsTrigger',
              'Textarea',
              'Toggle',
              'Tooltip', 'TooltipContent', 'TooltipProvider', 'TooltipTrigger',

              // Componentes personalizados
              'Dashboard',

              // Ícones
              'LucideReact',

              `
                // Disponibilizar o LucideReact globalmente para o código do usuário
                window.LucideReact = LucideReact;
                ${transpiledCode}
                return Component;
              `
            );

            Component = defineComponent(
              React,
              // Componentes básicos
              Button,
              Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter,
              Input, Label, Checkbox,

              // Componentes de layout
              Accordion, AccordionContent, AccordionItem, AccordionTrigger,
              Alert, AlertDescription, AlertTitle,
              AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
              AspectRatio,
              Avatar, AvatarFallback, AvatarImage,
              Badge,
              Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,

              // Componentes de data
              Calendar,
              Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,

              // Componentes de disclosure
              Collapsible, CollapsibleContent, CollapsibleTrigger,
              Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut,
              ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger,
              Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
              Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger,
              DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger,

              // Componentes de formulário
              Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
              HoverCard, HoverCardContent, HoverCardTrigger,
              Menubar, MenubarCheckboxItem, MenubarContent, MenubarGroup, MenubarItem, MenubarLabel, MenubarMenu, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger,
              NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle,

              // Componentes de feedback
              Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,
              Popover, PopoverContent, PopoverTrigger,
              Progress,
              RadioGroup, RadioGroupItem,
              ResizablePanel, ResizablePanelGroup, ResizableHandle,
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

              // Componentes personalizados
              Dashboard,

              // Ícones
              LucideReact
            );
          } catch (error) {
            console.error('Erro ao definir o componente:', error);
            throw new Error(`Erro ao definir o componente: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
          }

          // Verificar se Component foi definido
          if (!Component) {
            throw new Error('O componente não foi definido corretamente. Certifique-se de definir uma função chamada "Component".');
          }

          return <Component />;
        };

        // Renderizar o wrapper que contém o componente dinâmico
        return <DynamicComponentWrapper />;
      } catch (evalError) {
        console.error('Erro ao avaliar o código:', evalError);

        // Se o erro for relacionado a JSX, tentar renderizar um componente simples
        if (evalError && evalError.toString().includes("Unexpected token '<'")) {
          messageService.sendMessage('ERROR', { message: 'Erro de sintaxe JSX. Tentando renderizar um componente simples...' });
          return (
            <div>
              <h2 className="text-2xl font-bold mb-4">Componente Fallback</h2>
              <p className="mb-4">O código JSX não pôde ser processado, mas renderizamos este componente simples.</p>
              <Button>Botão Fallback</Button>
            </div>
          );
        }

        throw evalError;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao renderizar componente';
      setError(errorMessage);
      messageService.sendMessage('ERROR', { message: errorMessage });
      return <div className="p-4 bg-red-100 text-red-800 rounded">Erro: {errorMessage}</div>;
    }
  };

  return (
    <div className="dynamic-renderer p-4">
      {error ? (
        <div className="p-4 bg-red-100 text-red-800 rounded">
          <h3 className="font-bold">Erro ao renderizar componente:</h3>
          <pre className="mt-2 whitespace-pre-wrap">{error}</pre>
        </div>
      ) : selectedComponent ? (
        renderPredefinedComponent()
      ) : componentCode ? (
        renderDynamicComponent()
      ) : (
        <div className="p-4 text-center">
          <p className="text-muted-foreground">
            Aguardando código do componente...
          </p>
        </div>
      )}
    </div>
  );
};

export default DynamicRenderer;
