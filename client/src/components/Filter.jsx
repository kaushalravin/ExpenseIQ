import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../config/api.js";
import Navbar from "./Navbar";
import FilterForm from "./FilterForm";
import ShowData from "./ShowData";
import UpdatePopup from "./UpdatePopup";
import exportFilteredExpenses from "../FileHandlers/exportXlsx";
import ExportXlsx from "./ExportXlsx";
import "../styles/filter.css";

export default function Filter() {
    const [message, setMessage] = useState("");
    const [data, setData] = useState([]);
    const [stats, setStats] = useState(null);
    const [updateData, setUpdateData] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [excelLink, setExcelLink] = useState(null);
    const [page,setPage]=useState(1);
    const [activeFilters, setActiveFilters] = useState(null);

    // 🔹 Fetch filtered data
    const handleSubmit = (formData) => {
        setActiveFilters(formData);
        setPage(1);
    };

    useEffect(() => {
        if (!activeFilters) return;

        const fetchFilteredData = async () => {
            try {
                const res = await axios.get(
                    `${API_BASE}/api/expenses/filter/`,
                    { params: { ...activeFilters, page } }
                );

                if (res.data.success) {
                    setData(res.data.data.expenses);
                    setStats(res.data.data.stats || null);
                    setMessage(res.data.data.message);
                } else {
                    setMessage("Something went wrong");
                }
            } catch (err) {
                console.error(err);
                setMessage("Error fetching data");
            }
        };

        fetchFilteredData();
    }, [activeFilters, page]);

    // 🔹 Delete expense
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_BASE}/api/expenses/${id}`);
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
            const { _id, __v, ...cleanData } = updateData;
            console.log(cleanData);
            const res = await axios.put(
                `${API_BASE}/api/expenses/${updateData._id}`,
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
            console.error(err);
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

                    {/* Export Section */}
                    <section className="dashboard-section export-section">
                    <div className="section-header">
                        <div className="section-header-left">
                            <h2 className="section-title">Export Data</h2>
                            <p className="section-description">Download filtered results as Excel</p>
                        </div>
                    </div>
                    <div className="export-actions">
                        <button
                            className="export-btn"
                            onClick={() => {
                                const url = exportFilteredExpenses(data);
                                if (!url) {
                                    setMessage("No data to export");
                                    setExcelLink((prev) => {
                                        if (typeof prev === "string" && prev.startsWith("blob:")) {
                                            URL.revokeObjectURL(prev);
                                        }
                                        return null;
                                    });
                                    return;
                                }
                                setExcelLink((prev) => {
                                    if (typeof prev === "string" && prev.startsWith("blob:")) {
                                        URL.revokeObjectURL(prev);
                                    }
                                    return url;
                                });
                            }}
                        >
                            <svg viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Generate Excel File
                        </button>
                        {excelLink && (
                            <ExportXlsx
                                link={excelLink}
                                fileName="filtered_expenses.xlsx"
                                onAfterDownload={() => setExcelLink(null)}
                            />
                        )}
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
                                setPage={setPage}
                                page={page}
                                stats={stats}
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