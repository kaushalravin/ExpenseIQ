export default function UpdatePopup({
    isVisible,
    updateData,
    setUpdateData,
    handleUpdateSubmit,
    onClose
}) {
    if (!isVisible || !updateData) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-container" onClick={(e) => e.stopPropagation()}>
                <div className="popup-header">
                    <div className="popup-header-content">
                        <div className="popup-icon">
                            <svg viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                        </div>
                        <h2 className="popup-title">Update Expense</h2>
                    </div>
                    <button className="popup-close" onClick={onClose}>
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleUpdateSubmit} className="popup-form">
                    <div className="popup-form-grid">
                        <div className="popup-form-field">
                            <label className="popup-label">
                                <svg viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                </svg>
                                Amount
                            </label>
                            <div className="popup-input-wrapper">
                                <span className="currency-symbol">₹</span>
                                <input
                                    type="number"
                                    name="amount"
                                    value={updateData.amount}
                                    onChange={handleChange}
                                    required
                                    className="popup-input with-currency"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>

                        <div className="popup-form-field">
                            <label className="popup-label">
                                <svg viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                                Date
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={updateData.date}
                                onChange={handleChange}
                                required
                                className="popup-input"
                            />
                        </div>

                        <div className="popup-form-field">
                            <label className="popup-label">
                                <svg viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                                </svg>
                                Category
                            </label>
                            <div className="popup-select-wrapper">
                                <select
                                    name="category"
                                    value={updateData.category}
                                    onChange={handleChange}
                                    required
                                    className="popup-select"
                                >
                                    <option value="">Select</option>
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

                        <div className="popup-form-field">
                            <label className="popup-label">
                                <svg viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                                </svg>
                                Payment Mode
                            </label>
                            <div className="popup-select-wrapper">
                                <select
                                    name="paymentMode"
                                    value={updateData.paymentMode}
                                    onChange={handleChange}
                                    required
                                    className="popup-select"
                                >
                                    <option value="">Select</option>
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

                    <div className="popup-form-field full-width">
                        <label className="popup-label">
                            <svg viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            Note (Optional)
                        </label>
                        <textarea
                            name="note"
                            value={updateData.note}
                            onChange={handleChange}
                            className="popup-textarea"
                            placeholder="Add any additional details..."
                            rows="3"
                        />
                    </div>

                    <div className="popup-actions">
                        <button type="submit" className="popup-btn-update">
                            <svg viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Update Expense
                        </button>
                        <button type="button" onClick={onClose} className="popup-btn-cancel">
                            <svg viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}