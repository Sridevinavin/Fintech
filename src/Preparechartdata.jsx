import {useTransaction} from "./Transactionprovider";
const Preparechartdata=()=>{
    const{transactions}=useTransaction();
            const map={};
    {transactions.filter((t)=>t.expense).forEach((t)=>{
        if(!map[t.date])
        {
            map[t.date]=0;
        }
        map[t.date]+=t.amount;
    })}
    return Object.keys(map).map((date)=>({
        date:date,
        amount:map[date]}
    )).sort((a,b)=> new Date(a.date)-new Date(b.date));
    
}
export default Preparechartdata;