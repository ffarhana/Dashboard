"use client";
import { useRef, useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import ApiFetcher from "../services/DoughnutChartAPI";

export default function DoughnutChart() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [data, setData] = useState(null); // Initial state as null

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ApiFetcher.getData();
        setData(result); // Ensure the API returns an array of numbers (or adjust accordingly)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Create chart when data is available
  useEffect(() => {
    if (!data) return; // Wait until data is available

    const context = chartRef.current.getContext("2d");

    // Destroy an existing chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(context, {
      type: "doughnut",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: "My First Dataset",
          data: data, // Use fetched API data here
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 206, 86)",
            "rgb(75, 192, 192)",
            "rgb(153, 102, 255)",
            "rgb(255, 159, 64)"
          ],
          borderWidth: 1,
          hoverBorderWidth: 2,
        }],
      },
      options: {
        responsive: true,
      },
    });

    // Cleanup function to destroy the chart on unmount or before re-creating
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <div style={{ position: "relative", width: "90vw", height: "80vh" }}>
      <canvas ref={chartRef} />
    </div>
  );
}
