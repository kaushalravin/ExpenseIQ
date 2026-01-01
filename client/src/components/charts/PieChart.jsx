import { useEffect, useRef } from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    PieController
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, PieController);

export default function PieChart({ data }) {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        if (!data || data.length === 0) return;

        // Destroy old chart before creating new
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        chartRef.current = new ChartJS(canvasRef.current, {
            type: "pie",
            data: {
                labels: data.map(item => item.category),
                datasets: [
                    {
                        label: "Expenses by Category",
                        data: data.map(item => item.total),
                        backgroundColor: [
                            "#10b981", // green
                            "#3b82f6", // blue
                            "#f59e0b", // yellow
                            "#ef4444", // red
                            "#8b5cf6", // purple
                            "#14b8a6"  // teal
                        ],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "bottom"
                    }
                }
            }
        });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [data]);

    return (
        <div style={{ width: "500px", height: "500px" }}>
            <canvas ref={canvasRef} />;
        </div>)
}
