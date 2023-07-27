import React from 'react';
import { CategoryScale, ChartData } from 'chart.js';
import Chart from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';

Chart.register(CategoryScale);

function getChartOptions(theme?: string) {
  const textColor = theme === 'light' ? '#000' : '#fff';
  const axisScales =
    theme === 'light'
      ? {
          ticks: { color: textColor },
          grid: { color: '#0002' }
        }
      : {
          ticks: { color: textColor },
          grid: { color: '#fff2' }
        };

  return {
    color: textColor,
    scales: { y: axisScales, x: axisScales }
  };
}

type ActivityChartProps = {
  type: 'bar' | 'line';
  theme?: string;
  data: ChartData<ActivityChartProps['type'], (number | [number, number] | null)[], unknown>;
};
const ActivityChart: React.FC<ActivityChartProps> = ({ type, theme, data }) => {
  switch (type) {
    case 'bar':
      return <Bar data={data as any} options={getChartOptions(theme)} />;
    case 'line':
      return <Line data={data as any} options={getChartOptions(theme)} />;
  }
};

export default ActivityChart;
