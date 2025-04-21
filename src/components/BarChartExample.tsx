// Não precisamos importar React explicitamente com o JSX Transform
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// Componentes do Shadcn UI
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from '@/components/ui/chart';
// Componentes do Recharts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

export const BarChartExample = () => {
  // Dados de exemplo para o gráfico de barras
  const chartData = [
    { name: 'Jan', uv: 400, pv: 240 },
    { name: 'Fev', uv: 300, pv: 139 },
    { name: 'Mar', uv: 200, pv: 980 },
    { name: 'Abr', uv: 278, pv: 390 },
    { name: 'Mai', uv: 189, pv: 480 },
    { name: 'Jun', uv: 239, pv: 380 },
    { name: 'Jul', uv: 349, pv: 430 },
  ];

  // Configuração do gráfico para o ChartContainer
  const chartConfig = {
    pv: {
      label: "PV",
      color: "#8884d8"
    },
    uv: {
      label: "UV",
      color: "#82ca9d"
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Vendas Mensais (Exemplo)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer config={chartConfig}>
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <ChartTooltip
                cursor={{ fill: 'rgba(200, 200, 200, 0.2)' }}
                content={<ChartTooltipContent />}
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="pv" fill="var(--color-pv)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="uv" fill="var(--color-uv)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarChartExample;
