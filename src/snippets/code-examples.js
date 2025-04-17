/**
 * Exemplos de código para o DynamicRenderer
 * Armazenados em um arquivo separado para evitar problemas de lint no HTML
 * Organizados por categorias para fácil acesso
 */

//=============================================================================
// EXEMPLOS BÁSICOS
//=============================================================================

// Botão simples com contador
export const buttonExample = `const Component = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div className="p-4 bg-white">
      <h2 className="text-2xl font-bold mb-4">Botão com Contador</h2>
      <Button
        onClick={() => setCount(prev => prev + 1)}
      >
        Cliques: {count}
      </Button>
    </div>
  );
}`;

// Grupo de botões com diferentes variantes
export const buttonGroupExample = escapeBackticks(`function Component() {
  return (
    <div className="p-4 bg-white text-black">
      <h2 className="text-2xl font-bold mb-4">Grupo de Botões</h2>
      <div className="flex space-x-2">
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90" variant="default">Padrão</Button>
        <Button className="bg-destructive text-destructive-foreground hover:bg-destructive/90" variant="destructive">Destrutivo</Button>
        <Button className="border border-input bg-background hover:bg-accent hover:text-accent-foreground" variant="outline">Contorno</Button>
        <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/80" variant="secondary">Secundário</Button>
        <Button className="hover:bg-accent hover:text-accent-foreground" variant="ghost">Fantasma</Button>
        <Button className="text-primary underline-offset-4 hover:underline" variant="link">Link</Button>
      </div>
    </div>
  );
}`);

// Botão toggle que muda de estado
export const toggleExample = escapeBackticks(`const Component = () => {
  const [enabled, setEnabled] = React.useState(false);
  return (
    <div className="p-4 bg-white text-black">
      <h2 className="text-2xl font-bold mb-4">Botão Toggle</h2>
      <div className="flex items-center space-x-2">
        <Button
          variant={enabled ? "default" : "outline"}
          onClick={() => setEnabled(!enabled)}
        >
          {enabled ? "Ativado" : "Desativado"}
        </Button>
        <div className="text-sm">
          Status: <span className={enabled ? "text-green-500" : "text-red-500"}>
            {enabled ? "ON" : "OFF"}
          </span>
        </div>
      </div>
    </div>
  );
}`);

// Contador simples
export const counterExample = escapeBackticks(`const Component = () => {
  const [count, setCount] = React.useState(0);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => Math.max(0, prev - 1));
  const reset = () => setCount(0);

  return (
    <div className="p-4 bg-white text-black">
      <h2 className="text-2xl font-bold mb-4">Contador</h2>
      <div className="flex flex-col items-center space-y-4">
        <div className="text-4xl font-bold">{count}</div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={decrement}>-</Button>
          <Button variant="default" onClick={increment}>+</Button>
          <Button variant="secondary" onClick={reset}>Reset</Button>
        </div>
      </div>
    </div>
  );
}`);

//=============================================================================
// EXEMPLOS DE LAYOUT
//=============================================================================

// Card simples
export const cardExample = escapeBackticks(`const Component = () => {
  return (
    <Card className="w-full max-w-md mx-auto bg-white">
      <CardHeader>
        <CardTitle>Título do Card</CardTitle>
        <CardDescription>Descrição do card com informações adicionais</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Este é um exemplo de card do Shadcn UI renderizado dinamicamente.</p>
      </CardContent>
      <div className="p-6 pt-0 flex justify-end">
        <Button>Ação</Button>
      </div>
    </Card>
  );
}`);

// Lista de cards
export const cardListExample = escapeBackticks(`const Component = () => {
  const cards = [
    { id: 1, title: 'Card 1', description: 'Descrição do primeiro card', content: 'Conteúdo detalhado do card 1.' },
    { id: 2, title: 'Card 2', description: 'Descrição do segundo card', content: 'Conteúdo detalhado do card 2.' },
    { id: 3, title: 'Card 3', description: 'Descrição do terceiro card', content: 'Conteúdo detalhado do card 3.' },
  ];

  return (
    <div className="p-4 bg-white text-black">
      <h2 className="text-2xl font-bold mb-4">Lista de Cards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(card => (
          <Card key={card.id} className="w-full">
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{card.content}</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Ver detalhes</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}`);

