import { useState,createContext,useContext } from "react";
import {initialTransactions} from "./Transactiondata.jsx";
import {useEffect} from "react";

 const Transactioncontext=createContext();
export const Transactionprovider=({children})=>{
    const[transactions,setTransactions]=useState(initialTransactions);
    const [darkMode, setDarkMode] = useState(false);
    useEffect(() => {
      const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);
  const toggleTheme = () => setDarkMode(!darkMode);
function handleDelete(id)
{
  const confirmed=window.confirm("Delete this transaction")
  if(confirmed)
    setTransactions(transactions.filter((t)=>t.id!=id));
}
function handleAddTransaction(values)
{
  const newEntry={...values};
  setTransactions([newEntry,...transactions]);
}
const totals = transactions.reduce((acc, t) => {
  const amt = Number(t.amount);
  if (t.type === 'income') acc.income += amt;
  else acc.expense += amt;
  return acc;
}, { income: 0, expense: 0 });

const balance = totals.income - totals.expense;
return(
    <div>
        <Transactioncontext.Provider value={{transactions,handleAddTransaction,handleDelete,totals,balance,darkMode,toggleTheme}}>
        {children}
    </Transactioncontext.Provider>
    </div>
)
};
export const useTransaction=()=>{
    return useContext(Transactioncontext)
}