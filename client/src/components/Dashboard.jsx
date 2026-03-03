import { useState, useEffect } from "react";
import axios from "axios";
import { VITE_API_BASE } from "../config/api.js";
import FormFields from "./FormFields";
import UpdatePopup from "./UpdatePopup";
import ShowData from "./ShowData";
import Navbar from "./Navbar";
import BarChart from "./charts/BarChart";
import PieChart from "./charts/PieChart";
import LineChart from "./charts/LineChart";
import CardParent from "./CardParent";
import CsvPreview from "./csvPreview";
import validateCsv from "../validators/csvValidators";
import { useSpeechToText } from "../utilities/useSpeechToText";
import { normalizeExcelRow } from "../FileHandlers/handleXlsx";
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
    const [page,setPage]=useState(1);
    const [sum,setSum]=useState(0);
    const [average,setAverage]=useState(0);
    
      

    // AI Parsing state
    const [isAiModalVisible, setIsAiModalVisible] = useState(false);
    const [aiInputText, setAiInputText] = useState("");
    const [aiParsing, setAiParsing] = useState(false);
    const [aiParsedData, setAiParsedData] = useState(null);

    // Analytics state
    const [pieData, setPieData] = useState([]);
    const [barData, setBarData] = useState([]);
    const [lineData, setLineData] = useState([]);
    const [analyticsLoading, setAnalyticsLoading] = useState(false);
    const [dateFilter, setDateFilter] = useState({
        from: "",
        to: ""
    });

    //csv data handling state
    const [csvData, setCsvData] = useState(null);
    const [validatedCsvRows, setValidatedCsvRows] = useState(null);

    //speech to text states
    const { isListening, startListening, stopListening } = useSpeechToText();

    useEffect(() => {
        const total = (Array.isArray(data) ? data : []).reduce((runningTotal, item) => {
            const amount = typeof item?.amount === "number" ? item.amount : Number(item?.amount) || 0;
            return runningTotal + amount;
        }, 0);

        setSum(total);
        setAverage((Array.isArray(data) ? data.length : 0) > 0 ? total / data.length : 0);
    }, [data]);

    useEffect(() => {
        if (!csvData) {
            setValidatedCsvRows(null);
            return;
        }

        const validationResults = validateCsv(csvData);
        if (validationResults.valid === false) {
            if (validationResults.message) {
                setMessage(`Validation Error: ${validationResults.message}`);
            } else if (validationResults.invalidRows?.length) {
                const first = validationResults.invalidRows[0];
                setMessage(`Validation Error (row ${first.row}): ${first.errors.join(", ")}`);
            } else {
                setMessage("Validation Error");
            }
            setValidatedCsvRows(null);
            setCsvData(null);
            setIsAddVisible(false);
            return;
        }

        setValidatedCsvRows(validationResults.validRows);
    }, [csvData]);

    const handleConfirmCsvUpload = async () => {
        try {
            if (!validatedCsvRows || validatedCsvRows.length === 0) {
                setMessage("No CSV data to upload");
                setCsvData(null);
                setValidatedCsvRows(null);
                setIsAddVisible(false);
                return;
            }

            const result = await axios.post(
                `${VITE_API_BASE}/api/expenses/bulk`,
                { expenses: validatedCsvRows }
            );

            if (result.data.success) {
                setMessage("CSV data uploaded successfully");
                setRefresh(prev => !prev);
                setCsvData(null);
                setValidatedCsvRows(null);
                setIsAddVisible(false);
            } else {
                setMessage("Failed to upload CSV data");
                setCsvData(null);
                setValidatedCsvRows(null);
                setIsAddVisible(false);
            }
        } catch (err) {
            setMessage(err.response?.data?.error?.message || "Failed to upload CSV data");
            setCsvData(null);
            setValidatedCsvRows(null);
            setIsAddVisible(false);
        }
    };


    useEffect(() => {
        async function getData() {
            try {
                const newdata = await axios.get(`${VITE_API_BASE}/api/expenses`,{
                    params:{
                        page:page
                    }
                });
                setData(newdata.data.data.expenses);
            } catch (err) {
                console.log(err);
            }
        }

        getData();
    }, [refresh, page]);

    // Fetch analytics data
    useEffect(() => {
        const fetchAnalytics = async () => {
            setAnalyticsLoading(true);
            try {
                const [pieRes, barRes, lineRes] = await Promise.all([
                    axios.get(`${VITE_API_BASE}/api/analytics/category`, {
                        params: dateFilter
                    }),
                    axios.get(`${VITE_API_BASE}/api/analytics/paymentMode`, {
                        params: dateFilter
                    }),
                    axios.get(`${VITE_API_BASE}/api/analytics/month`)
                ]);

                setPieData(pieRes.data.data);
                setBarData(barRes.data.data);
                setLineData(lineRes.data.data);
            } catch (err) {
                console.error("Failed to load analytics:", err);
            } finally {
                setAnalyticsLoading(false);
            }
        };

        fetchAnalytics();
    }, [dateFilter, refresh])

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${VITE_API_BASE}/api/expenses/${id}`);
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
            const { _id, __v, createdAt, updatedAt, userId, ...cleanData } = updateData;
            const res = await axios.put(
                `${VITE_API_BASE}/api/expenses/${updateData._id}`,
                {
                    ...cleanData,
                    amount: Number(cleanData.amount)
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

    // AI Parsing Handler
    const handleAiParse = async () => {
        if (!aiInputText.trim()) {
            setMessage("Please enter expense text");
            return;
        }

        setAiParsing(true);
        try {
            const res = await axios.post(
                `${VITE_API_BASE}/api/expenses/parse-expense`,
                { text: aiInputText }
            );

            if (res.data.success) {
                setAiParsedData(res.data.data.expense);
                setMessage("Expense parsed! Review and edit if needed.");
            } else {
                setMessage("Failed to parse expense");
            }
        } catch (err) {
            setMessage(err.response?.data?.error?.message || "AI parsing failed");
        } finally {
            setAiParsing(false);
        }
    };

    const handleAiModalClose = () => {
        if (isListening) {
            stopListening();
        }
        setIsAiModalVisible(false);
        setAiInputText("");
        setAiParsedData(null);
    };

    const handleStartListening = () => {
        startListening((transcript) => {
            setAiInputText(prev => prev ? prev + " " + transcript : transcript);
        });
    };

    const handleStopListening = () => {
        stopListening();
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
                            <span className="header-icon-rupee">₹</span>
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
                    {/* Cards Section */}
                    <CardParent refresh={refresh}/>
                    {/* Analytics Section */}
                    <section className="dashboard-section analytics-section">
                        <div className="section-header">
                            <div className="section-header-left">
                                <h2 className="section-title">Analytics Overview</h2>
                                <p className="section-description">Visualize your spending patterns</p>
                            </div>
                            <div className="analytics-date-filter">
                                <input
                                    type="date"
                                    name="from"
                                    value={dateFilter.from}
                                    onChange={(e) => setDateFilter(prev => ({ ...prev, from: e.target.value }))}
                                    placeholder="From"
                                    className="date-filter-input"
                                />
                                <span className="date-separator">to</span>
                                <input
                                    type="date"
                                    name="to"
                                    value={dateFilter.to}
                                    onChange={(e) => setDateFilter(prev => ({ ...prev, to: e.target.value }))}
                                    placeholder="To"
                                    className="date-filter-input"
                                />
                            </div>
                        </div>
                        <div className="analytics-grid">
                            <div className="chart-card">
                                <div className="chart-card-header">
                                    <h3 className="chart-title">Expenses by Category</h3>
                                    <p className="chart-subtitle">Distribution of spending across categories</p>
                                </div>
                                <div className="chart-wrapper">
                                    {analyticsLoading ? (
                                        <div className="chart-loading">Loading...</div>
                                    ) : (
                                        <PieChart data={pieData} />
                                    )}
                                </div>
                            </div>

                            <div className="chart-card">
                                <div className="chart-card-header">
                                    <h3 className="chart-title">Payment Methods</h3>
                                    <p className="chart-subtitle">Total expenses by payment mode</p>
                                </div>
                                <div className="chart-wrapper">
                                    {analyticsLoading ? (
                                        <div className="chart-loading">Loading...</div>
                                    ) : (
                                        <BarChart data={barData} />
                                    )}
                                </div>
                            </div>

                            <div className="chart-card chart-card-wide">
                                <div className="chart-card-header">
                                    <h3 className="chart-title">Monthly Trends</h3>
                                    <p className="chart-subtitle">Track your spending over time</p>
                                </div>
                                <div className="chart-wrapper">
                                    {analyticsLoading ? (
                                        <div className="chart-loading">Loading...</div>
                                    ) : (
                                        <LineChart data={lineData} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

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
                            <ShowData data={data} handleDelete={handleDelete} handleUpdate={handleUpdate} setPage={setPage} page={page} stats={{sum,average}}></ShowData>
                        </div>
                    </section>
                </div>
            </main>

            {/* Floating Action Buttons */}
            <div className="fab-container">
                <button className="fab-button fab-secondary fab-ai" onClick={() => setIsAiModalVisible(true)} title="AI Text Parsing">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span className="fab-tooltip">AI Parse</span>
                </button>

                <button className="fab-button fab-primary" onClick={() => { setIsAddVisible(true); setEditingExpense(null); }}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                    </svg>
                    <span className="fab-tooltip">Add Expense</span>
                </button>
            </div>

            {isAddVisible && !(csvData && validatedCsvRows) && (
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
                            <FormFields setRefresh={setRefresh} onClose={() => setIsAddVisible(false)} setCsvData={setCsvData}/>
                        </div>
                    </div>
                </div>
            )}

            {csvData && validatedCsvRows && (
                <CsvPreview 
                    csvParsedData={csvData} 
                    onConfirm={handleConfirmCsvUpload}
                    onCancel={() => { setCsvData(null); setValidatedCsvRows(null); setIsAddVisible(false); }}
                />
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

            {/* AI Text Parsing Modal */}
            {isAiModalVisible && (
                <div className="popup-overlay" onClick={handleAiModalClose}>
                    <div className="popup-container ai-modal-container" onClick={(e) => e.stopPropagation()}>
                        <div className="popup-header">
                            <div className="popup-header-content">
                                <div className="popup-icon popup-icon-ai">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="popup-title">AI Expense Parser</h2>
                                    <p className="popup-subtitle">
                                        {aiParsedData ? "Review & edit before saving" : "Type naturally, let AI do the rest"}
                                    </p>
                                </div>
                            </div>
                            <button className="popup-close" onClick={handleAiModalClose}>
                                <svg viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <div className="ai-modal-content">
                            {!aiParsedData ? (
                                <div className="ai-input-section">
                                    <label className="ai-label">
                                        Describe your expense in natural language
                                        <span className="ai-hint">e.g., "Spent 500 on groceries yesterday using UPI" or speak using the microphone</span>
                                    </label>
                                    <div className="ai-textarea-wrapper">
                                        <textarea
                                            className="ai-textarea"
                                            value={aiInputText}
                                            onChange={(e) => setAiInputText(e.target.value)}
                                            placeholder="Spent 320 on coffee at Starbucks today via credit card"
                                            rows="4"
                                            disabled={aiParsing || isListening}
                                        />
                                        {isListening && (
                                            <div className="ai-listening-indicator">
                                                <div className="ai-listening-pulse"></div>
                                                <span>Listening...</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="ai-button-group">
                                        {!isListening ? (
                                            <button 
                                                className="ai-voice-btn"
                                                onClick={handleStartListening}
                                                disabled={aiParsing}
                                                title="Start Voice Input"
                                            >
                                                <svg viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                                                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                                                </svg>
                                                Start Listening
                                            </button>
                                        ) : (
                                            <button 
                                                className="ai-voice-btn ai-voice-btn-stop"
                                                onClick={handleStopListening}
                                                title="Stop Voice Input"
                                            >
                                                <svg viewBox="0 0 24 24" fill="currentColor">
                                                    <rect x="6" y="6" width="12" height="12" />
                                                </svg>
                                                Stop Listening
                                            </button>
                                        )}
                                        <button 
                                            className="ai-parse-btn"
                                            onClick={handleAiParse}
                                            disabled={aiParsing || !aiInputText.trim() || isListening}
                                        >
                                        {aiParsing ? (
                                            <>
                                                <svg className="ai-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
                                                </svg>
                                                Parsing...
                                            </>
                                        ) : (
                                            <>
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                                Parse with AI
                                            </>
                                        )}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="ai-form-section">
                                    <div className="ai-success-banner">
                                        <svg viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>Expense parsed successfully! Edit any field if needed, then save.</span>
                                    </div>
                                    <FormFields 
                                        setRefresh={setRefresh} 
                                        editingExpense={aiParsedData}
                                        onClose={handleAiModalClose}
                                    />
                                    <button 
                                        className="ai-parse-again-btn" 
                                        onClick={() => { setAiParsedData(null); setAiInputText(""); }}
                                    >
                                        <svg viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                                        </svg>
                                        Parse Different Expense
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}