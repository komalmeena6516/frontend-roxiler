import axios from "axios";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { monthObj } from "../month";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = [
  "0-100",
  "101-200",
  "201-300",
  "301-400",
  "401-500",
  "501-600",
  "601-700",
  "701-800",
  "801-900",
  "901-above",
];

const BarChart = ({ month }) => {
  const [priceRanges, setPriceRanges] = useState({});
  const [data, setData] = useState();
  useEffect(() => {
    setData({
      labels,
      datasets: [
        {
          label: "Transaction bar chart",
          data: labels.map((label) => priceRanges[label]),
          backgroundColor: "rgb(33 207 227 / 60%)",
        },
      ],
    });
  }, [priceRanges]);

  const fetchPriceRanges = () => {
    axios
      .get(`http://localhost:8001/priceRanges/${month}`)
      .then((res) => {
        console.log(res.data.data);
        setPriceRanges(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchPriceRanges();
  }, [month]);
  return (
    <div className="barChart">
      <h2>Bar Chart Stats - {monthObj[month]}</h2>{" "}
      <span>(select month from dropdown)</span>
      {data && <Bar className="chart" options={options} data={data} />}
    </div>
  );
};

export default BarChart;