import { useState } from "react";

export default function FilterForm({ handleSubmit }) {
    const [formData, setFormData] = useState({
        category: "",
        paymentMode: "",
        from: "",
        to: "",
        minAmount:"",
        maxAmount:"",
        note:""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(formData);
    };

    return (
        <div className="filter-form-container">
            <form onSubmit={onSubmit} className="filter-form">

                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
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

                <select
                    name="paymentMode"
                    value={formData.paymentMode}
                    onChange={handleChange}
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

                <input
                    type="date"
                    name="from"
                    value={formData.from}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="From date"
                />

                <input
                    type="date"
                    name="to"
                    value={formData.to}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="To date"
                />

                <input
                    type="number"
                    name="minAmount"
                    value={formData.minAmount}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Min-Amount"
                />

                <input
                    type="number"
                    name="maxAmount"
                    value={formData.maxAmount}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Max-Amount"
                />

                <input
                    type="text"
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Note"
                />

                <button type="submit" className="btn-primary">
                    Apply Filter
                </button>
            </form>
        </div>
    );
}
