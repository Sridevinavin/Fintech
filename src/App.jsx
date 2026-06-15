import { useState } from "react";
import Navbar from "./Navbar.jsx";
import Transactionsection from "./Transactionsection.jsx";
import TransactionForm from "./TransactionForm";

import DashboardHome from "./DashboardHome";
import Sidebar from './Sidebar';
import InsightsSection from "./InsightsSection";

function App() {
  const [role, setRole] = useState("Admin");
  const [form, setForm] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const onRolechange = () => {
    setRole(prev => (prev === "Admin" ? "viewer" : "Admin"));
  };
  const handleEdit = (transaction) => {
  setEditingTransaction(transaction);
  console.log({editingTransaction});
  setForm(true);
};

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-50 transition-colors duration-300">
      <div className="flex h-screen overflow-hidden bg-white dark:bg-slate-900">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={isSidebarOpen}
          setIsOpen={setSidebarOpen}
        />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Navbar
            role={role}
            onRolechange={onRolechange}
            onMenuClick={() => setSidebarOpen(true)}
          />
          <main className="flex-1 overflow-y-auto bg-gray-50/50 dark:bg-slate-800/50 p-4 md:p-8 transition-colors">
            <div className="max-w-7xl mx-auto">
              {activeTab === "Dashboard" && <DashboardHome />}
              {activeTab === "Transactions" && (
                <Transactionsection
                  currole={role}
                  showForm={() => setForm(true)}
                  onEdit={handleEdit}
                />
              )}
              {activeTab === "Insights" && (
                <div className="p-10 text-center text-gray-400 dark:text-gray-500 border-2 border-dashed rounded-xl dark:border-slate-700 dark:bg-slate-800/30">
                  <InsightsSection />
                </div>
              )}
            </div>
          </main>
        </div>
        {form && (
          <TransactionForm
            editingTransaction={editingTransaction}
            onCancel={() => {
              setForm(false);
              setEditingTransaction(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;