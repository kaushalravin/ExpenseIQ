import { useState, useEffect } from "react";
import axios from "axios";
import FormFields from "./FormFields";
import UpdatePopup from "./UpdatePopup";
import ShowData from "./ShowData";
import Navbar from "./Navbar";
import "../styles/dashboard.css";
import "../styles/filter.css";

axios.defaults.withCredentials = true;

export default function Dashboard() {
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [message, setMessage] = useState("");
    const [editingExpense, setEditingExpense] = useState(null);
    const [isAddVisible, setIsAddVisible] = useState(false);
    const [isUpdateVisible, setIsUpdateVisible] = useState(false);
    const [updateData, setUpdateData] = useState(null);

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
            setMessage("Expense deleted successfully");
        } catch (err) {
            console.error(err);
            setMessage("Failed to delete expense");
        }
    };

    const handleUpdate = (expense) => {
        setUpdateData({
            ...expense,
            date: expense.date ? expense.date.split("T")[0] : expense.date
        });
        setIsUpdateVisible(true);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!updateData) return;
            const res = await axios.put(
                `http://localhost:3000/api/expenses/${updateData._id}`,
                {
                    ...updateData,
                    amount: Number(updateData.amount)
                }
            );

            if (res.data.success) {
                setMessage("Expense updated successfully");
                setIsUpdateVisible(false);
                setUpdateData(null);
                setRefresh(prev => !prev);
            } else {
                setMessage(res.data.error?.message || "Failed to update");
            }
        } catch (err) {
            setMessage(err.response?.data?.error?.message || "An error occurred");
        }
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
                            <h1 className="header-title">Expense Dashboard</h1>
                            <p className="header-subtitle">Track, manage, and analyze your spending</p>
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
                    <section className="dashboard-section data-section-wrapper">
                        <div className="section-header">
                            <div className="section-header-left">
                                <h2 className="section-title">Recent Transactions</h2>
                                <p className="section-description">View and manage all your expenses</p>
                            </div>
                            <div className="section-header-stats">
                                <div className="stat-badge">
                                    <svg viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                    </svg>
                                    <span className="stat-count">{data.length}</span>
                                    <span className="stat-label">Expenses</span>
                                </div>
                            </div>
                        </div>
                        <div className="section-content">
                            <ShowData data={data} handleDelete={handleDelete} handleUpdate={handleUpdate}></ShowData>
                        </div>
                    </section>
                </div>
            </main>

            {/* Floating Action Button */}
            <button className="fab-button" onClick={() => { setIsAddVisible(true); setEditingExpense(null); }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span className="fab-tooltip">Add Expense</span>
            </button>

            {isAddVisible && (
                <div className="popup-overlay" onClick={() => setIsAddVisible(false)}>
                    <div className="popup-container" onClick={(e) => e.stopPropagation()}>
                        <div className="popup-header">
                            <div className="popup-header-content">
                                <div className="popup-icon">
                                    <svg viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h2 className="popup-title">Add Expense</h2>
                            </div>
                            <button className="popup-close" onClick={() => setIsAddVisible(false)}>
                                <svg viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <div className="popup-form-wrapper">
                            <FormFields setRefresh={setRefresh} onClose={() => setIsAddVisible(false)} />
                        </div>
                    </div>
                </div>
            )}

            {isUpdateVisible && (
                <UpdatePopup
                    isVisible={isUpdateVisible}
                    updateData={updateData}
                    setUpdateData={setUpdateData}
                    handleUpdateSubmit={handleUpdateSubmit}
                    onClose={() => { setIsUpdateVisible(false); setUpdateData(null); }}
                />
            )}
        </div>
    )
}