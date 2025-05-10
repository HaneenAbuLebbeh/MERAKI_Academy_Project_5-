import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import {  Doughnut, Line } from "react-chartjs-2";


import "./style.css"
import SalesData from "./Data/SalesData"
import UserData from "./Data/UserData"

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";



const Charts = () => {
  
    return (
      <div className="Charts">
      <div className="dataCard">
        <Line
          data={{
            labels: SalesData.map((data) => data.label),
            datasets: [
              {
                label: "Sales",
                data: SalesData.map((data) => data.revenue),
                backgroundColor: "#064FF0",
                borderColor: "#064FF0",
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Monthly Revenue",
              },
            },
          }}
        />
      </div>

      <div className="dataCard">
        <Doughnut
          data={{
            labels: UserData.map((data) => data.label),
            datasets: [
              {
                label: "Count",
                data: UserData.map((data) => data.value),
                backgroundColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                ],
                borderColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                ],
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Users",
              },
            },
          }}
        />
      </div>
    </div>
      );
  
}

export default Charts