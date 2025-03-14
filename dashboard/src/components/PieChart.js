"use client";
import { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";

export default function PieChart() {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const context = chartRef.current.getContext("2d");

            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy(); // Destroy existing chart before creating a new one
            }

            chartInstanceRef.current = new Chart(context, {
                type: "pie",
                data: {
                    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                    datasets: [{
                        label: "My First Dataset",
                        data: [65, 59, 80, 81, 56, 55],
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
                    
                }
            });

            return () => {
                if (chartInstanceRef.current) {
                    chartInstanceRef.current.destroy(); // Cleanup on unmount
                }
            };
        }
    }, []);

    return (
        <div style={{ position: "relative", width: "90vw", height: "80vh" }}>
            <canvas ref={chartRef} />
        </div>
    );
}