// Tabs
export const tabsExample = escapeBackticks(`const Component = () => {
  return (
    <div className="p-4 bg-white text-black">
      <h2 className="text-2xl font-bold mb-4">Exemplo de Tabs</h2>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="account">Conta</TabsTrigger>
          <TabsTrigger value="password">Senha</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="p-4 border rounded-md mt-2">
          <h3 className="text-lg font-medium">Configurações da Conta</h3>
          <p className="text-sm text-gray-500 mt-2">Gerencie as configurações da sua conta e preferências.</p>
        </TabsContent>
        <TabsContent value="password" className="p-4 border rounded-md mt-2">
          <h3 className="text-lg font-medium">Alterar Senha</h3>
          <p className="text-sm text-gray-500 mt-2">Atualize sua senha para manter sua conta segura.</p>
        </TabsContent>
        <TabsContent value="settings" className="p-4 border rounded-md mt-2">
          <h3 className="text-lg font-medium">Preferências</h3>
          <p className="text-sm text-gray-500 mt-2">Personalize a aparência e funcionalidades do sistema.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}`);

// Accordion simples
export const accordionExample = escapeBackticks(`const Component = () => {
  return (
    <div className="p-4 bg-white text-black">
      <h2 className="text-2xl font-bold mb-4">Accordion</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>O que é o Shadcn UI?</AccordionTrigger>
          <AccordionContent>
            Shadcn UI é uma coleção de componentes reutilizáveis construídos com Radix UI e Tailwind CSS.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Como instalar?</AccordionTrigger>
          <AccordionContent>
            Você pode instalar os componentes individualmente usando o CLI do Shadcn UI.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>É gratuito?</AccordionTrigger>
          <AccordionContent>
            Sim, o Shadcn UI é completamente gratuito e open-source.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}`);

// Dashboard
export const dashboardExample = escapeBackticks(`const Component = () => {
  return (
    <div className="space-y-4 bg-white p-4">
      <h2 className="text-2xl font-bold">Dashboard Dinâmico</h2>
      <Dashboard />
    </div>
  );
}`);

//=============================================================================
// EXEMPLOS INTERATIVOS
//=============================================================================

// Formulário simples
export const formExample = escapeBackticks(`const Component = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(formData, null, 2));
  };

  return (
    <div className="p-4 bg-white text-black">
      <h2 className="text-2xl font-bold mb-4">Formulário Simples</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Seu nome"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="seu@email.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Mensagem</Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Digite sua mensagem..."
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="agreeToTerms"
            checked={formData.agreeToTerms}
            onCheckedChange={(checked) =>
              setFormData(prev => ({ ...prev, agreeToTerms: checked }))
            }
          />
          <Label htmlFor="agreeToTerms">Concordo com os termos</Label>
        </div>

        <Button type="submit" className="w-full">Enviar</Button>
      </form>
    </div>
  );
}`);

// Formulário de login
export const loginFormExample = escapeBackticks(`const Component = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular login
    setTimeout(() => {
      setIsLoading(false);
      alert(\`Login simulado com: \${email}\`);
    }, 1500);
  };

  return (
    <div className="p-4 bg-white text-black">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Entre com seu email e senha para acessar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Button variant="link" className="p-0 h-auto font-normal" type="button">
                  Esqueceu a senha?
                </Button>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={setRememberMe}
              />
              <Label htmlFor="remember">Lembrar de mim</Label>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="mr-2">Carregando</span>
                  {/* Aqui poderia ter um ícone de loading */}
                </>
              ) : (
                'Entrar'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-center text-gray-500">
            Não tem uma conta?{' '}
            <Button variant="link" className="p-0 h-auto font-normal" type="button">
              Registre-se
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}`);

// Tooltip
export const tooltipExample = escapeBackticks(`const Component = () => {
  return (
    <div className="p-4 bg-white text-black">
      <h2 className="text-2xl font-bold mb-4">Exemplo de Tooltip</h2>
      <div className="flex items-center justify-center space-x-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Passe o mouse</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Informação adicional em um tooltip</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="default">Ajuda</Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Tooltips podem aparecer em diferentes posições</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}`);

