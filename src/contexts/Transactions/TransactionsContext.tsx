import React, { createContext } from "react";

export const TransactionsContext = createContext<TransactionsContextData>({
  transactions: [],
  setTransactions: () => {},
  setMonthlyBalance:()=>{},
  monthlyBalance:0,
  expense: 0,
  income: 0,
});
