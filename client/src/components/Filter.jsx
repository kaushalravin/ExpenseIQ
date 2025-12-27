import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import FilterForm from "./FilterForm";
import ShowData from "./ShowData";
import UpdatePopup from "./UpdatePopup";
import "../styles/filter.css";

export default function Filter() {
    const [message, setMessage] = useState("");
    const [data, setData] = useState([]);
    const [updateData, setUpdateData] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    // 🔹 Fetch filtered data
    const handleSubmit = async (formData) => {
        try {
            const res = await axios.get(
                "http://localhost:3000/api/expenses/filter",
                { params: formData }
            );

            if (res.data.success) {
                setData(res.data.data.expenses);
                setMessage(res.data.data.message);
            } else {
                setMessage("Something went wrong");
            }
        } catch (err) {
            setMessage("Error fetching data");
        }
    };

    // 🔹 Delete expense
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/expenses/${id}`);
            setData(prev => prev.filter(item => item._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    // 🔹 Open update popup
    const handleUpdate = (row) => {
        setUpdateData(row);
        setIsVisible(true);
    };

    // 🔹 Submit updated expense
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        try {
            const { _id, __v, createdAt, userId, ...cleanData } = updateData;
            console.log(cleanData);
            const res = await axios.put(
                `http://localhost:3000/api/expenses/${updateData._id}`,
                cleanData
            );

            if (res.data.success) {
                setMessage(res.data.data.message);
                setIsVisible(false);
                setUpdateData(null);

                // refresh table
                setData(prev =>
                    prev.map(item =>
                        item._id === updateData._id ? res.data.data.expenses : item
                    )
                );
            }
        } catch (err) {
            setMessage("Error updating expense");
        }
    };

    return (
        <div className="dashboard-container">
            {/* Header with Navbar */}
            <header className="dashboard-header">
                <div className="header-content">
                    <div className="header-left">
                        <Navbar setMessage={setMessage} />
                    </div>
                    <div className="header-center">
                        <div className="header-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="header-title">Filter Expenses</h1>
                            <p className="header-subtitle">Search and filter your expense records</p>
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

            {/* Main Content */}
            <main className="dashboard-main">
                <div className="dashboard-content">
                    {/* Filter Section */}
                    <section className="dashboard-section filter-section-wrapper">
                        <div className="section-header">
                            <h2 className="section-title">Filter Options</h2>
                            <p className="section-description">Apply filters to find specific expenses</p>
                        </div>
                        <div className="section-content">
                            <FilterForm handleSubmit={handleSubmit} />
                        </div>
                    </section>

                    {/* Results Section */}
                    <section className="dashboard-section data-section-wrapper">
                        <div className="section-header">
                            <h2 className="section-title">Filtered Results</h2>
                            <p className="section-description">View, edit, or delete your expenses</p>
                        </div>
                        <div className="section-content">
                            <ShowData
                                data={data}
                                handleDelete={handleDelete}
                                handleUpdate={handleUpdate}
                            />
                        </div>
                    </section>
                </div>
            </main>

            <UpdatePopup
                isVisible={isVisible}
                updateData={updateData}
                setUpdateData={setUpdateData}
                handleUpdateSubmit={handleUpdateSubmit}
                onClose={() => setIsVisible(false)}
            />
        </div>
    );
}