// Modo escuro
export const darkModeExample = escapeBackticks(`const Component = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className={\`p-4 rounded-lg transition-colors duration-200 \${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}\`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Modo Escuro</h2>
        <Button
          variant="outline"
          onClick={toggleDarkMode}
          className={isDarkMode ? 'border-gray-700' : ''}
        >
          {isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
        </Button>
      </div>

      <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}>
        <CardHeader>
          <CardTitle>Conteúdo do Card</CardTitle>
          <CardDescription className={isDarkMode ? 'text-gray-400' : ''}>Este card muda com o tema</CardDescription>
        </CardHeader>
        <CardContent>
          <p>O conteúdo se adapta ao tema selecionado.</p>
        </CardContent>
        <CardFooter>
          <Button variant={isDarkMode ? 'secondary' : 'default'}>Ação</Button>
        </CardFooter>
      </Card>
    </div>
  );
}`);

// Notificações
export const notificationExample = escapeBackticks(`const Component = () => {
  const [notifications, setNotifications] = React.useState([]);

  const addNotification = (type) => {
    const id = Date.now();
    const newNotification = {
      id,
      type,
      title: \`Notificação \${type}\`,
      message: \`Esta é uma notificação do tipo \${type} criada às \${new Date().toLocaleTimeString()}.\`,
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Auto-remove após 3 segundos
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationStyle = (type) => {
    switch(type) {
      case 'success': return 'bg-green-100 border-green-500 text-green-800';
      case 'error': return 'bg-red-100 border-red-500 text-red-800';
      case 'warning': return 'bg-yellow-100 border-yellow-500 text-yellow-800';
      default: return 'bg-blue-100 border-blue-500 text-blue-800';
    }
  };

  return (
    <div className="p-4 bg-white text-black">
      <h2 className="text-2xl font-bold mb-4">Sistema de Notificações</h2>

      <div className="flex space-x-2 mb-4">
        <Button onClick={() => addNotification('info')} variant="outline">Info</Button>
        <Button onClick={() => addNotification('success')} variant="outline" className="text-green-600">Sucesso</Button>
        <Button onClick={() => addNotification('warning')} variant="outline" className="text-yellow-600">Aviso</Button>
        <Button onClick={() => addNotification('error')} variant="outline" className="text-red-600">Erro</Button>
      </div>

      <div className="space-y-2 max-h-60 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Nenhuma notificação</p>
        ) : (
          notifications.map(notification => (
            <div
              key={notification.id}
              className={\`p-3 border-l-4 rounded flex justify-between items-start \${getNotificationStyle(notification.type)}\`}
            >
              <div>
                <h3 className="font-semibold">{notification.title}</h3>
                <p className="text-sm">{notification.message}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeNotification(notification.id)}
                className="h-6 w-6 p-0 rounded-full"
              >
                &times;
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}`);

//=============================================================================
// EXEMPLOS AVANÇADOS
//=============================================================================

