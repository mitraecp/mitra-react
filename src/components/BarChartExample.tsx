// Não precisamos importar React explicitamente com o JSX Transform
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend as RechartsLegend,
  Tooltip as RechartsTooltip
} from '@/components/ui/recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Vendas Mensais (Exemplo)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <RechartsTooltip
                cursor={{ fill: 'rgba(200, 200, 200, 0.2)' }}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <RechartsLegend wrapperStyle={{ fontSize: '14px' }} />
              <Bar dataKey="pv" name="PV" fill="#8884d8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="uv" name="UV" fill="#82ca9d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarChartExample;
