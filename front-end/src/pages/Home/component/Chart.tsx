import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import { formattedCurrency } from "@/utils/helpers";
import { Bar } from "react-chartjs-2";

type ChartProps = {
  data: ProgressFullYearType[];
};

const Chart: React.FC<ChartProps> = ({ data }) => {
  const dataSource = {
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: "Count",
        data: data.map((item) => item.count),
        borderColor: "#65451F",
        backgroundColor: "#FFDDCC",
      },
      {
        label: "Costs",
        data: data.map((item) => item.costs),
        borderColor: "#65451F",
        backgroundColor: "#FFCCCC",
      },
    ],
  };

  const options = {
    indexAxis: "x" as const,
    elements: {
      bar: {
        borderWidth: 1,
        borderRadius: 3,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Count Progress Per Year",
        font: {
          size: 30,
        },
      },
      tooltip: {
        callbacks: {
          footer: (value: any) => {
            return JSON.stringify(
              data[value[0].dataIndex].progress.map((item) => ({
                name: item.name,
                progress: item.progress,
                costs: formattedCurrency(item.costs),
              }))
            );
          },
        },
      },
    },
  };

  return <Bar options={options} data={dataSource} />;
};

export default Chart;