// Formulário complexo com validação
export const complexFormExample = escapeBackticks(`const Component = () => {
  // Hooks e Componentes do scope: useState, React, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Label, Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Checkbox, Button, Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    agreedToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const { User, Mail, Tag, CheckCircle } = LucideReact; // Ícones do scope

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Nome é obrigatório.";
    if (!formData.email) {
      tempErrors.email = "Email é obrigatório.";
    } else if (!/\\S+@\\S+\\.\\S+/.test(formData.email)) {
      tempErrors.email = "Email inválido.";
    }
    if (!formData.category) tempErrors.category = "Selecione uma categoria.";
    if (!formData.agreedToTerms) tempErrors.agreedToTerms = "Você deve aceitar os termos.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (value) => {
     setFormData(prev => ({ ...prev, category: value }));
  };

   const handleCheckboxChange = (checked) => {
     setFormData(prev => ({ ...prev, agreedToTerms: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      console.log("Formulário Válido, enviando:", formData);
      // Simular envio
      setTimeout(() => {
        setIsSubmitting(false);
        setShowDialog(true); // Abre o diálogo ao "enviar" com sucesso
      }, 1000);
    } else {
      console.log("Erro de validação", errors);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto bg-white">
      <CardHeader>
        <CardTitle>Formulário Complexo</CardTitle>
        <CardDescription>Preencha os detalhes abaixo.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <div className="relative">
               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                 {User && <User size={16} />}
               </div>
              <Input id="name" value={formData.name} onChange={handleChange} placeholder="Seu Nome Completo" className={\`pl-10 ${errors.name ? 'border-red-500' : ''}\`} />
            </div>
            {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
             <div className="relative">
               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                 {Mail && <Mail size={16} />}
               </div>
               <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="seu@email.com" className={\`pl-10 \${errors.email ? 'border-red-500' : ''}\`} />
             </div>
            {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
          </div>

          {/* Categoria */}
          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
             <div className="relative">
               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                 {Tag && <Tag size={16} />}
               </div>
              <Select id="category" onValueChange={handleSelectChange} value={formData.category}>
                <SelectTrigger className={\`pl-10 \${errors.category ? 'border-red-500' : ''}\`}>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tech">Tecnologia</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {errors.category && <p className="text-xs text-red-600">{errors.category}</p>}
          </div>

          {/* Termos */}
          <div className="flex items-center space-x-2">
            <Checkbox id="agreedToTerms" checked={formData.agreedToTerms} onCheckedChange={handleCheckboxChange} />
            <Label htmlFor="agreedToTerms" className={\`text-sm \${errors.agreedToTerms ? 'text-red-600' : ''}\`}>
              Eu aceito os termos e condições
            </Label>
          </div>
           {errors.agreedToTerms && <p className="text-xs text-red-600 -mt-2">{errors.agreedToTerms}</p>}

          {/* Botão Submit */}
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
               <Button type="submit" className="w-full" disabled={isSubmitting}>
                 {isSubmitting ? 'Enviando...' : 'Enviar Cadastro'}
               </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  {CheckCircle && <CheckCircle className="text-green-500 mr-2" size={20}/>} Sucesso!
                </DialogTitle>
                <DialogDescription>
                  Seu cadastro foi enviado (simulado). Dados: {JSON.stringify(formData)}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button onClick={() => setShowDialog(false)}>Fechar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </form>
      </CardContent>
    </Card>
  );
}`);

export const userTableExample = escapeBackticks(`const Component = () => {
  // Hooks e Componentes: useState, React, Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableCaption, Button, Badge
  const initialUsers = [
    { id: 1, name: 'Alice Silva', email: 'alice@example.com', status: 'active', role: 'Admin' },
    { id: 2, name: 'Bruno Costa', email: 'bruno@example.com', status: 'inactive', role: 'User' },
    { id: 3, name: 'Carla Dias', email: 'carla@example.com', status: 'active', role: 'User' },
    { id: 4, name: 'Daniel Reis', email: 'daniel@example.com', status: 'pending', role: 'Editor' },
  ];
  const [users, setUsers] = useState(initialUsers);

  const { Trash2, Edit } = LucideReact; // Ícones

  const handleDelete = (userId) => {
    console.log('Tentando deletar usuário:', userId);
    setUsers(currentUsers => currentUsers.filter(user => user.id !== userId));
    alert(\`Usuário \${userId} removido (simulado)!\`);
  };

  const handleEdit = (userId) => {
    alert(\`Editar usuário \${userId} (não implementado)\`);
  };

  const getStatusVariant = (status) => {
    switch(status) {
      case 'active': return 'success'; // Assume que você tem variantes de Badge ou usa default
      case 'inactive': return 'secondary';
      case 'pending': return 'warning'; // Assume variantes personalizadas ou usa default
      default: return 'outline';
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white">
      <h2 className="text-xl font-semibold mb-4">Lista de Usuários</h2>
      <Table>
        <TableCaption>Uma lista dos usuários recentes.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Cargo</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground">
                Nenhum usuário encontrado.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(user.status)}>{user.status}</Badge>
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className="text-right space-x-1">
                   <Button variant="outline" size="icon" onClick={() => handleEdit(user.id)} aria-label="Editar">
                     {Edit && <Edit className="h-4 w-4" />}
                   </Button>
                   <Button variant="destructive" size="icon" onClick={() => handleDelete(user.id)} aria-label="Excluir">
                     {Trash2 && <Trash2 className="h-4 w-4" />}
                   </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}`);

