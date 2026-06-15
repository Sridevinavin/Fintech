import { useState } from "react";
import { useTransaction } from "./Transactionprovider";
import { Search, ArrowUpDown, Plus } from "lucide-react";

function Transactionsection({ currole, showForm,onEdit }) {
  const { transactions, handleDelete } = useTransaction();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [visibleCount, setVisibleCount] = useState(10);
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  
  const filteredAndSortedData = [...transactions]
    .filter((t) => 
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortConfig.key === 'amount') {
        return sortConfig.direction === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      }
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    const displayedData = filteredAndSortedData.slice(0, visibleCount);
    if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-gray-200 dark:border-slate-800">
        <div className="text-gray-400 mb-4">No transactions found.</div>
        {currole === "Admin" && (
          <button onClick={showForm} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold">
            Add Your First Transaction
          </button>
        )}
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800">
        <h3 className="font-bold text-xl dark:text-white">Recent Transactions</h3>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search category or desc..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {currole === "Admin" && (
            <button 
              onClick={showForm} 
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-md"
            >
              <Plus size={18} /> Add Transaction
            </button>
          )}
        </div>
      </div>
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm">
        <table className="w-full text-left bg-white dark:bg-slate-900 border-collapse">
          <thead className="bg-gray-50 dark:bg-slate-800">
            <tr>
              {['date', 'category', 'description', 'amount'].map((header) => (
                <th 
                  key={header}
                  onClick={() => handleSort(header)}
                  className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 cursor-pointer hover:text-blue-600 transition-colors uppercase text-xs tracking-wider"
                >
                  <div className="flex items-center gap-2">
                    {header} <ArrowUpDown size={14} />
                  </div>
                </th>
              ))}
              {currole === "Admin" && <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-center uppercase text-xs">Actions</th>}
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
            {displayedData.map((t) => (
              <tr className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors group" key={t.id}>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                   {new Date(t.date).toLocaleDateString('en-GB')}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                    {t.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{t.description}</td>
                <td className={`px-6 py-4 text-sm font-bold ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {t.type === 'income' ? '+' : '-'}₹{Math.abs(t.amount).toLocaleString('en-IN')}
                </td>
                {currole === "Admin" && (
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={()=>onEdit(t)} className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md">Edit</button>
                      <button 
                        onClick={() => handleDelete(t.id)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-md"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {filteredAndSortedData.length === 0 && (
          <div className="p-10 text-center bg-white dark:bg-slate-900 text-gray-500">
            No transactions found matching your criteria.
          </div>
        )}
        {visibleCount < filteredAndSortedData.length && (
          <div className="p-4 border-t text-center">
            <button 
              onClick={() => setVisibleCount(prev => prev + 10)}
              className="text-sm font-bold text-blue-600 hover:text-blue-800"
            >
              Show More (+10)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Transactionsection;