import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTransaction } from './Transactionprovider';
import PreparePiedata from "./PreparePiedata";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const CategoryPieChart = () => {
  const { transactions } = useTransaction();
  const data = PreparePiedata(transactions);
  if (data.length === 0) {
    return <div className="text-center p-10 text-gray-500">No expense data to display.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border h-100 md:w-[40%]">
      <h3 className="text-lg font-bold mb-4 text-gray-800">Spending by Category</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => `₹${value.toLocaleString()}`} 
          />
          <Legend verticalAlign="bottom" height={90}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPieChart;