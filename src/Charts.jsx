import { useTransaction } from "./Transactionprovider";
import  Preparechartdata from "./Preparechartdata";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function Charts() {
  const data = Preparechartdata();
  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-xl">
        <p className="text-gray-400">Add some expenses to see your spending trend!</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm border mt-6">
      <h3 className="text-lg font-bold mb-4">Spending Over Time</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="date" />
            <YAxis tickFormatter={(val) => `₹${val}`} />
            <Tooltip />
            <Area type="monotone" dataKey="amount" stroke="#10b981" fill="#d1fae5" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
export default Charts;