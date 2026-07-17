import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import fetch from "node-fetch";

global.fetch = fetch;

global.mockTransactions = [
  {
    id: 1,
    date: "1/1/2010",
    description: "test1",
    category: "test category",
    amount: 123,
  },
  {
    id: 2,
    date: "2/2/2012",
    description: "test2",
    category: "test category 2",
    amount: 234,
  },
];

global.setFetchResponse = (val) => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(val),
      ok: true,
      status: 200,
    }),
  );
};

afterEach(() => {
  cleanup();
});
