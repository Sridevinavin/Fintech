
const SummaryCard = ({ title, amount, type }) => {
  const colors = {
    income: "text-green-600 bg-green-50 border-green-100",
    expense: "text-red-600 bg-red-50 border-red-100",
    balance: "text-blue-600 bg-blue-50 border-blue-100"
  };

  return (
    <div className={`p-6 rounded-2xl border shadow-sm ${colors[type]}`}>
      <p className="text-sm font-semibold uppercase tracking-wider opacity-70">{title}</p>
      <p className="text-3xl font-bold mt-2">
        ₹{amount.toLocaleString('en-IN')}
      </p>
    </div>
  );
};

export default SummaryCard;