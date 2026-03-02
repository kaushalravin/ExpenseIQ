import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import BarChart from "./charts/BarChart";
import PieChart from "./charts/PieChart";
import LineChart from "./charts/LineChart";
import axios from "axios";
import { API_BASE } from "../config/api.js";

export default function Analytics() {
    const [pieData, setPieData] = useState([]);
    const [barData, setBarData] = useState([]);
    const [lineData, setLineData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        from: "",
        to: ""
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const fetchAnalytics = async () => {
        setLoading(true);
        try {
            const [pieRes, barRes, lineRes] = await Promise.all([
                axios.get(`${API_BASE}/api/analytics/category`, {
                    params: formData
                }),
                axios.get(`${API_BASE}/api/analytics/paymentMode`, {
                    params: formData
                }),
                axios.get(`${API_BASE}/api/analytics/month`)
            ]);

            setPieData(pieRes.data.data);
            setBarData(barRes.data.data);
            setLineData(lineRes.data.data);
        } catch (err) {
            console.error(err);
            setError("Failed to load analytics");
        } finally {
            setLoading(false);
        }
    };

    // Initial load
    useEffect(() => {
        fetchAnalytics();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchAnalytics();
    };

    if (loading) return <p>Loading analytics...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <Navbar />

            <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
                <label>From:</label>
                <input
                    type="date"
                    name="from"
                    value={formData.from}
                    onChange={handleChange}
                />

                <label>To:</label>
                <input
                    type="date"
                    name="to"
                    value={formData.to}
                    onChange={handleChange}
                />

                <button type="submit">Apply Filter</button>
            </form>

            <BarChart data={barData} />
            <PieChart data={pieData} />
            <LineChart data={lineData} />
        </div>
    );
}
