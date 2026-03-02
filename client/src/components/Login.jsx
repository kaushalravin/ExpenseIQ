import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/login.css'
import { clearAuthCache } from "../utilities/auth";
import { VITE_API_BASE } from "../config/api.js";

axios.defaults.withCredentials = true;

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({
        username: "",
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
                `${VITE_API_BASE}/api/login`,
                formData
            );

            if (res.data.success) {
                clearAuthCache();
                const fromPath = location.state?.from?.pathname;
                navigate(fromPath || "/dashboard", { replace: true });
            } else {
                setMessage("login failed");
            }
        } catch (err) {
            setMessage(
                err.response?.data?.error?.message || "Login failed"
            );
        }
    };

    const handleNavigate = () => {
        navigate("/auth/signup");
    }

    return (
        <div className="page-container">
            <div className="content-wrapper">
                <div className="branding-section">
                    <div className="brand-content">
                        <div className="brand-icon">
                            <span style={{fontSize: '2.5rem', fontWeight: 800, color: 'white', lineHeight: 1}}>₹</span>
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

                <div className="form-section">
                    <div className="form-container">
                        <div className="form-header">
                            <h2 className="form-title">Welcome Back</h2>
                            <p className="form-subtitle">Please enter your credentials to continue</p>
                        </div>

                        {message && (
                            <div className="alert-box">
                                <svg viewBox="0 0 20 20" fill="currentColor" className="alert-icon">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <span>{message}</span>
                                <button className="alert-close" onClick={() => setMessage("")}>×</button>
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
                                        placeholder="Enter your username"
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
                                        placeholder="Enter your password"
                                    />
                                </div>
                            </div>

                            <button type="submit" className="btn-primary">
                                Sign In
                            </button>
                        </form>

                        <div className="divider">
                            <span>New to Expense Tracker?</span>
                        </div>

                        <button type="button" className="btn-secondary" onClick={handleNavigate}>
                            Create an account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}