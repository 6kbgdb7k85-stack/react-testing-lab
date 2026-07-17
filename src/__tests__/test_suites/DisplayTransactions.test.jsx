import React from "react";
import { describe, expect, test, vi } from "vitest";
import App from "../../components/App";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Display Transactions", () => {
  test("display transactions on load", async () => {
    global.setFetchResponse(global.mockTransactions);
    let { findAllByTestId } = render(<App />);
    const transactions = await findAllByTestId("transaction");

    //check dates match
    const transactionDates = transactions.map(
      (transaction) => transaction.querySelector("#date").textContent,
    );
    const expectedDates = global.mockTransactions.map(
      (transaction) => transaction.date,
    );
    expect(transactionDates).toEqual(expectedDates);

    //check descriptions match
    const transactionDescriptions = transactions.map(
      (transaction) => transaction.querySelector("#description").textContent,
    );
    const expectedDescriptions = global.mockTransactions.map(
      (transaction) => transaction.description,
    );
    expect(transactionDescriptions).toEqual(expectedDescriptions);

    //check categories match
    const transactionCategories = transactions.map(
      (transaction) => transaction.querySelector("#category").textContent,
    );
    const expectedCategories = global.mockTransactions.map(
      (transaction) => transaction.category,
    );
    expect(transactionCategories).toEqual(expectedCategories);

    //check amounts match
    const transactionAmounts = transactions.map(
      (transaction) => transaction.querySelector("#amount").textContent,
    );
    const expectedAmounts = global.mockTransactions.map((transaction) =>
      transaction.amount.toString(),
    );
    expect(transactionAmounts).toEqual(expectedAmounts);
  });
});
