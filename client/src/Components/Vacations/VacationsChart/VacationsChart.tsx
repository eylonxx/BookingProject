import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import VacationModel from '../../../Models/vacationModel';
import './VacationsChart.css';
interface VacationChartProps {
  vacations: VacationModel[];
}
export default function VacationsChart(props: VacationChartProps) {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  const vacations = props.vacations;

  const chartProps: { labels: string[]; values: number[] } = vacations.reduce(
    (prev, curr) => {
      if (curr.followers > 0) {
        return {
          labels: [...prev.labels, `${curr.destination} #${curr.id}`],
          values: [...prev.values, curr.followers],
        };
      }
      return prev;
    },
    {
      labels: [],
      values: [],
    }
  );

  const options = {
    responsive: true,
    scales: {
      y: {
        ticks: { color: 'white', beginAtZero: true, precision: 0 },
        stepSize: 1,
      },
      x: {
        ticks: { color: 'white', beginAtZero: true },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
        position: 'top' as const,
      },
      title: {
        color: 'white',
        display: true,
        text: 'Vacations Chart',
      },
    },
  };

  const data = {
    labels: chartProps.labels,
    datasets: [
      {
        label: 'Followers',
        data: chartProps.values,
        color: 'white',
        //   values
        backgroundColor: 'rgba(250,250,250,0.5)',
      },
    ],
  };

  return (
    <div className="VacationsChart">
      <Bar options={options} width={960} height={540} data={data} />
    </div>
  );
}
