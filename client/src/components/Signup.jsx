import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/login.css'

axios.defaults.withCredentials = true;

export default function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

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
            const res = await axios.post(
                "http://localhost:3000/api/signup",
                formData
            );

            if (res.data.success) {
                navigate("/auth/login");
            } else {
                setMessage(res.data.error.message);
            }
        } catch (err) {
            setMessage(
                err.response?.data?.error?.message || "Signup failed"
            );
        }
    };

    return (
        <div className="page-container">
            <div className="content-wrapper">
                {/* Left side - Branding */}
                <div className="branding-section">
                    <div className="brand-content">
                        <div className="brand-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h1 className="brand-title">Expense Tracker</h1>
                        <p className="brand-tagline">Your smart companion for financial clarity and peace of mind</p>
                        <div className="feature-list">
                            <div className="feature-item">
                                <svg viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Track expenses effortlessly</span>
                            </div>
                            <div className="feature-item">
                                <svg viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Beautiful data visualization</span>
                            </div>
                            <div className="feature-item">
                                <svg viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Insightful analytics</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side - Signup Form */}
                <div className="form-section">
                    <div className="form-container">
                        <div className="form-header">
                            <h2 className="form-title">Create Account</h2>
                            <p className="form-subtitle">Join us to start managing your finances</p>
                        </div>

                        {message && (
                            <div className="alert-box">
                                <svg viewBox="0 0 20 20" fill="currentColor" className="alert-icon">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                        clipRule="evenodd"
                                    />
                                </svg>

                                <span>{message}</span>

                                <button
                                    className="alert-close"
                                    onClick={() => setMessage("")}
                                >
                                    ×
                                </button>
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="form">
                            <div className="form-group">
                                <label htmlFor="username" className="label">Username</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                        className="input"
                                        placeholder="Choose a username"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="label">Email</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="input"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="label">Password</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="input"
                                        placeholder="Create a password"
                                    />
                                </div>
                            </div>

                            <button type="submit" className="btn-primary">
                                Create Account
                            </button>
                        </form>

                        <div className="divider">
                            <span>Already have an account?</span>
                        </div>

                        <button type="button" onClick={() => navigate("/auth/login")} className="btn-secondary">
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}