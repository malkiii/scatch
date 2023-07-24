import React from 'react';
import { CategoryScale, ChartData } from 'chart.js';
import Chart from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';

Chart.register(CategoryScale);

const chartOptions = {
  color: '#fff',
  scales: {
    y: {
      ticks: { color: '#fff' },
      grid: { color: '#fff2' }
    },
    x: {
      ticks: { color: '#fff' },
      grid: { color: '#fff2' }
    }
  }
};

type ActivityChartProps = {
  type: 'bar' | 'line';
  data: ChartData<ActivityChartProps['type'], (number | [number, number] | null)[], unknown>;
};
const ActivityChart: React.FC<ActivityChartProps> = ({ data, type }) => {
  switch (type) {
    case 'bar':
      return <Bar data={data as any} options={chartOptions} />;
    case 'line':
      return <Line data={data as any} options={chartOptions} />;
  }
};

export default ActivityChart;
