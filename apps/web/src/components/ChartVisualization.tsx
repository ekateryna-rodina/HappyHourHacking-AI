'use client';

import { VisualizationData } from '@bank-app/shared';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface ChartVisualizationProps {
  data: VisualizationData;
}

export default function ChartVisualization({ data }: ChartVisualizationProps) {
  const chartData = data.data.map((item) => ({
    name: item.label,
    value: item.value,
    ...item.metadata,
  }));

  const renderChart = () => {
    switch (data.type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              {data.config?.showLegend && <Legend />}
              <Bar dataKey="value" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              {data.config?.showLegend && <Legend />}
              <Line type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={data.data[index].color || '#0ea5e9'} />
                ))}
              </Pie>
              <Tooltip />
              {data.config?.showLegend && <Legend />}
            </PieChart>
          </ResponsiveContainer>
        );

      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              {data.config?.showLegend && <Legend />}
              <Area type="monotone" dataKey="value" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="card bg-white">
      <h3 className="text-lg font-semibold mb-4">{data.title}</h3>
      {renderChart()}
    </div>
  );
}
