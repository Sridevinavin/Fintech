const PreparePiedata=(transactions)=>{
const map = {};

  transactions
    .filter(t => t.type === 'expense').forEach(t => {
      if (!map[t.category]) map[t.category] = 0;
      map[t.category] += Number(t.amount);
    });

  return Object.keys(map).map(cat => ({
    name: cat,
    value: map[cat]
  }));
};
export default PreparePiedata;