export const loadingAccordionExample = escapeBackticks(`const Component = () => {
  // Hooks e Componentes: useState, useEffect, React, Accordion, AccordionItem, AccordionTrigger, AccordionContent, Skeleton
  const [accordionData, setAccordionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simular busca de dados na montagem do componente
  useEffect(() => {
    console.log("Iniciando busca simulada de dados para Accordion...");
    setIsLoading(true);
    const timer = setTimeout(() => {
      const fetchedData = [
        { id: 'item-1', title: 'Seção 1: Introdução', content: 'Conteúdo detalhado da primeira seção do accordion.' },
        { id: 'item-2', title: 'Seção 2: Configuração', content: 'Passos para configurar o sistema A, B e C.' },
        { id: 'item-3', title: 'Seção 3: Tópicos Avançados', content: 'Exploração de recursos avançados e dicas de otimização.' },
      ];
      setAccordionData(fetchedData);
      setIsLoading(false);
      console.log("Dados do Accordion carregados.");
    }, 2000); // Simula 2 segundos de delay

    // Função de limpeza para o useEffect
    return () => clearTimeout(timer);
  }, []); // Array de dependências vazio para rodar apenas uma vez

  return (
    <div className="w-full max-w-md p-4 border rounded-lg bg-white">
      <h2 className="text-xl font-semibold mb-4">Conteúdo Carregado</h2>
      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-8 w-5/6" />
          <Skeleton className="h-10 w-full mt-4" />
          <Skeleton className="h-8 w-4/6" />
           <Skeleton className="h-10 w-full mt-4" />
          <Skeleton className="h-8 w-5/6" />
        </div>
      ) : (
         accordionData.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {accordionData.map((item) => (
                <AccordionItem value={item.id} key={item.id}>
                  <AccordionTrigger>{item.title}</AccordionTrigger>
                  <AccordionContent>{item.content}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
         ) : (
            <p className="text-muted-foreground">Nenhum dado encontrado.</p>
         )
      )}
    </div>
  );
}`);

//=============================================================================
// EXEMPLOS SHADCN UI
//=============================================================================

// Shadcn Tabs
export const shadcnTabsExample = escapeBackticks(`const Component = () => {
  return (
    <div className="p-4 bg-white text-black">
      <h2 className="text-2xl font-bold mb-4">Shadcn Tabs</h2>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="analytics">Analíticos</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="p-4 border rounded-md mt-2">
          <h3 className="text-lg font-medium">Visão Geral</h3>
          <p className="text-sm text-gray-500 mt-2">
            Esta é a página de visão geral do seu dashboard. Aqui você pode ver um resumo de todas as suas atividades.
          </p>
        </TabsContent>
        <TabsContent value="analytics" className="p-4 border rounded-md mt-2">
          <h3 className="text-lg font-medium">Analíticos</h3>
          <p className="text-sm text-gray-500 mt-2">
            Visualize estatísticas detalhadas e gráficos sobre o desempenho do seu sistema.
          </p>
        </TabsContent>
        <TabsContent value="reports" className="p-4 border rounded-md mt-2">
          <h3 className="text-lg font-medium">Relatórios</h3>
          <p className="text-sm text-gray-500 mt-2">
            Gere e baixe relatórios personalizados para análise detalhada.
          </p>
        </TabsContent>
        <TabsContent value="notifications" className="p-4 border rounded-md mt-2">
          <h3 className="text-lg font-medium">Notificações</h3>
          <p className="text-sm text-gray-500 mt-2">
            Configure suas preferências de notificação e veja mensagens recentes.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}`);

