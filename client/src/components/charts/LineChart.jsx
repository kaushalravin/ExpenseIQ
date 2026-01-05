import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  LineController
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  LineController
);

export default function LineChart({ data }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new ChartJS(canvasRef.current, {
      type: "line",
      data: {
        labels: data.map(item => `Month ${item.month}`),
        datasets: [
          {
            label: "Monthly Expense",
            data: data.map(item => item.total),
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            tension: 0.4,
            fill: true,
            pointRadius: 5,
            pointBackgroundColor: "#3b82f6",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
            pointHoverRadius: 7,
            borderWidth: 3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(30, 41, 59, 0.9)',
            padding: 12,
            cornerRadius: 8,
            titleColor: '#f8fafc',
            bodyColor: '#e2e8f0'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: '#f1f5f9',
              drawBorder: false
            },
            ticks: {
              color: '#64748b',
              font: {
                size: 12
              }
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#64748b',
              font: {
                size: 12
              }
            }
          }
        }
      }
    });

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [data]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <canvas ref={canvasRef} />
    </div>
  );
}
