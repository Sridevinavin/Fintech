import {useTransaction} from "./Transactionprovider";
function Transactionsection({currole,showForm})
{
    const{transactions,handleDelete}=useTransaction();
    return(
        <div>
             <div className="m-4 flex justify-between">
            <h3 className="font-bold text-xl">Transactions</h3>
            {currole==="Admin"&&<button onClick={showForm} className="p-2 border border-gray-300 rounded-md bg-green-300 hover:bg-green-600">+Add Transaction</button>}
        </div>
        <div className="border border-gray-200 text-center shadow-sm inline">
            <table className="text-center w-full border-collapse bg-white ">
            <thead className="bg-gray-200 sticky top-0">
                <tr>
                    <th className="px-6 py-4 font-medium text-gray-900">Date</th>
                    <th className="px-6 py-4 font-medium text-gray-900">Category</th>
                    <th className="px-6 py-4 font-medium text-gray-900">Description</th>
                    <th className="px-6 py-4 font-medium text-gray-900">Amount</th>
                    {currole==="Admin"&&<th className="px-6 py-4 font-medium text-gray-900">Actions</th>}
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {transactions.map((t)=>(<tr className="hover:bg-gray-100 transition-colors" key={t.id}>
                    <td className="px-6 py-4 text-sm text-gray-700">{t.date}</td>
                    <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">{t.category}</span></td>
                    <td className="px-6 py-4 text-sm text-gray-700">{t.description}</td>
                    <td className={`px-6 py-4 text-sm font-bold ${t.type==='income'?'text-green-600':"text-red-600"}`}>{t.type === 'income' ? '+' : '-'}₹{Math.abs(t.amount).toLocaleString()}</td>
                    {currole==="Admin"&&<td className="px-6 py-4 text-center">
                        <button className="border rounded-md text-white bg-blue-500 hover:bg-blue-700 p-1 m-1">Edit</button>
                    <button className="border rounded-md text-white bg-red-500 hover:bg-red-600 p-1 m-1" onClick={()=>handleDelete(t.id)} >Delete</button></td>}
                </tr>))}
            </tbody>
        </table>
        </div>
        </div>
       
    )
}
export default Transactionsection;