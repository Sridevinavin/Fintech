import { useTransaction } from "./Transactionprovider";
import  Preparechartdata from "./Preparechartdata";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function Charts() {
    const{transactions,darkMode}=useTransaction();
    const textColor = darkMode ? "#94a3b8" : "#64748b";
  const gridColor = darkMode ? "#1e293b" : "#e2e8f0";
  const data = Preparechartdata(transactions);
  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-xl">
        <p className="text-gray-400">Add some expenses to see your spending trend!</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Spending Over Time</h3>
      <div className="h-70">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="date" />
            <YAxis tickFormatter={(val) => `₹${val}`} />
            <Tooltip
            contentStyle={{ 
              backgroundColor: darkMode ? '#0f172a' : '#fff', 
              borderColor: darkMode ? '#1e293b' : '#e2e8f0',
              color: darkMode ? '#fff' : '#000'
            }} />
            <Area type="monotone" dataKey="amount" stroke="#10b981" fill="#d1fae5" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
export default Charts;