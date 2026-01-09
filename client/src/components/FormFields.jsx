import { useState, useEffect } from "react";
import axios from "axios";
import Papa from "papaparse";
import "../styles/formfields.css";

axios.defaults.withCredentials = true;

export default function FormFields({ setRefresh, editingExpense, onClose,setCsvData }) {
    const [formData, setFormData] = useState({
        amount: "",
        note: "",
        paymentMode: "",
        category: "",
        date: ""
    });

    useEffect(() => {
        if (editingExpense) {
            setFormData({
                amount: editingExpense.amount,
                note: editingExpense.note || "",
                category: editingExpense.category,
                paymentMode: editingExpense.paymentMode,
                date: editingExpense.date?.split("T")[0]
            });
        }
    }, [editingExpense]);

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let res;

            if (editingExpense) {
                res = await axios.put(
                    `http://localhost:3000/api/expenses/${editingExpense._id}`,
                    formData
                );
            } else {
                res = await axios.post(
                    "http://localhost:3000/api/expenses",
                    {
                        ...formData,
                        amount: Number(formData.amount)
                    }
                );
            }

            if (res.data.success) {
                setMessage(
                    editingExpense
                        ? "Expense updated successfully"
                        : "Expense added successfully"
                );

                setFormData({
                    amount: "",
                    note: "",
                    paymentMode: "",
                    category: "",
                    date: ""
                });

                setRefresh(prev => !prev);
                // close popup if an onClose callback was provided (used by Add popup)
                if (onClose) onClose();
            } else {
                setMessage(res.data.error.message);
            }

        } catch (err) {
            setMessage(
                err.response?.data?.error?.message || "An error occurred"
            );
        }
    };

    //csv data parsing and sending to dashboard component

    const handleCsvUpload = (evt) => {
        const file = evt.target.files?.[0];
        if (!file) return;

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => {
                setCsvData(result.data);
                evt.target.value = "";
            },
            error: (err) => {
                console.error(err);
            }
        });
    };


    return (
        <div className="form-fields-container">
            {message && (
                <div className={`form-message ${message.includes('success') ? 'success-message' : 'error-message'}`}>
                    <svg viewBox="0 0 20 20" fill="currentColor">
                        {message.includes('success') ? (
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        ) : (
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        )}
                    </svg>
                    <span>{message}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="expense-form">
                <div className="form-grid">
                    <div className="form-field">
                        <label htmlFor="amount" className="form-label">
                            <svg viewBox="0 0 20 20" fill="currentColor">
                                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                            </svg>
                            Amount
                        </label>
                        <div className="input-wrapper-form">
                            <span className="currency-symbol">₹</span>
                            <input
                                type="number"
                                id="amount"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                required
                                className="form-input with-currency"
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    <div className="form-field">
                        <label htmlFor="date" className="form-label">
                            <svg viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="category" className="form-label">
                            <svg viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                            </svg>
                            Category
                        </label>
                        <div className="select-wrapper">
                            <select
                                name="category"
                                id="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="form-select"
                            >
                                <option value="">Select Category</option>
                                <option value="Food">🍔 Food</option>
                                <option value="Utilities">💡 Utilities</option>
                                <option value="Shopping">🛍️ Shopping</option>
                                <option value="Rent">🏠 Rent</option>
                                <option value="Entertainment">🎬 Entertainment</option>
                                <option value="Other">📦 Other</option>
                            </select>
                            <svg className="select-arrow" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>

                    <div className="form-field">
                        <label htmlFor="paymentMode" className="form-label">
                            <svg viewBox="0 0 20 20" fill="currentColor">
                                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                            </svg>
                            Payment Mode
                        </label>
                        <div className="select-wrapper">
                            <select
                                name="paymentMode"
                                id="paymentMode"
                                value={formData.paymentMode}
                                onChange={handleChange}
                                required
                                className="form-select"
                            >
                                <option value="">Select Payment Mode</option>
                                <option value="Cash">💵 Cash</option>
                                <option value="UPI">📱 UPI</option>
                                <option value="Debit Card">💳 Debit Card</option>
                                <option value="Credit Card">💳 Credit Card</option>
                                <option value="Net Banking">🏦 Net Banking</option>
                                <option value="Other">💼 Other</option>
                            </select>
                            <svg className="select-arrow" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="form-field full-width">
                    <label htmlFor="note" className="form-label">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        Note (Optional)
                    </label>
                    <textarea
                        id="note"
                        name="note"
                        value={formData.note}
                        onChange={handleChange}
                        className="form-textarea"
                        placeholder="Add any additional details about this expense..."
                        rows="3"
                    />
                </div>

                <input
                    id="csvFile"
                    type="file"
                    accept=".csv"
                    className="csv-input-hidden"
                    onChange={handleCsvUpload}
                />

                <div className="form-buttons-grid">
                    <button type="submit" className="submit-btn-form">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        {editingExpense ? 'Save Changes' : 'Add Expense'}
                    </button>

                    <button type="button" className="csv-upload-btn" onClick={() => document.getElementById("csvFile")?.click()}>
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Upload CSV
                    </button>
                </div>

            </form>
        </div>
    );
}