import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(BarElement, CategoryScale, LinearScale);

const options = {
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      backgroundColor(context) {
        return context.dataset.backgroundColor;
      },
      borderColor: 'white',
      borderRadius: 25,
      borderWidth: 1,
      color: 'white',
      font: {
        weight: 'bold',
      },
      padding(context) {
        const { data } = context.dataset;
        const value = data[context.dataIndex];
        const newPadding = {};
        if (value < 10) {
          newPadding.top = 7;
          newPadding.bottom = 7;
          newPadding.left = 11;
          newPadding.right = 11;
        } else if (value < 100) {
          newPadding.top = 8;
          newPadding.bottom = 8;
          newPadding.left = 8;
          newPadding.right = 8;
        } else {
          newPadding.top = 10;
          newPadding.bottom = 10;
          newPadding.left = 8;
          newPadding.right = 8;
        }
        return newPadding;
      },
    },
  },

  // Core options
  layout: {
    padding: 16,
  },
  responsive: true,
  // maintainAspectRatio: true,
  scales: {
    y: {
      beginAtZero: true,
      display: false,
    },
    x: {
      display: false,
    },
  },
};

const data = {
  labels: ['PP', 'PR', 'SE', 'HS'],
  datasets: [
    {
      datalabels: {
        anchor: 'end',
        // rotation: 90,
        color: '#FFFFFF',
      },
      data: [40, 30, 15, 19],
      borderRadius: 10,
      borderSkipped: false,
      barThickness: 15,
      barPercentage: 0.8,
      // minBarLength: 50,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        // 'rgb(255, 206, 86)',
        'rgb(75, 192, 192)',
        'rgb(153, 102, 255)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        // 'rgb(255, 206, 86)',
        'rgb(75, 192, 192)',
        'rgb(153, 102, 255)',
      ],
      borderWidth: 1,
    },
  ],
};

function BarChart() {
  return <Bar data={data} options={options} plugins={[ChartDataLabels]} />;
}

export default BarChart;
