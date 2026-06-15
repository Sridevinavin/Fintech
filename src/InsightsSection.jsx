import { useTransaction } from './Transactionprovider';
import { TrendingUp, TrendingDown, Target, AlertCircle } from 'lucide-react';

const InsightsSection = () => {
  const { transactions } = useTransaction();

  const getTopCategory = () => {
    const expenses = transactions.filter(t => t.type === 'expense');
    if (expenses.length === 0) return { name: 'N/A', amount: 0 };

    const totals = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
      return acc;
    }, {});

    const topCat = Object.keys(totals).reduce((a, b) => totals[a] > totals[b] ? a : b);
    return { name: topCat, amount: totals[topCat] };
  };

  const getMonthlyStats = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const thisMonth = transactions.filter(t => {
      const d = new Date(t.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });

    const totalThisMonth = thisMonth.reduce((sum, t) => sum + (t.type === 'expense' ? Number(t.amount) : 0), 0);
    return totalThisMonth;
  };

  const topCategory = getTopCategory();
  const monthlySpend = getMonthlyStats();

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0);
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome * 100).toFixed(1) : 0;

  const insightCards = [
    {
      title: "Spending Behavior",
      desc: `Your highest spending is on ${topCategory.name}.`,
      val: `₹${topCategory.amount.toLocaleString()}`,
      icon: <AlertCircle className="text-orange-500" />,
      footer: "Consider setting a budget for this category."
    },
    {
      title: "Monthly Outflow",
      desc: "Total expenses recorded this month.",
      val: `₹${monthlySpend.toLocaleString()}`,
      icon: monthlySpend > 5000 ? <TrendingUp className="text-red-500" /> : <TrendingDown className="text-green-500" />,
      footer: "Based on current month's entries."
    },
    {
      title: "Savings Rate",
      desc: "Percentage of income you've kept.",
      val: `${savingsRate}%`,
      icon: <Target className="text-blue-500" />,
      footer: savingsRate > 20 ? "Great job! You're hitting your targets." : "Try to aim for a 20% savings rate."
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Financial Insights</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insightCards.map((card, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">{card.title}</p>
                {card.icon}
              </div>
              <h3 className="text-2xl font-bold mt-2 dark:text-white">{card.val}</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">{card.desc}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-50 dark:border-slate-800">
              <p className="text-xs text-gray-500 italic">{card.footer}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl">
        <h4 className="font-bold text-blue-900 dark:text-blue-300 flex items-center gap-2">
           <AlertCircle size={18} /> AI Observation
        </h4>
        <p className="mt-2 text-blue-800 dark:text-blue-400 text-sm leading-relaxed">
          {totalExpense > totalIncome 
            ? "Warning: Your expenses currently exceed your income. We recommend reviewing your top categories to find potential savings."
            : "Your finances look healthy! You are currently living within your means. Consider moving your surplus into a high-interest savings account."}
        </p>
      </div>
    </div>
  );
};

export default InsightsSection;