// Shadcn Accordion
export const shadcnAccordionExample = escapeBackticks(`const Component = () => {
  return (
    <div className="p-4 bg-white text-black">
      <h2 className="text-2xl font-bold mb-4">Shadcn Accordion</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>O que é o Shadcn UI?</AccordionTrigger>
          <AccordionContent>
            Shadcn UI é uma coleção de componentes reutilizáveis construídos com Radix UI e Tailwind CSS.
            Não é uma biblioteca de componentes, mas sim um conjunto de componentes que você pode copiar e colar
            em seus projetos e personalizar conforme necessário.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Como instalar os componentes?</AccordionTrigger>
          <AccordionContent>
            Você pode instalar os componentes individualmente usando o CLI do Shadcn UI com o comando
            <code className="bg-gray-100 p-1 rounded mx-1">npx shadcn-ui@latest add button</code>
            para adicionar o componente de botão, por exemplo.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Posso personalizar os componentes?</AccordionTrigger>
          <AccordionContent>
            Sim! Uma das principais vantagens do Shadcn UI é que você tem total controle sobre o código.
            Os componentes são instalados diretamente no seu projeto, então você pode modificá-los como quiser.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}`);

// Shadcn Dialog
export const shadcnDialogExample = escapeBackticks(`const Component = () => {
  return (
    <div className="p-4 bg-white text-black">
      <h2 className="text-2xl font-bold mb-4">Shadcn Dialog</h2>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Abrir Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Perfil</DialogTitle>
            <DialogDescription>
              Faça alterações no seu perfil aqui. Clique em salvar quando terminar.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input id="name" defaultValue="Pedro Silva" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" defaultValue="@pedrosilva" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Salvar alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}`);

// Shadcn Dropdown
export const shadcnDropdownExample = escapeBackticks(`const Component = () => {
  return (
    <div className="p-4 bg-white text-black">
      <h2 className="text-2xl font-bold mb-4">Shadcn Dropdown Menu</h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Abrir Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Perfil
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Faturamento
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Configurações
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Atalhos de teclado
              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Equipe
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Convidar usuários</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Email</DropdownMenuItem>
                  <DropdownMenuItem>Mensagem</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Mais...</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Sair
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}`);

// Shadcn Form
export const shadcnFormExample = escapeBackticks(`const Component = () => {
  return (
    <div className="p-6 max-w-md mx-auto bg-white text-black">
      <h2 className="text-2xl font-bold mb-6">Formulário de Contato</h2>
      <Card>
        <CardHeader>
          <CardTitle>Envie sua mensagem</CardTitle>
          <CardDescription>Preencha o formulário abaixo para entrar em contato conosco.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" placeholder="Seu nome completo" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="seu@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Mensagem</Label>
              <Textarea id="message" placeholder="Digite sua mensagem aqui..." className="min-h-[120px]" />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm">Concordo com os termos e condições</Label>
            </div>
            <Button type="submit" className="w-full">Enviar Mensagem</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}`);

//=============================================================================
// EXEMPLOS DE TESTE TAILWIND
//=============================================================================

// Teste Tailwind
export const tailwindTestExample = escapeBackticks(`const Component = () => {
  return (
    <div className="p-4 bg-white text-black">
      <h2 className="text-2xl font-bold mb-4">Teste de Classes Tailwind</h2>
      <div className="grid gap-4">
        <div className="p-4 bg-blue-100 text-blue-800 rounded">
          Classe de cor padrão: bg-blue-100
        </div>
        <div className="p-4 bg-[#f0f4ff] text-[#1e40af] rounded">
          Cor arbitrária: bg-[#f0f4ff]
        </div>
        <div className="p-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded">
          Gradiente: bg-gradient-to-r from-cyan-500 to-blue-500
        </div>
        <div className="p-4 bg-white border border-gray-200 rounded shadow-md">
          Sombra: shadow-md
        </div>
      </div>
    </div>
  );
}`);

