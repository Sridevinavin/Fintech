import Charts from "./Charts";
import {useState} from "react";
import Navbar from "./Navbar.jsx";
import Transactionsection from "./Transactionsection.jsx";
import TransactionForm from "./TransactionForm";
import {Transactionprovider} from "./Transactionprovider.jsx";

function App() {
const[role,setRole]=useState("Admin")
const[form,setForm]=useState(false);
function onRolechange()
{
  setRole(prev=>prev==="Admin"?"viewer":"Admin")
  console.log({role});
}
function handleForm()
{
  setForm(true);
}
  return(
    <div>
      <Transactionprovider>
          <Navbar role={role} onRolechange={onRolechange}/>
          <Transactionsection currole={role} showForm={handleForm} />
          <Charts/>
          {form && <TransactionForm onCancel={()=>setForm(false)}/>}
      </Transactionprovider>
    </div>
  )
}
export default App;
