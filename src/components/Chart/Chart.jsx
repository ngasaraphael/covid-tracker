import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api/index';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState([]);

  //here we use functional components and useEffect to get data
  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchAPI();
  }, []);

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [
          {
            label: 'People',
            backgroundColor: ['orange', 'rgba(0, 255, 0, 0.5)', 'red'],
            data: [confirmed.value, (90 / 100) * confirmed.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;

  const lineChart = dailyData[0] ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) =>
          new Date(date).toLocaleDateString()
        ),
        datasets: [
          {
            data: dailyData.map((data) => data.confirmed),
            label: 'Infected',
            borderColor: 'orange',
            backgroundColor: 'orange',
          },
          {
            data: dailyData.map((data) => (90 / 100) * data.confirmed),
            label: 'Recovered',
            borderColor: 'rgb(47, 255, 158)',
            backgroundColor: 'rgb(47, 255, 158)',
          },

          {
            data: dailyData.map((data) => data.deaths),
            label: 'Deaths',
            borderColor: ' rgb(255, 0, 98)',
            backgroundColor: 'red',
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;
