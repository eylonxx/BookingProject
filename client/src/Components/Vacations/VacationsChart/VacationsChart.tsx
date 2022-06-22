import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import VacationModel from '../../../Models/vacationModel';
import store from '../../../Redux/Store';
import './VacationsChart.css';

export default function VacationsChart() {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [filteredVacations, setFilteredVacations] = useState<VacationModel[]>([]);

  useEffect(() => {
    setVacations(store.getState().vacationState.vacations);
    const unsubscribe = store.subscribe(() => {
      setVacations(store.getState().vacationState.vacations);
    });
    return () => unsubscribe();
  }, []);

  const vacationsFilter = vacations.filter((vac) => {
    return vac.followers !== 0;
  });

  const labels = vacationsFilter.map((vac) => {
    return vac.destination + ' #' + vac.id;
  });
  const values = vacationsFilter.map((vac) => {
    return vac.followers;
  });

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
        label: 'Followers',
        data: values,
        color: 'white',
        //   values
        backgroundColor: 'rgba(250,250,250,0.5)',
      },
    ],
  };

  return (
    <div className="VacationsChart">
      <Bar options={options} width={800} height={200} data={data} />
    </div>
  );
}
