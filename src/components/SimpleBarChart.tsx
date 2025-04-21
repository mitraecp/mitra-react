import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import {
  // Componentes do Shadcn UI
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,

  // Componentes do Recharts
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from '@/components/ui/chart';

export const SimpleBarChart = () => {
  // Dados para o gráfico de barras
  const barChartData = [
    { month: "Jan", sales: 186 },
    { month: "Fev", sales: 305 },
    { month: "Mar", sales: 237 },
    { month: "Abr", sales: 273 },
    { month: "Mai", sales: 209 },
    { month: "Jun", sales: 214 },
    { month: "Jul", sales: 250 },
    { month: "Ago", sales: 190 },
    { month: "Set", sales: 280 },
    { month: "Out", sales: 310 },
    { month: "Nov", sales: 240 },
    { month: "Dez", sales: 330 },
  ];

  // Configuração do gráfico (cores, rótulos)
  const chartConfig = {
    sales: {
      label: "Vendas",
      color: "#4f46e5" // Cor indigo-600
    },
  };

  return (
    <div className="p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Vendas Mensais 2024</CardTitle>
          <CardDescription>Um resumo das vendas registradas a cada mês.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <BarChart
              data={barChartData}
              margin={{ top: 20, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={12}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={12}
                tickFormatter={(value) => `R$ ${value}`}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" hideLabel />}
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="sales"
                fill="var(--color-sales)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="text-muted-foreground">
            Dados atualizados em Julho de 2024.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SimpleBarChart;