// Espaçamento Tailwind
export const tailwindSpacingExample = escapeBackticks(`const Component = () => {
  return (
    <div className="p-4 bg-white text-black">
      <h2 className="text-2xl font-bold mb-4">Espaçamento Tailwind</h2>
      <div className="space-y-8">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Padding (p-*):</h3>
          <div className="flex flex-wrap gap-4">
            <div className="p-0 bg-blue-100 border border-blue-300">p-0</div>
            <div className="p-1 bg-blue-100 border border-blue-300">p-1</div>
            <div className="p-2 bg-blue-100 border border-blue-300">p-2</div>
            <div className="p-4 bg-blue-100 border border-blue-300">p-4</div>
            <div className="p-8 bg-blue-100 border border-blue-300">p-8</div>
            <div className="p-[32px] bg-blue-100 border border-blue-300">p-[32px]</div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Margin (m-*):</h3>
          <div className="flex flex-wrap gap-4 bg-gray-100 p-4">
            <div className="m-0 bg-green-100 border border-green-300">m-0</div>
            <div className="m-1 bg-green-100 border border-green-300">m-1</div>
            <div className="m-2 bg-green-100 border border-green-300">m-2</div>
            <div className="m-4 bg-green-100 border border-green-300">m-4</div>
            <div className="m-[16px] bg-green-100 border border-green-300">m-[16px]</div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Gap (gap-*):</h3>
          <div className="grid grid-cols-3 gap-2 bg-gray-100 p-4">
            <div className="p-4 bg-purple-100 border border-purple-300">Item 1</div>
            <div className="p-4 bg-purple-100 border border-purple-300">Item 2</div>
            <div className="p-4 bg-purple-100 border border-purple-300">Item 3</div>
            <div className="p-4 bg-purple-100 border border-purple-300">Item 4</div>
            <div className="p-4 bg-purple-100 border border-purple-300">Item 5</div>
            <div className="p-4 bg-purple-100 border border-purple-300">Item 6</div>
          </div>
        </div>
      </div>
    </div>
  );
}`);

// Grid Tailwind
export const tailwindGridExample = escapeBackticks(`const Component = () => {
  return (
    <div className="p-4 bg-white text-black">
      <h2 className="text-2xl font-bold mb-4">Grid Tailwind</h2>
      <div className="space-y-8">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Grid Básico (grid-cols-*):</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-blue-100 border border-blue-300 rounded">1</div>
            <div className="p-4 bg-blue-100 border border-blue-300 rounded">2</div>
            <div className="p-4 bg-blue-100 border border-blue-300 rounded">3</div>
            <div className="p-4 bg-blue-100 border border-blue-300 rounded">4</div>
            <div className="p-4 bg-blue-100 border border-blue-300 rounded">5</div>
            <div className="p-4 bg-blue-100 border border-blue-300 rounded">6</div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Grid Responsivo:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-green-100 border border-green-300 rounded">Responsivo 1</div>
            <div className="p-4 bg-green-100 border border-green-300 rounded">Responsivo 2</div>
            <div className="p-4 bg-green-100 border border-green-300 rounded">Responsivo 3</div>
            <div className="p-4 bg-green-100 border border-green-300 rounded">Responsivo 4</div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Grid com Colunas Personalizadas:</h3>
          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-2 p-4 bg-purple-100 border border-purple-300 rounded">Span 2</div>
            <div className="col-span-4 p-4 bg-purple-100 border border-purple-300 rounded">Span 4</div>
            <div className="col-span-3 p-4 bg-purple-100 border border-purple-300 rounded">Span 3</div>
            <div className="col-span-3 p-4 bg-purple-100 border border-purple-300 rounded">Span 3</div>
            <div className="col-span-6 p-4 bg-purple-100 border border-purple-300 rounded">Span 6 (Full)</div>
          </div>
        </div>
      </div>
    </div>
  );
}`);

// Flex Tailwind
export const tailwindFlexExample = escapeBackticks(`const Component = () => {
  return (
    <div className="p-4 bg-white text-black">
      <h2 className="text-2xl font-bold mb-4">Flex Tailwind</h2>
      <div className="space-y-8">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Flex Row:</h3>
          <div className="flex gap-4">
            <div className="p-4 bg-blue-100 border border-blue-300 rounded">Item 1</div>
            <div className="p-4 bg-blue-100 border border-blue-300 rounded">Item 2</div>
            <div className="p-4 bg-blue-100 border border-blue-300 rounded">Item 3</div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Flex Column:</h3>
          <div className="flex flex-col gap-4">
            <div className="p-4 bg-green-100 border border-green-300 rounded">Item 1</div>
            <div className="p-4 bg-green-100 border border-green-300 rounded">Item 2</div>
            <div className="p-4 bg-green-100 border border-green-300 rounded">Item 3</div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Justify Content:</h3>
          <div className="flex justify-between p-4 bg-gray-100 rounded">
            <div className="p-4 bg-purple-100 border border-purple-300 rounded">Start</div>
            <div className="p-4 bg-purple-100 border border-purple-300 rounded">Center</div>
            <div className="p-4 bg-purple-100 border border-purple-300 rounded">End</div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Align Items:</h3>
          <div className="flex items-center h-32 p-4 bg-gray-100 rounded">
            <div className="p-4 h-16 bg-yellow-100 border border-yellow-300 rounded">Centered</div>
            <div className="p-4 h-24 bg-yellow-100 border border-yellow-300 rounded">Vertically</div>
            <div className="p-4 h-8 bg-yellow-100 border border-yellow-300 rounded">Aligned</div>
          </div>
        </div>
      </div>
    </div>
  );
}`);

