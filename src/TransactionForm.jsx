import {Formik,Form,Field,ErrorMessage} from "Formik";
import * as Yup from "yup";
import {categories} from "./Transactiondata";
import {useTransaction} from "./Transactionprovider"
function TransactionForm({onCancel})
{
    const {handleAddTransaction}=useTransaction(Transactioncontext);
    const validationSchema=Yup.object({
        date:Yup.date().required("Date is requried"),
        amount:Yup.number().positive("Amount must be in positive").required("Amount is required"),
        description:Yup.string().required("Description is required"),
    });
    return(
        <div>
            <Formik
            initialValues={{
                date:new Date().toISOString().split("T")[0],
                amount:"",
                category: "Food",
                type: "expense",
                description: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values,{resetForm})=>{
                handleAddTransaction({...values,id:Date.now(),amount:Number(values.amount)});
                resetForm();
            }}>
                <Form className="mx-auto max-w-xl border rounded-xl bg-white shadow-lg p-6 mt-4 absolute top-1/6 right-1/3">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="grid grid-cols-2">
                            <label className="p-2 ">Date</label>
                            <Field name="date" type="date" className="p-2 border rounded-sm border-gray-300 focus:ring-2 focus:ring-blue-500"></Field>
                            <ErrorMessage name="date" component="div" className="text-red-500 text-xs mt-1"></ErrorMessage>
                        </div>
                        <div className="grid grid-cols-2">
                            <label className="p-2">Amount</label>
                            <Field name="amount" type="number" className="p-2 border rounded-sm border-gray-300 focus:ring-2 focus:ring-blue-500"></Field>
                            <ErrorMessage name="amount" component="div" className="text-red-500 text-xs mt-1"></ErrorMessage>
                        </div>
                        <div className="grid grid-cols-2">
                            <label className="p-2">Category</label>
                            <Field name="category" as="select" className="p-2 border border-gray-300 rounded-sm  focus:ring focus:ring-blue-500">
                            {categories.map((cat)=><option key={cat} value={cat}>{cat}</option>)}
                            </Field>
                            <ErrorMessage name="catergory" component="div" className="text-red-500 text-xs mt-1"></ErrorMessage>
                        </div>
                        <div className="grid grid-cols-2">
                            <label className="p-2">Type</label>
                            <Field name="type" as="select" className="p-2 border border-gray-300 rounded-sm focus:ring focus:ring-blue-500">
                                <option value="income">income</option>
                                <option value="expense">expense</option>
                            </Field>
                        </div>
                        <div className="grid grid-cols-2">
                            <label className="p-2">Description</label>
                            <Field name="description" type="string" className="p-2 border rounded-sm border-gray-300 focus:ring-2 focus:ring-blue-500"></Field>
                            <ErrorMessage name="description" component="div" className="text-sm text-red-600 mt-1"></ErrorMessage>
                        </div>
                        <div className="flex justify-center items-center gap-4">
                            <button onClick={onCancel} className="p-2 rounded-sm text-gray-600 bg-gray-100">Cancel</button>
                            <button className="p-2 rounded-sm text-white bg-blue-500">Save</button>
                        </div>
                    </div>   
                </Form>
            </Formik>
        </div>
    )
}
export default TransactionForm;