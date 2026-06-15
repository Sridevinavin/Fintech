import { useState } from "react";
import Navbar from "./Navbar.jsx";
import Transactionsection from "./Transactionsection.jsx";
import TransactionForm from "./TransactionForm";
import { Transactionprovider } from "./Transactionprovider.jsx";
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
  setForm(true);
};

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300">   
     <Transactionprovider>
      <div className="flex h-screen overflow-hidden bg-white">
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
          <main className="flex-1 overflow-y-auto bg-gray-50/50 p-4 md:p-8">
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
                <div className="p-10 text-center text-gray-400 border-2 border-dashed rounded-xl">
                  <InsightsSection/>
                </div>
              )}
            </div>
          </main>
        </div>
        {form && <TransactionForm editingTransaction={editingTransaction} 
    onCancel={() => {setForm(false);
      setEditingTransaction(null)}} />}
      </div>
    </Transactionprovider>
    </div>

  );
}

export default App;