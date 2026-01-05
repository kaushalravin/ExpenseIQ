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
                            "#3b82f6", // blue
                            "#8b5cf6", // purple
                            "#f59e0b", // amber
                            "#ef4444", // red
                            "#14b8a6", // teal
                            "#f97316"  // orange
                        ],
                        borderWidth: 0,
                        borderColor: '#ffffff'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "bottom",
                        labels: {
                            color: '#64748b',
                            font: {
                                size: 12,
                                family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                            },
                            padding: 15,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(30, 41, 59, 0.9)',
                        padding: 12,
                        cornerRadius: 8,
                        titleColor: '#f8fafc',
                        bodyColor: '#e2e8f0'
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
        <div style={{ width: "100%", height: "100%" }}>
            <canvas ref={canvasRef} />
        </div>
    );
}
