import React from "react";

//added testIds for easy location during testing
function Transaction({transaction}) {
  return (
    <tr data-testid="transaction">
      <td id="date">{transaction.date}</td>
      <td id="description">{transaction.description}</td>
      <td id="category">{transaction.category}</td>
      <td id="amount">{transaction.amount}</td>
    </tr>
  );
}

export default Transaction;
