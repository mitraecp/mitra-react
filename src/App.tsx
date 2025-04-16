import { Dashboard } from "@/components/Dashboard";
import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="container mx-auto py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Visualização de dados com gráficos de barras e área</p>
      </header>

      <Dashboard />

      <div className="mt-8 flex justify-end">
        <Button>Atualizar Dados</Button>
      </div>
    </div>
  );
}

export default App;
