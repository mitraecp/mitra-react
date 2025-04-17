"use client"

import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart, 
  CartesianGrid, 
  // ResponsiveContainer, 
  // Tooltip, 
  XAxis, 
  YAxis 
} from "recharts"

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"

import { 
  ChartConfig, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart"

// Dados para o gráfico de barras
const barChartData = [
  { month: "Janeiro", desktop: 186, mobile: 80 },
  { month: "Fevereiro", desktop: 305, mobile: 200 },
  { month: "Março", desktop: 237, mobile: 120 },
  { month: "Abril", desktop: 73, mobile: 190 },
  { month: "Maio", desktop: 209, mobile: 130 },
  { month: "Junho", desktop: 214, mobile: 140 },
]

// Dados para o gráfico de área
const areaChartData = [
  { date: "01/06", vendas: 1200, custos: 800 },
  { date: "02/06", vendas: 1400, custos: 850 },
  { date: "03/06", vendas: 1300, custos: 900 },
  { date: "04/06", vendas: 1700, custos: 950 },
  { date: "05/06", vendas: 1600, custos: 870 },
  { date: "06/06", vendas: 1800, custos: 920 },
  { date: "07/06", vendas: 2000, custos: 1000 },
]

// Configuração para o gráfico de barras
const barChartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

// Configuração para o gráfico de área
const areaChartConfig = {
  vendas: {
    label: "Vendas",
    color: "hsl(var(--chart-3))",
  },
  custos: {
    label: "Custos",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function Dashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      {/* Gráfico de Barras */}
      <Card>
        <CardHeader>
          <CardTitle>Usuários por Dispositivo</CardTitle>
          <CardDescription>
            Número de usuários desktop e mobile nos últimos 6 meses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={barChartConfig} className="h-[300px] w-full">
            <BarChart accessibilityLayer data={barChartData}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                tickLine={false} 
                tickMargin={10} 
                axisLine={false}
              />
              <YAxis tickLine={false} tickMargin={10} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Área */}
      <Card>
        <CardHeader>
          <CardTitle>Vendas vs Custos</CardTitle>
          <CardDescription>
            Comparação entre vendas e custos na última semana
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={areaChartConfig} className="h-[300px] w-full">
            <AreaChart accessibilityLayer data={areaChartData}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickLine={false} 
                tickMargin={10} 
                axisLine={false}
              />
              <YAxis tickLine={false} tickMargin={10} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Area 
                type="monotone" 
                dataKey="vendas" 
                fill="var(--color-vendas)" 
                stroke="var(--color-vendas)" 
                fillOpacity={0.2} 
              />
              <Area 
                type="monotone" 
                dataKey="custos" 
                fill="var(--color-custos)" 
                stroke="var(--color-custos)" 
                fillOpacity={0.2} 
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
