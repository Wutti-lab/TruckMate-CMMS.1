import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Treemap,
  ScatterChart,
  Scatter,
  FunnelChart,
  Funnel,
  LabelList
} from "recharts";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";
import { 
  Activity,
  Target,
  Layers,
  Zap as ScatterIcon,
  Filter
} from "lucide-react";

interface ChartProps {
  data?: any[];
  title: string;
  description?: string;
}

const COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff7300', 
  '#0088fe', '#00c49f', '#ffbb28', '#ff8042'
];

export function AdvancedCharts() {
  const { language } = useLanguage();
  const [chartType, setChartType] = useState("composed");

  // Sample data for different chart types
  const composedData = [
    { name: 'Jan', inspections: 24, costs: 2400, efficiency: 78 },
    { name: 'Feb', inspections: 32, costs: 1800, efficiency: 82 },
    { name: 'Mar', inspections: 18, costs: 3200, efficiency: 65 },
    { name: 'Apr', inspections: 28, costs: 2100, efficiency: 85 },
    { name: 'May', inspections: 35, costs: 1600, efficiency: 88 },
    { name: 'Jun', inspections: 42, costs: 1400, efficiency: 92 }
  ];

  const radarData = [
    {
      subject: extractLanguageText('Safety | Sicherheit', language),
      A: 120,
      B: 110,
      fullMark: 150
    },
    {
      subject: extractLanguageText('Efficiency | Effizienz', language),
      A: 98,
      B: 130,
      fullMark: 150
    },
    {
      subject: extractLanguageText('Cost | Kosten', language),
      A: 86,
      B: 130,
      fullMark: 150
    },
    {
      subject: extractLanguageText('Maintenance | Wartung', language),
      A: 99,
      B: 100,
      fullMark: 150
    },
    {
      subject: extractLanguageText('Performance | Leistung', language),
      A: 85,
      B: 90,
      fullMark: 150
    },
    {
      subject: extractLanguageText('Quality | Qualität', language),
      A: 65,
      B: 85,
      fullMark: 150
    }
  ];

  const treemapData = [
    {
      name: extractLanguageText('Truck Fleet | LKW-Flotte', language),
      size: 300,
      children: [
        { name: 'Mercedes', size: 120 },
        { name: 'Volvo', size: 80 },
        { name: 'Scania', size: 100 }
      ]
    },
    {
      name: extractLanguageText('Van Fleet | Transporter-Flotte', language),
      size: 200,
      children: [
        { name: 'Ford', size: 90 },
        { name: 'Volkswagen', size: 110 }
      ]
    }
  ];

  const scatterData = [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 }
  ];

  const funnelData = [
    {
      value: 100,
      name: extractLanguageText('Total Vehicles | Fahrzeuge Gesamt', language),
      fill: '#8884d8'
    },
    {
      value: 80,
      name: extractLanguageText('Inspected | Inspiziert', language),
      fill: '#83a6ed'
    },
    {
      value: 65,
      name: extractLanguageText('Passed | Bestanden', language),
      fill: '#8dd1e1'
    },
    {
      value: 50,
      name: extractLanguageText('Certified | Zertifiziert', language),
      fill: '#82ca9d'
    }
  ];

  const ComposedChartComponent = () => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            {extractLanguageText("Performance Overview | Leistungsübersicht", language)}
          </CardTitle>
          <Badge variant="outline">
            {extractLanguageText("Multi-metric | Multi-Metrik", language)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={composedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar 
              yAxisId="left" 
              dataKey="inspections" 
              fill="#8884d8" 
              name={extractLanguageText("Inspections | Inspektionen", language)}
            />
            <Bar 
              yAxisId="right" 
              dataKey="costs" 
              fill="#82ca9d" 
              name={extractLanguageText("Costs | Kosten", language)}
            />
            <Line 
              yAxisId="left" 
              type="monotone" 
              dataKey="efficiency" 
              stroke="#ff7300" 
              strokeWidth={3}
              name={extractLanguageText("Efficiency % | Effizienz %", language)}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  const RadarChartComponent = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          {extractLanguageText("Fleet Performance Radar | Flottenleistungs-Radar", language)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 150]} />
            <Radar
              name={extractLanguageText("Current | Aktuell", language)}
              dataKey="A"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.3}
            />
            <Radar
              name={extractLanguageText("Target | Ziel", language)}
              dataKey="B"
              stroke="#82ca9d"
              fill="#82ca9d"
              fillOpacity={0.3}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  const TreemapComponent = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layers className="h-5 w-5" />
          {extractLanguageText("Fleet Composition | Flottenzusammensetzung", language)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <Treemap
            data={treemapData}
            dataKey="size"
            aspectRatio={4 / 3}
            stroke="#fff"
            fill="#8884d8"
          />
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  const ScatterChartComponent = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ScatterIcon className="h-5 w-5" />
          {extractLanguageText("Cost vs Performance | Kosten vs. Leistung", language)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart data={scatterData}>
            <CartesianGrid />
            <XAxis 
              type="number" 
              dataKey="x" 
              name={extractLanguageText("Cost | Kosten", language)} 
              unit="€"
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              name={extractLanguageText("Performance | Leistung", language)} 
              unit="%"
            />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Vehicles" dataKey="z" fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  const FunnelChartComponent = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          {extractLanguageText("Inspection Funnel | Inspektions-Trichter", language)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <FunnelChart>
            <Tooltip />
            <Funnel
              dataKey="value"
              data={funnelData}
              isAnimationActive
            >
              <LabelList position="center" fill="#fff" stroke="none" />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  const renderChart = () => {
    switch (chartType) {
      case "composed":
        return <ComposedChartComponent />;
      case "radar":
        return <RadarChartComponent />;
      case "treemap":
        return <TreemapComponent />;
      case "scatter":
        return <ScatterChartComponent />;
      case "funnel":
        return <FunnelChartComponent />;
      default:
        return <ComposedChartComponent />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Chart Type Selector */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            {extractLanguageText("Advanced Analytics | Erweiterte Analysen", language)}
          </h3>
          <p className="text-sm text-muted-foreground">
            {extractLanguageText("Interactive charts and visualizations | Interaktive Diagramme und Visualisierungen", language)}
          </p>
        </div>
        <Select value={chartType} onValueChange={setChartType}>
          <SelectTrigger className="w-64">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="composed">
              {extractLanguageText("Multi-Metric Chart | Multi-Metrik-Diagramm", language)}
            </SelectItem>
            <SelectItem value="radar">
              {extractLanguageText("Performance Radar | Leistungs-Radar", language)}
            </SelectItem>
            <SelectItem value="treemap">
              {extractLanguageText("Fleet Composition | Flottenzusammensetzung", language)}
            </SelectItem>
            <SelectItem value="scatter">
              {extractLanguageText("Scatter Analysis | Streuungsanalyse", language)}
            </SelectItem>
            <SelectItem value="funnel">
              {extractLanguageText("Process Funnel | Prozess-Trichter", language)}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Selected Chart */}
      {renderChart()}

      {/* Chart Grid for Multiple Views */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RadarChartComponent />
        <FunnelChartComponent />
      </div>
    </div>
  );
}