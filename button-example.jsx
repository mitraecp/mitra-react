const Component = () => {
  const [count, setCount] = React.useState(0);
  
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Botão com Contador</h2>
      <Button 
        onClick={() => setCount(prev => prev + 1)}
      >
        Cliques: {count}
      </Button>
    </div>
  );
};
