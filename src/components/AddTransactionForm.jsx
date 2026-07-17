import React from "react";

function AddTransactionForm({postTransaction}) {
  function submitForm(e){
    e.preventDefault()
    const newTransaction = {
      date: e.target.date.value,
      description: e.target.description.value,
      category: e.target.category.value,
      amount: e.target.amount.value
    }
    postTransaction(newTransaction)

  }

  return (
    <div className="ui segment">
      <form role="form" className="ui form" onSubmit={(e)=>{submitForm(e)}}>
        <div className="inline fields">
          {/*added required to input fields to prevent saving with incomplete data*/}
          <input data-testid="date-field" required type="date" name="date" />
          <input data-testid="description-field" required type="text" name="description" placeholder="Description" />
          <input data-testid="category-field" required type="text" name="category" placeholder="Category" />
          <input data-testid="amount-field" required type="number" name="amount" placeholder="Amount" step="0.01" />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
