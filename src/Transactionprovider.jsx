import { useState,createContext,useContext } from "react";
import {initialTransactions} from "./Transactiondata.jsx";

 const Transactioncontext=createContext();
export const Transactionprovider=({children})=>{
    const[transactions,setTransactions]=useState(initialTransactions);
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
return(
    <div>
        <Transactioncontext.Provider value={{transactions,handleAddTransaction,handleDelete}}>
        {children}
    </Transactioncontext.Provider>
    </div>
)
};
export const useTransaction=()=>{
    return useContext(Transactioncontext)
}