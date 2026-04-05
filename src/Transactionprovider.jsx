import { useState,createContext,useContext } from "react";
import {initialTransactions} from "./Transactiondata.jsx";

export const Transactionprovider=({children})=>{
    const[transactions,setTransactions]=useState(initialTransactions);
     const Transactioncontext=createContext();
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
  setForm(false);
}
return(
    <div>
        <Transactioncontext.Provider value={{transactions,handleAddTransaction,handleDelete}}>
        {children}
    </Transactioncontext.Provider>
    </div>
)
};
export const useTransaction=()=>{
    useContext(Transactioncontext)
}