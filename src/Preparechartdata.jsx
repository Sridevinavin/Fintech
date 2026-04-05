
const Preparechartdata=(transactions)=>{
            const map={};
    transactions.filter((t)=>t.type==="expense").forEach((t)=>{ 
        if(!map[t.date])
        {
            map[t.date]=0;
        }
        map[t.date]+= Number(t.amount);
    });
    return Object.keys(map).map((date)=>({
        date:date,
        amount:map[date]}
    )).sort((a,b)=> new Date(a.date)-new Date(b.date));
    
}
export default Preparechartdata;