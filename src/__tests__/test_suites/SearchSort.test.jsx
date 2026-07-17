import React from "react";
import { describe, expect, test, vi } from "vitest";
import App from "../../components/App";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("SearchSort", () => {
  test("changing search state filters transaction list", async () => {
    global.setFetchResponse(global.mockTransactions);
    const { findAllByTestId, getByTestId } = render(<App />);
    const transactions = await findAllByTestId("transaction");
    const transactionTable = getByTestId("transaction-table");
    const searchField = getByTestId("search-field");
    expect(transactions.length).toBe(2);
    fireEvent.change(searchField, { target: { value: "test2" } });
    waitFor(() => {
      expect(transactions.length).toBe(1);
      //just checking the description since full data matching is already tested in DisplayTransactions suite
      expect(
        transactionTable
          .querySelectorAll("td")
          .find((element) => element.textContent === "test1"),
      ).toBe(undefined);
    });

    //check resetting search brings back the previously filtered out option
    fireEvent.change(searchField, { target: { value: "" } });
    waitFor(() => {
      expect(transactions.length).toBe(2);
      expect(
        transactionTable
          .querySelectorAll("td")
          .find((element) => element.textContent === "test1"),
      ).toBeInTheDocument();
    });
  });

  test("changing sort sorts data by selected option", async () => {
    global.setFetchResponse(global.mockTransactions);
    const { findAllByTestId, getByTestId } = render(<App />);
    const transactions = await findAllByTestId("transaction");
    const sortField = getByTestId("sort-field");

    //check description sort
    fireEvent.change(sortField, { target: { value: "description" } });
    waitFor(() => {
      const descSortedTransactions = transactions.map(
        (transaction) => transaction.querySelector("#description").textContent,
      );
      const expectedDescSortedTransactions = global.mockTransactions
        .sort((a, b) => a.description.localeCompare(b.description))
        .map((transaction) => transaction.description);
      //only checking description fields since full data match is already tested
      expect(descSortedTransactions).toEqual(expectedDescSortedTransactions);
    });

    //check category sort
    fireEvent.change(sortField, { target: { value: "category" } });
    waitFor(() => {
      const catSortedTransactions = transactions.map(
        (transaction) => transaction.querySelector("#category").textContent,
      );
      const expectedCatSortedTransactions = global.mockTransactions
        .sort((a, b) => a.category.localeCompare(b.category))
        .map((transaction) => transaction.category);
      //only checking description fields since full data match is already tested
      expect(catSortedTransactions).toEqual(expectedCatSortedTransactions);
    });
  });

  test('gracefully handle onSort with bad param',async ()=>{
    global.setFetchResponse(global.mockTransactions);
    const { findAllByTestId, getByTestId } = render(<App />);
    const transactions = await findAllByTestId("transaction");
    const sortField = getByTestId("sort-field");

    
    fireEvent.change(sortField, { target: { value: "" } });
    const transactionDescriptions = transactions.map(
        (transaction) => transaction.querySelector("#description").textContent,
    );
    const expectedDescriptions = global.mockTransactions.map(
        (transaction) => transaction.description,
    );
    expect(transactionDescriptions).toEqual(expectedDescriptions);
  })
});
