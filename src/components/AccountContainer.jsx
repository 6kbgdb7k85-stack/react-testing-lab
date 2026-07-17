import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import Sort from "./Sort";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/transactions")
      .then((r) => r.json())
      .then((data) => setTransactions(data));
  }, []);

  function postTransaction(newTransaction) {
    fetch("http://localhost:6001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    })
      .then((r) => r.json())
      .then((data) => setTransactions([...transactions, data]));
  }

  useEffect(() => {
    console.log(transactions);
  }, [transactions]);

  // Sort function here
  function onSort(sortBy) {
    if(!sortBy) return;// don't sort by nothing
    setTransactions(prevState=>[...prevState].sort((a,b)=>a[sortBy].localeCompare(b[sortBy])));
  }

  const displayedTransactions = transactions?.filter((transaction) =>
    transaction.description?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <Search setSearch={setSearch} />
      <AddTransactionForm postTransaction={postTransaction} />
      <Sort onSort={onSort} />
      <TransactionsList transactions={displayedTransactions} />
    </div>
  );
}

export default AccountContainer;
