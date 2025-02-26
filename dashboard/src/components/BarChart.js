"use client";
import { useRef, useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import ApiFetcher from "../services/BarChartAPI";

export default function BarChart() {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const [data, setData] = useState(); // Initial state as null
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await ApiFetcher.getData(); // Fetch data from API
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
       

        const createChart = () => {
            if (chartRef.current) {
                const context = chartRef.current.getContext("2d");

                if (chartInstanceRef.current) {
                    chartInstanceRef.current.destroy(); // Destroy existing chart before creating a new one
                }

                chartInstanceRef.current = new Chart(context, {
                    type: "bar",
                    data: {
                        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "data"],
                        datasets: [{
                            label: "My First Dataset",
                            data: data, // Use state data
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
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            x: {
                                type: 'category',
                            },
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        };

       
        createChart();

        

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