import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './VacationsChart.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
//labels = vacations that have followers
const values = [];
//amount of followers for each vacation

const options = {
  responsive: true,
  scales: {
    y: {
      ticks: { color: 'white', beginAtZero: true },
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
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [1, 2, 3, 4, 5, 6, 7],
      color: 'white',
      //   values
      backgroundColor: 'rgba(250,250,250,0.5)',
    },
  ],
};

export default function VacationsChart() {
  return (
    <div className="VacationsChart">
      <Bar options={options} width={800} height={200} data={data} />
    </div>
  );
}
