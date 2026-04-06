# 💰 Fintech - Personal Finance Dashboard

A robust, responsive Personal Finance Tracker built with **React**, **Tailwind CSS**, and **Formik**. This application empowers users to monitor their financial health through interactive visualizations and a managed transaction system.

## 🌐 Live Demo
[View Live Project](https://sridevinavin.github.io/Fintech/)

## 🚀 Key Features
- **Interactive Dashboard:** Real-time summary cards (Income, Expense, Balance) and visual trends using **Recharts**.
- **Transaction Management:** Full CRUD operations with **Formik** & **Yup** for data validation.
- **Smart Filtering:** Search and sort functionality to navigate large datasets (50+ records).
- **Dynamic Insights:** Automated financial observations including highest spending categories and savings rates.
- **Role-Based Access (RBAC):** - **Admin:** Full control (Add/Edit/Delete).
  - **Viewer:** Read-only access to maintain data integrity.
- **Dark Mode Support:** A sleek dark theme implemented via **React Context API** and Tailwind variants.
- **Fully Responsive:** Seamless experience across Mobile (Slide-out Sidebar) and Desktop.

## 🛠️ Tech Stack
- **Library:** React.js (Hooks & Context API)
- **Styling:** Tailwind CSS (Utility-first approach)
- **Form Handling:** Formik & Yup
- **Charts:** Recharts (Area & Pie charts)
- **Icons:** Lucide-React

## 📂 Project Structure
```text
src/
 ├── components/       # UI Components (Charts, Table, Sidebar)
 ├── Transactionprovider.jsx # Global State Management (Theme & Data)
 ├── Transactiondata.js      # Mock datasets (50+ transactions)
 ├── Preparechartdata.js     # Data transformation logic for Recharts
 └── App.jsx                 # Main Routing and Layout