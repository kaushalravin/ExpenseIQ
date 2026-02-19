import { useNavigate } from "react-router-dom";
import "../styles/landing.css";

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div className="landing-page">
            {/* Hero Section */}
            <header className="landing-header">
                <nav className="landing-nav">
                    <div className="nav-brand">
                        <div className="nav-logo">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <span className="nav-title">ExpenseIQ</span>
                    </div>
                    <div className="nav-actions">
                        <button className="btn-secondary" onClick={() => navigate("/auth/login")}>
                            Log In
                        </button>
                        <button className="btn-primary" onClick={() => navigate("/auth/signup")}>
                            Get Started
                        </button>
                    </div>
                </nav>

                <div className="hero-content">
                    <div className="hero-text">
                        <div className="hero-badge">
                            <svg viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span>Smart Expense Tracking</span>
                        </div>
                        <h1 className="hero-title">
                            Take Control of Your
                            <span className="hero-gradient"> Financial Future</span>
                        </h1>
                        <p className="hero-subtitle">
                            ExpenseIQ helps you track expenses, visualize spending patterns, and make smarter financial decisions with powerful AI-driven insights.
                        </p>
                        <div className="hero-cta">
                            <button className="btn-hero-primary" onClick={() => navigate("/auth/signup")}>
                                Start Tracking Free
                                <svg viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <button className="btn-hero-secondary" onClick={() => navigate("/auth/login")}>
                                Sign In
                            </button>
                        </div>
                        <div className="hero-stats">
                            <div className="stat-item">
                                <div className="stat-number">AI-Powered</div>
                                <div className="stat-label">Smart Parsing</div>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <div className="stat-number">Real-time</div>
                                <div className="stat-label">Analytics</div>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <div className="stat-number">Secure</div>
                                <div className="stat-label">Data Storage</div>
                            </div>
                        </div>
                    </div>
                    <div className="hero-visual">
                        <div className="visual-card visual-card-1">
                            <div className="card-header">
                                <span className="card-title">Monthly Overview</span>
                                <span className="card-amount">₹45,280</span>
                            </div>
                            <div className="card-chart">
                                <div className="chart-bar" style={{height: '60%'}}></div>
                                <div className="chart-bar" style={{height: '80%'}}></div>
                                <div className="chart-bar" style={{height: '45%'}}></div>
                                <div className="chart-bar" style={{height: '95%'}}></div>
                                <div className="chart-bar" style={{height: '70%'}}></div>
                            </div>
                        </div>
                        <div className="visual-card visual-card-2">
                            <div className="expense-item">
                                <div className="expense-icon expense-icon-food">🍔</div>
                                <div className="expense-details">
                                    <span className="expense-name">Food & Dining</span>
                                    <span className="expense-date">Today</span>
                                </div>
                                <span className="expense-amount">-₹320</span>
                            </div>
                            <div className="expense-item">
                                <div className="expense-icon expense-icon-travel">🚗</div>
                                <div className="expense-details">
                                    <span className="expense-name">Travel</span>
                                    <span className="expense-date">Yesterday</span>
                                </div>
                                <span className="expense-amount">-₹850</span>
                            </div>
                        </div>
                        <div className="visual-card visual-card-3">
                            <div className="progress-ring">
                                <svg viewBox="0 0 100 100">
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" style={{stopColor: '#3b82f6', stopOpacity: 1}} />
                                            <stop offset="100%" style={{stopColor: '#2563eb', stopOpacity: 1}} />
                                        </linearGradient>
                                    </defs>
                                    <circle cx="50" cy="50" r="45" className="progress-ring-bg" />
                                    <circle cx="50" cy="50" r="45" className="progress-ring-fill" />
                                </svg>
                                <div className="progress-text">
                                    <div className="progress-percentage">68%</div>
                                    <div className="progress-label">Budget Used</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="features-section">
                <div className="section-header">
                    <h2 className="section-title">Everything You Need to Master Your Finances</h2>
                    <p className="section-subtitle">Powerful features designed to simplify expense tracking and provide actionable insights</p>
                </div>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon feature-icon-blue">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <h3 className="feature-title">Interactive Analytics</h3>
                        <p className="feature-description">Visualize your spending with beautiful charts and graphs. Track trends over time with bar, pie, and line charts.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon feature-icon-purple">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="feature-title">AI-Powered Parsing</h3>
                        <p className="feature-description">Just type naturally: "Spent 500 on groceries yesterday via UPI" and let AI handle the rest.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon feature-icon-green">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                            </svg>
                        </div>
                        <h3 className="feature-title">Bulk Import</h3>
                        <p className="feature-description">Import expenses from CSV or Excel files. Perfect for migrating from other tools or adding historical data.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon feature-icon-orange">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                        </div>
                        <h3 className="feature-title">Advanced Filters</h3>
                        <p className="feature-description">Filter expenses by category, date range, payment mode, amount, and custom search. Find exactly what you need.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon feature-icon-red">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h3 className="feature-title">Secure & Private</h3>
                        <p className="feature-description">Your financial data is encrypted and secure. We never share your information with third parties.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon feature-icon-indigo">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                            </svg>
                        </div>
                        <h3 className="feature-title">Export Data</h3>
                        <p className="feature-description">Download your expense data as Excel files anytime. Keep backups or analyze in your preferred tools.</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2 className="cta-title">Ready to Take Control?</h2>
                    <p className="cta-subtitle">Join thousands of users who are already making smarter financial decisions</p>
                    <div className="cta-buttons">
                        <button className="btn-cta-primary" onClick={() => navigate("/auth/signup")}>
                            Create Free Account
                            <svg viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <span className="cta-note">No credit card required • Set up in 2 minutes</span>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="footer-content">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>ExpenseIQ</span>
                        </div>
                        <p className="footer-tagline">Smart expense tracking for everyone</p>
                    </div>
                    <div className="footer-links">
                        <div className="footer-column">
                            <h4>Product</h4>
                            <a href="#features">Features</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); navigate("/auth/signup"); }}>Pricing</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); navigate("/dashboard"); }}>Dashboard</a>
                        </div>
                        <div className="footer-column">
                            <h4>Company</h4>
                            <a href="#">About</a>
                            <a href="#">Blog</a>
                            <a href="#">Careers</a>
                        </div>
                        <div className="footer-column">
                            <h4>Support</h4>
                            <a href="#">Help Center</a>
                            <a href="#">Contact</a>
                            <a href="#">Privacy</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2026 ExpenseIQ. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
