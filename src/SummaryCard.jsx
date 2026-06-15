
const SummaryCard = ({ title, amount, type }) => {
  const colors = {
    income: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800",
    expense: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800",
    balance: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800"
  };

  return (
    <div className={`p-6 rounded-2xl border shadow-sm transition-colors ${colors[type]}`}>
      <p className="text-sm font-semibold uppercase tracking-wider opacity-70">{title}</p>
      <p className="text-3xl font-bold mt-2">
        ₹{amount.toLocaleString('en-IN')}
      </p>
    </div>
  );
};

export default SummaryCard;