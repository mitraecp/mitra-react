/**
 * Exemplos de código para o DynamicRenderer
 * Armazenados como strings simples para evitar problemas de lint
 */

// EXEMPLOS BÁSICOS
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

export const buttonGroupExample = `function Component() {
  return (
    <div className="p-4 bg-white text-black">
      <h2 className="text-2xl font-bold mb-4">Grupo de Botões</h2>
      <div className="flex space-x-2">
        <Button variant="default">Padrão</Button>
        <Button variant="destructive">Destrutivo</Button>
        <Button variant="outline">Contorno</Button>
        <Button variant="secondary">Secundário</Button>
        <Button variant="ghost">Fantasma</Button>
        <Button variant="link">Link</Button>
      </div>
    </div>
  );
}`;

export const toggleExample = `const Component = () => {
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
}`;

export const counterExample = `const Component = () => {
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
}`;

// EXEMPLOS DE LAYOUT
export const cardExample = `const Component = () => {
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
}`;

export const cardListExample = `const Component = () => {
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
}`;

export const tabsExample = `const Component = () => {
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
          <p className="text-sm text-gray-500 mt-2">
            Gerencie as configurações da sua conta e preferências.
          </p>
        </TabsContent>
        <TabsContent value="password" className="p-4 border rounded-md mt-2">
          <h3 className="text-lg font-medium">Alterar Senha</h3>
          <p className="text-sm text-gray-500 mt-2">
            Atualize sua senha para manter sua conta segura.
          </p>
        </TabsContent>
        <TabsContent value="settings" className="p-4 border rounded-md mt-2">
          <h3 className="text-lg font-medium">Preferências</h3>
          <p className="text-sm text-gray-500 mt-2">
            Personalize a aparência e funcionalidades do sistema.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}`;

export const accordionExample = `const Component = () => {
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
}`;

export const dashboardExample = `const Component = () => {
  return (
    <div className="space-y-4 bg-white p-4">
      <h2 className="text-2xl font-bold">Dashboard Dinâmico</h2>
      <Dashboard />
    </div>
  );
}`;

// EXEMPLOS INTERATIVOS
export const formExample = `const Component = () => {
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
}`;

export const loginFormExample = `const Component = () => {
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
      alert("Login simulado com: " + email);
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
}`;

// EXEMPLOS AVANÇADOS
export const complexFormExample = `const Component = () => {
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
              <Input id="name" value={formData.name} onChange={handleChange} placeholder="Seu Nome Completo" className={"pl-10 " + (errors.name ? 'border-red-500' : '')} />
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
               <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="seu@email.com" className={"pl-10 " + (errors.email ? 'border-red-500' : '')} />
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
                <SelectTrigger className={"pl-10 " + (errors.category ? 'border-red-500' : '')}>
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
            <Label htmlFor="agreedToTerms" className={"text-sm " + (errors.agreedToTerms ? 'text-red-600' : '')}>
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
}`;

export const userTableExample = `const Component = () => {
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
    alert("Usuário " + userId + " removido (simulado)!");
  };

  const handleEdit = (userId) => {
    alert("Editar usuário " + userId + " (não implementado)");
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
}`;

export const loadingAccordionExample = `const Component = () => {
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
}`;

// EXEMPLOS TAILWIND
export const tailwindTestExample = `const Component = () => {
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
}`;

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
  
  // Exemplos Avançados
  complexForm: complexFormExample,
  userTable: userTableExample,
  loadingAccordion: loadingAccordionExample,
  
  // Exemplos Tailwind
  tailwindTest: tailwindTestExample,
};

export default codeExamples;
