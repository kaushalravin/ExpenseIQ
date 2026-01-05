import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function BarChart({ data }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Destroy old chart safely
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new ChartJS(canvasRef.current, {
      type: "bar",
      data: {
        labels: data.map(d => d.paymentMode),
        datasets: [
          {
            label: "Total Expense",
            data: data.map(d => d.total),
            backgroundColor: "#3b82f6",
            borderRadius: 8,
            borderWidth: 0
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

    // cleanup (VERY IMPORTANT)
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
