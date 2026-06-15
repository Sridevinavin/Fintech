import { Formik, Form, Field, ErrorMessage } from "Formik";
import * as Yup from "yup";
import { categories } from "./Transactiondata";
import { useTransaction } from "./Transactionprovider"
function TransactionForm({ onCancel, editingTransaction }) {
    const { handleAddTransaction, handleUpdateTransaction } = useTransaction();
    const validationSchema = Yup.object({
        date: Yup.date().required("Date is requried"),
        amount: Yup.number().positive("Amount must be in positive").required("Amount is required"),
        description: Yup.string().required("Description is required"),
    });
    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 dark:bg-black/70">
            <Formik
                enableReintialize={true}
                initialValues={{
                    date: editingTransaction?.date || new Date().toISOString().split("T")[0],
                    amount: editingTransaction?.amount || "",
                    category: editingTransaction?.category || "Food",
                    type: editingTransaction?.type || "expense",
                    description: editingTransaction?.description || "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    if (editingTransaction?.id) {
                        // Update existing transaction – pass id separately and updated fields
                        handleUpdateTransaction(editingTransaction.id, {
                            ...values,
                            amount: Number(values.amount),
                        });
                    } else {
                        // Add a brand‑new transaction with a generated id
                        handleAddTransaction({
                            ...values,
                            id: Date.now(),
                            amount: Number(values.amount),
                        });
                    }
                    resetForm();
                    onCancel();
                }}>


                <Form className="mx-auto max-w-xl border rounded-xl bg-white dark:bg-slate-900 shadow-lg p-6 mt-4 absolute top-1/6 right-1/3 border-gray-200 dark:border-slate-700">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="grid grid-cols-2">
                            <label className="p-2 dark:text-white">Date</label>
                            <Field name="date" type="date" className="p-2 border rounded-sm border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500"></Field>
                            <ErrorMessage name="date" component="div" className="text-red-500 text-xs mt-1"></ErrorMessage>
                        </div>
                        <div className="grid grid-cols-2">
                            <label className="p-2 dark:text-white">Amount</label>
                            <Field name="amount" type="number" className="p-2 border rounded-sm border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500"></Field>
                            <ErrorMessage name="amount" component="div" className="text-red-500 text-xs mt-1"></ErrorMessage>
                        </div>
                        <div className="grid grid-cols-2">
                            <label className="p-2 dark:text-white">Category</label>
                            <Field name="category" as="select" className="p-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-sm  focus:ring focus:ring-blue-500">
                                {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                            </Field>
                            <ErrorMessage name="catergory" component="div" className="text-red-500 text-xs mt-1"></ErrorMessage>
                        </div>
                        <div className="grid grid-cols-2">
                            <label className="p-2 dark:text-white">Type</label>
                            <Field name="type" as="select" className="p-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-sm focus:ring focus:ring-blue-500">
                                <option value="income">income</option>
                                <option value="expense">expense</option>
                            </Field>
                        </div>
                        <div className="grid grid-cols-2">
                            <label className="p-2 dark:text-white">Description</label>
                            <Field name="description" type="string" className="p-2 border rounded-sm border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500"></Field>
                            <ErrorMessage name="description" component="div" className="text-sm text-red-600 mt-1"></ErrorMessage>
                        </div>
                        <div className="flex justify-center items-center gap-4">
                            <button onClick={onCancel} className="p-2 rounded-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700">Cancel</button>
                            <button type="submit" className="p-2 rounded-sm text-white bg-blue-500 hover:bg-blue-600">Save</button>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}
export default TransactionForm;