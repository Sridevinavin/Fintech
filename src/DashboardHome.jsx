import { useTransaction } from "./Transactionprovider";
import Charts from "./Charts"; 
import CategoryPieChart from "./CategoryPieChart";
import SummaryCard from "./SummaryCard.jsx";

export default function DashboardHome() {
  const { transactions } = useTransaction();

  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = income - expense;

  return (
    <div className="animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Financial Overview</h2>
      <div className="space-y-6 pb-20 md:pb-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <SummaryCard title="Total Balance" amount={balance} type="balance" />
        <SummaryCard title="Total Income" amount={income} type="income" />
        <SummaryCard title="Total Expenses" amount={expense} type="expense" />
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:flex-[0.6] bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm h-[350px] md:h-[450px]">
          <Charts />
        </div>
        <div className="w-full lg:flex-[0.4] bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm h-[350px] md:h-[450px]">
          <CategoryPieChart />
        </div>
      </div>
    </div>
    </div>
  );
}