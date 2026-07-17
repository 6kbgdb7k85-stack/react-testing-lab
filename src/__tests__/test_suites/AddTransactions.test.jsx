import React from "react";
import { describe, expect, test, vi } from "vitest";
import App from "../../components/App";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("AddTransactions", () => {
  test("adds new transaction", async () => {
    render(<App />);
    const addForm = screen.getByRole("form");
    global.setFetchResponse({
      date: "07/16/2026",
      description: "test",
      category: "test category",
      amount: 123,
    });
    const table=screen.getByTestId('transaction-table');
    fireEvent.submit(addForm, {
      preventDefault: vi.fn(),
      target: {
        date: { value: "07/16/2026" },
        description: { value: "test" },
        category: { value: "test category" },
        amount: { value: 123 },
      },
    });
    
    expect(fetch).toHaveBeenCalledWith("http://localhost:6001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: "07/16/2026",
        description: "test",
        category: "test category",
        amount: 123,
      }),
    });
    waitFor(() => {
      expect(
        table
          .querySelectorAll("td")
          .find((element) => element.textContent === "test"),
      ).toBeInTheDocument();
    });
  });

  test('no transaction added if empty form submitted',()=>{
    render(<App />);
    const addForm = screen.getByRole("form");
    global.setFetchResponse({
      date: "07/16/2026",
      description: "test",
      category: "test category",
      amount: 123,
    });
    const table=screen.getByTestId('transaction-table');
    fireEvent.submit(addForm, {
      preventDefault: vi.fn(),
      target: {
        date:'',
        description:'',
        category:'',
        amount:''
      },
    });
    expect(fetch).not.toHaveBeenCalled();
  })
});
