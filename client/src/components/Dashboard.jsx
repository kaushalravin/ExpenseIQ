import { useState, useEffect } from "react";
import axios from "axios";
import FormFields from "./FormFields";
import ShowData from "./ShowData";
import Navbar from "./Navbar";
import "../styles/dashboard.css";

axios.defaults.withCredentials = true;

export default function Dashboard() {
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [message, setMessage] = useState("");
    const [editingExpense, setEditingExpense] = useState(null);

    useEffect(() => {
        async function getData() {
            try {
                const newdata = await axios.get("http://localhost:3000/api/expenses");
                setData(newdata.data.data.expenses);
            } catch (err) {
                console.log(err);
            }
        }

        getData();
    }, [refresh])

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/expenses/${id}`);
            setData(prev => prev.filter(item => item._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdate = (expense) => {
        setEditingExpense(expense);
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="header-content">
                    <div className="header-left">
                        <Navbar setMessage={setMessage}></Navbar>
                    </div>
                    <div className="header-center">
                        <div className="header-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="header-title">Dashboard</h1>
                            <p className="header-subtitle">Manage your expenses efficiently</p>
                        </div>
                    </div>
                    <div className="header-right">
                        {message && (
                            <div className="header-message">
                                {message}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <main className="dashboard-main">
                <div className="dashboard-content">
                    <section className="dashboard-section form-section-wrapper">
                        <div className="section-header">
                            <h2 className="section-title">Add New Expense</h2>
                            <p className="section-description">Track your spending by adding expense details below</p>
                        </div>
                        <div className="section-content">
                            <FormFields setRefresh={setRefresh} editingExpense={editingExpense}></FormFields>
                        </div>
                    </section>

                    <section className="dashboard-section data-section-wrapper">
                        <div className="section-header">
                            <h2 className="section-title">Your Expenses</h2>
                            <p className="section-description">View and manage all your recorded expenses</p>
                        </div>
                        <div className="section-content">
                            <ShowData data={data} handleDelete={handleDelete} handleUpdate={handleUpdate}></ShowData>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}