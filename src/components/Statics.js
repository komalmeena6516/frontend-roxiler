
import axios from "axios";
import React, { useEffect, useState } from "react";
import { monthObj } from "../month";

const Statistics = ({ month }) => {
  const [statisticsData, setStatisticsData] = useState({});
  const fetchStatistics = () => {
    axios
      .get(`http://localhost:8001/statistics/${month}`)
      .then((res) => {
        setStatisticsData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  useEffect(() => {
    fetchStatistics();
  }, [month]);
  
  return (
    <div className="statistics">
      <h2>Statistics - {monthObj[month]}</h2>{" "}
      <span>(select month from dropdown)</span>
      <table>
        <tbody>
          <tr>
            <td>Total Sale</td>
            <td>{statisticsData?.totalSaleAmount}</td>
          </tr>
          <tr>
            <td>Total Sold Items</td>
            <td>{statisticsData?.numberOfSoldItems}</td>
          </tr>
          <tr>
            <td>Total Not Sold Items</td>
            <td>{statisticsData?.numberOfUnsoldItems}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;