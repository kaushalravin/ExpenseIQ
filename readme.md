# ExpenseIQ – AI Powered Smart Expense Tracking System

ExpenseIQ is a cloud-deployed full-stack web application that enables users to securely track daily expenses, analyze spending patterns, and manage financial data efficiently.

The system integrates Artificial Intelligence to convert natural language expense descriptions into structured financial records using the Google Gemini API. The application also provides real-time analytics, bulk data import/export, and secure authentication.

Live Application: https://expenseiq-app.vercel.app
Backend API: https://expenseiq-lrxz.onrender.com

---

# 1. Problem Statement

Manual expense tracking is inefficient and lacks automation. Many existing tools require manual categorization and do not provide intelligent assistance for entering financial data.

Common limitations include:

* Lack of natural language input support
* No AI-based categorization
* Limited analytics and visualization

ExpenseIQ addresses these limitations by integrating AI-powered parsing with a scalable cloud architecture.

---

# 2. Objectives

The main objectives of this project are:

* Build a secure full-stack expense management system
* Implement natural language expense parsing using AI
* Provide secure authentication using JWT
* Enable analytics and visualization of spending patterns
* Deploy the system using modern cloud infrastructure

---

# 3. System Architecture

The system follows a typical full-stack architecture consisting of three main layers:

Frontend (React Application)
↓
Backend API (Node.js + Express)
↓
Database (MongoDB Atlas)

AI parsing functionality is integrated through the Google Gemini API.

Workflow:

1. User interacts with the React frontend.
2. Requests are sent to the Express backend through REST APIs.
3. Backend performs authentication, validation, and business logic.
4. Data is stored and retrieved from MongoDB Atlas.
5. For natural language input, the backend sends prompts to the Gemini API and processes the structured output.

---

# 4. Technology Stack

Frontend

* React (Vite)
* React Router
* Axios
* Chart.js

Backend

* Node.js
* Express.js
* MongoDB with Mongoose ODM
* JSON Web Tokens (JWT)
* bcrypt for password hashing
* Joi for request validation

Artificial Intelligence

* Google Gemini API
* Natural language parsing

Deployment

* MongoDB Atlas for database hosting
* Render for backend deployment
* Vercel for frontend deployment

---

# 5. Authentication and Security

Authentication is implemented using JSON Web Tokens (JWT).

Implementation details:

* Passwords are hashed using bcrypt before storage.
* After successful login, a JWT token is generated.
* The token is stored in HTTP-only cookies to prevent client-side access.
* Protected routes are secured using authentication middleware.
* Each API request verifies the token and extracts the user identity.

This ensures that users can only access and modify their own data.

---

# 6. Key Features

## 6.1 Expense Management

The application provides complete CRUD functionality for managing expenses.

Features include:

* Add new expenses
* Edit existing expenses
* Delete expenses
* Pagination support for large datasets
* User-based data ownership validation

Each expense contains:

* amount
* category
* payment mode
* date
* optional note

---

## 6.2 AI-Based Expense Parsing

Users can enter expenses in natural language.

Example input:

Spent 500 on food yesterday using UPI

The Gemini API processes the sentence and extracts structured data:

* amount: 500
* category: food
* payment mode: UPI
* date: yesterday

The backend then converts this into a standard expense entry.

Optional voice-to-text input allows users to dictate expenses instead of typing.

---

## 6.3 Data Import and Export

ExpenseIQ supports bulk data operations.

Import:

* Users can upload CSV or Excel files
* Client-side validation checks file structure
* Data is processed and inserted into MongoDB

Export:

* Filtered expense data can be exported to Excel
* Useful for personal financial analysis or reporting

---

## 6.4 Analytics and Visualization

The system provides visual insights using Chart.js.

Analytics include:

* Monthly expense trends
* Category-wise spending distribution
* Payment method analysis
* Total spending summary
* Average spending calculations

These visualizations help users understand their financial behavior.

---

# 7. Database Design

Two primary collections are used.

User Collection

Fields:

* username
* email
* password (hashed)

Expense Collection

Fields:

* userId (reference to User)
* amount
* category
* paymentMode
* date
* note

Each expense document is associated with one authenticated user.

---

# 8. Deployment Details

Frontend Deployment

The React application is deployed on Vercel. Vite is used for building optimized production bundles.

Backend Deployment

The Express API is deployed on Render. The service handles REST API requests and communicates with MongoDB Atlas.

Database

MongoDB Atlas is used as a cloud-hosted NoSQL database.

Environment Variables used in deployment:

Backend:

* MONGO_URI
* JWT_SECRET
* GEMINI_API_KEY
* CLIENT_URL
* PORT

Frontend:

* VITE_API_BASE

Cross-origin cookie configuration is enabled to allow secure communication between frontend and backend.

---


# 9. Installation and Local Setup

Clone the repository:

git clone https://github.com/kaushalravin/ExpenseIQ.git

Navigate to the project directory:

cd ExpenseIQ

Backend setup:

cd backend
npm install
npm run dev

Frontend setup:

cd frontend
npm install
npm run dev

The frontend will run on the Vite development server and communicate with the backend API.

---

# 10. Result

ExpenseIQ demonstrates the integration of modern web technologies and artificial intelligence to create a practical financial management system.

The project successfully combines:

* Cloud-based architecture
* Secure authentication mechanisms
* AI-powered natural language processing
* Data analytics and visualization

The system provides an efficient and intelligent solution for personal expense tracking.

---

# 11. Author

Kaushal N
Computer Science Engineering
Madras Institute of Technology

GitHub: https://github.com/kaushalravin