// Valores Arbitrários Tailwind
export const tailwindArbitraryExample = escapeBackticks(`const Component = () => {
  return (
    <div className="p-4 bg-white text-black">
      <h2 className="text-2xl font-bold mb-4">Valores Arbitrários Tailwind</h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Cores Arbitrárias:</h3>
          <div className="flex gap-4">
            <div className="p-4 bg-[#ff5733] text-white rounded">bg-[#ff5733]</div>
            <div className="p-4 bg-[rgb(100,200,150)] text-white rounded">bg-[rgb(100,200,150)]</div>
            <div className="p-4 bg-[hsl(200,80%,50%)] text-white rounded">bg-[hsl(200,80%,50%)]</div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Tamanhos Arbitrários:</h3>
          <div className="flex items-end gap-4">
            <div className="h-[50px] w-[50px] bg-blue-300 flex items-center justify-center">50px</div>
            <div className="h-[75px] w-[75px] bg-blue-400 flex items-center justify-center">75px</div>
            <div className="h-[100px] w-[100px] bg-blue-500 flex items-center justify-center text-white">100px</div>
            <div className="h-[10vh] w-[10vh] bg-blue-600 flex items-center justify-center text-white">10vh</div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Textos Arbitrários:</h3>
          <div className="space-y-2">
            <p className="text-[12px]">Texto com 12px</p>
            <p className="text-[16px]">Texto com 16px</p>
            <p className="text-[24px]">Texto com 24px</p>
            <p className="text-[2.5rem]">Texto com 2.5rem</p>
            <p className="text-[#ff0000]">Texto vermelho</p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Espaçamentos Arbitrários:</h3>
          <div className="flex gap-4">
            <div className="p-[8px] bg-green-100 border border-green-300">p-[8px]</div>
            <div className="p-[16px] bg-green-100 border border-green-300">p-[16px]</div>
            <div className="p-[32px] bg-green-100 border border-green-300">p-[32px]</div>
            <div className="m-[20px] p-2 bg-green-100 border border-green-300">m-[20px]</div>
          </div>
        </div>
      </div>
    </div>
  );
}`);

// Exportar todos os exemplos em um único objeto
export const codeExamples = {
  // Exemplos Básicos
  button: buttonExample,
  buttonGroup: buttonGroupExample,
  toggle: toggleExample,
  counter: counterExample,

  // Exemplos de Layout
  card: cardExample,
  cardList: cardListExample,
  tabs: tabsExample,
  accordion: accordionExample,
  dashboard: dashboardExample,

  // Exemplos Interativos
  form: formExample,
  loginForm: loginFormExample,
  tooltip: tooltipExample,
  darkMode: darkModeExample,
  notification: notificationExample,

  // Exemplos Avançados
  complexForm: complexFormExample,
  userTable: userTableExample,
  loadingAccordion: loadingAccordionExample,

  // Exemplos Shadcn UI
  shadcnTabs: shadcnTabsExample,
  shadcnAccordion: shadcnAccordionExample,
  shadcnDialog: shadcnDialogExample,
  shadcnDropdown: shadcnDropdownExample,
  shadcnForm: shadcnFormExample,

  // Exemplos de Teste Tailwind
  tailwindTest: tailwindTestExample,
  tailwindSpacing: tailwindSpacingExample,
  tailwindGrid: tailwindGridExample,
  tailwindFlex: tailwindFlexExample,
  tailwindArbitrary: tailwindArbitraryExample,
};

export default codeExamples;
